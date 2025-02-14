import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "~/shared/constants/constants"

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
