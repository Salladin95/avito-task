/**
 * Converts a given size in megabytes (MB) to bytes.
 *
 * @param {number} mb - The size in megabytes.
 * @returns {number} The size in bytes.
 *
 * @example
 * console.log(mbToBytes(1)); // 1048576
 * console.log(mbToBytes(5)); // 5242880
 * console.log(mbToBytes(10)); // 10485760
 */
function mbToBytes(mb: number): number {
	return mb * 1024 * 1024
}

export const MAX_FILE_SIZE = mbToBytes(5)
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

/**
 * Checks if the given file is too large.
 *
 * @param {File} file - The file to check.
 * @returns {boolean} True if the file size exceeds the maximum allowed size, false otherwise.
 */
export const isFileTooLarge = (file: File): boolean => file?.size > MAX_FILE_SIZE

/**
 * Checks if the given file is of a correct type.
 *
 * @param {File} file - The file to check.
 * @returns {boolean} True if the file type is one of the accepted types, false otherwise.
 */
export const isCorrectType = (file: File): boolean => ACCEPTED_IMAGE_TYPES.includes(file?.type)
