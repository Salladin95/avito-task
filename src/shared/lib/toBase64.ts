/**
 * Converts a File or Blob to a Base64-encoded string.
 *
 * @param {File | Blob} file - The file or blob to convert.
 * @returns {Promise<string>} A promise that resolves to the Base64 string.
 * @throws {TypeError} If the provided argument is not a valid File or Blob.
 */
export function toBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!(file instanceof Blob)) {
            return reject(new TypeError("Input must be a File or Blob"));
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}
