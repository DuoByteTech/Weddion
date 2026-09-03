import { supabase } from "@/lib/supabase";

type R2Action = "upload-url" | "get-url" | "delete";

type R2ObjectResponse = {
  success: boolean;
  uploadUrl?: string;
  signedUrl?: string;
  key?: string;
  message?: string;
  error?: string;
};

type R2FunctionParams = {
  action: R2Action;
  key: string;
  contentType?: string;
  requireAuth?: boolean;
};

type GetR2UploadUrlParams = {
  key: string;
  contentType: string;
  requireAuth?: boolean;
};

type UploadFileToR2Params = {
  file: File | Blob;
  key: string;
  contentType: string;
  requireAuth?: boolean;
};

function isDirectUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

async function getFunctionErrorMessage(error: unknown) {
  const context =
    error &&
    typeof error === "object" &&
    "context" in error &&
    error.context instanceof Response
      ? error.context
      : null;

  if (context) {
    try {
      const errorBody = await context.clone().json();

      if (errorBody?.message) {
        return String(errorBody.message);
      }

      if (errorBody?.error) {
        return String(errorBody.error);
      }

      return JSON.stringify(errorBody);
    } catch {
      try {
        const errorText = await context.clone().text();

        if (errorText) {
          return errorText;
        }
      } catch {
        // Hata gövdesi okunamazsa genel hata kullanılacak.
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "R2 Edge Function çağrısı başarısız oldu.";
}

async function callR2ObjectFunction({
  requireAuth = false,
  ...params
}: R2FunctionParams) {
  const { data, error } = await supabase.functions.invoke<R2ObjectResponse>(
    "r2-object",
    {
      body: {
        ...params,
        requireAuth,
      },
    },
  );

  if (error) {
    const message = await getFunctionErrorMessage(error);
    throw new Error(message);
  }

  if (!data?.success) {
    throw new Error(
      data?.message ?? data?.error ?? "R2 işlemi başarısız oldu.",
    );
  }

  return data;
}

export async function getR2UploadUrl({
  key,
  contentType,
  requireAuth = false,
}: GetR2UploadUrlParams) {
  const data = await callR2ObjectFunction({
    action: "upload-url",
    key,
    contentType,
    requireAuth,
  });

  if (!data.uploadUrl) {
    throw new Error("R2 upload URL oluşturulamadı.");
  }

  return data.uploadUrl;
}

export async function uploadFileToR2({
  file,
  key,
  contentType,
  requireAuth = false,
}: UploadFileToR2Params) {
  const uploadUrl = await getR2UploadUrl({
    key,
    contentType,
    requireAuth,
  });

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!response.ok) {
    let message = "Fotoğraf R2 üzerine yüklenemedi.";

    try {
      const errorText = await response.text();

      if (errorText) {
        message = `${message} ${errorText}`;
      }
    } catch {
      // ignore
    }

    throw new Error(message);
  }

  return {
    key,
  };
}

export async function getR2SignedUrl(key: string | null, requireAuth = false) {
  if (!key) {
    return "";
  }

  if (isDirectUrl(key)) {
    return key;
  }

  const data = await callR2ObjectFunction({
    action: "get-url",
    key,
    requireAuth,
  });

  if (!data.signedUrl) {
    throw new Error("R2 signed URL oluşturulamadı.");
  }

  return data.signedUrl;
}

export async function deleteR2Object(key: string, requireAuth = false) {
  if (isDirectUrl(key)) {
    return true;
  }

  await callR2ObjectFunction({
    action: "delete",
    key,
    requireAuth,
  });

  return true;
}
