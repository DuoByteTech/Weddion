const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024;

const QUALITY_STEPS = [0.85, 0.75, 0.65, 0.55];

const WIDTH_STEPS = [3000, 2600, 2200, 2000, 1800, 1600];

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Fotoğraf açılamadı."));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Fotoğraf sıkıştırılamadı."));

          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

async function compressImage(
  image: HTMLImageElement,
  width: number,
  quality: number,
) {
  const ratio = Math.min(1, width / image.naturalWidth);

  const targetWidth = Math.round(image.naturalWidth * ratio);

  const targetHeight = Math.round(image.naturalHeight * ratio);

  const canvas = document.createElement("canvas");

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Fotoğraf işlenemedi.");
  }

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  return canvasToBlob(canvas, quality);
}

function createCompressedFile(blob: Blob, originalFile: File) {
  const fileName = originalFile.name.replace(/\.[^/.]+$/, "").concat(".jpg");

  return new File([blob], fileName, {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

export async function compressGuestPhoto(file: File): Promise<File> {
  if (file.size <= MAX_FILE_SIZE_BYTES) {
    return file;
  }

  const image = await loadImage(file);

  /*
   * Önce çözünürlüğü değiştirmeden
   * sadece kaliteyi düşürüyoruz.
   */
  for (const quality of QUALITY_STEPS) {
    const blob = await compressImage(image, image.naturalWidth, quality);

    if (blob.size <= MAX_FILE_SIZE_BYTES) {
      return createCompressedFile(blob, file);
    }
  }

  /*
   * Kalite düşürmek yetmezse
   * mobildeki gibi çözünürlüğü
   * kademeli olarak azaltıyoruz.
   */
  for (const width of WIDTH_STEPS) {
    for (const quality of QUALITY_STEPS) {
      const blob = await compressImage(image, width, quality);

      if (blob.size <= MAX_FILE_SIZE_BYTES) {
        return createCompressedFile(blob, file);
      }
    }
  }

  throw new Error(`"${file.name}" 3 MB altına indirilemedi.`);
}
