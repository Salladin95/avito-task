import { SelectOption } from "~/shared/types"

/**
 * Converts a category map and its label map into an array of SelectOption.
 *
 * @template T - A record where keys are category values and values are labels.
 * @param {T} categoryMap - The category constant object (e.g., AD_CATEGORY).
 * @param {Record<T[keyof T], string>} labelMap - The corresponding label map.
 * @returns {SelectOption[]} - The array of options for a select input.
 */
export const getSelectOptions = <KeyType extends string>(
	categoryMap: Record<string, KeyType>,
	labelMap: Record<KeyType, string>,
): SelectOption[] => {
	return Object.values(categoryMap).map((value) => ({
		value,
		label: labelMap[value],
	}))
}
