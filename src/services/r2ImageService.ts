import { supabase } from "@/lib/supabase";

type R2ObjectResponse = {
  success: boolean;
  signedUrl?: string;
  message?: string;
  error?: string;
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
        // Hata gövdesi okunamazsa aşağıdaki genel hata dönecek.
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "R2 Edge Function çağrısı başarısız oldu.";
}

export async function getR2SignedUrl(key: string | null, requireAuth = false) {
  if (!key) {
    return "";
  }

  if (isDirectUrl(key)) {
    return key;
  }

  const { data, error } = await supabase.functions.invoke<R2ObjectResponse>(
    "r2-object",
    {
      body: {
        action: "get-url",
        key,
        requireAuth,
      },
    },
  );

  if (error) {
    const message = await getFunctionErrorMessage(error);
    throw new Error(message);
  }

  if (!data?.success || !data.signedUrl) {
    throw new Error(
      data?.message ?? data?.error ?? "R2 signed URL oluşturulamadı.",
    );
  }

  return data.signedUrl;
}
