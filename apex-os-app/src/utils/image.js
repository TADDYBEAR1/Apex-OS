/**
 * Compresses an image File to a small JPEG data URL safe for localStorage.
 * A raw phone photo (2-10MB) as base64 would blow the ~5MB quota and silently
 * break ALL state persistence — so profile photos are stored as thumbnails.
 */
export async function compressImageFile(file, maxDim = 256, quality = 0.82) {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', quality);
  } finally {
    bitmap.close?.();
  }
}
