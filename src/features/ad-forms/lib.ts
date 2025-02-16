import { AD } from "~/shared/types"
import { AD_TYPE } from "~/shared/constants"
import { AdFormBaseSchema, AutoFormType, RealEstateFormType, ServicesFormType } from "~/features/ad-forms/schemas.ts"

/**
 * Extracts form data from an AD object and structures it into base and type-specific data.
 *
 * @param {AD} ad - The advertisement object to extract data from.
 * @returns {{ base: AdFormBaseSchema; second: RealEstateFormType | ServicesFormType | AutoFormType }}
 *    An object containing the base form data and type-specific data.
 * @throws {Error} If the ad type is unknown.
 */
export function getAdFormData(ad?: AD):
	| undefined
	| {
			base: AdFormBaseSchema
			second: RealEstateFormType | ServicesFormType | AutoFormType
	  } {
	if (!ad) return

	const base: AdFormBaseSchema = {
		name: ad.name,
		description: ad.description,
		location: ad.location,
		type: [ad.type],
	}

	let second: RealEstateFormType | ServicesFormType | AutoFormType

	switch (ad.type) {
		case AD_TYPE.REAL_ESTATE:
			second = {
				propertyType: [ad.propertyType],
				area: ad.area,
				rooms: ad.rooms,
				price: ad.price,
			}
			break

		case AD_TYPE.AUTO:
			second = {
				brand: [ad.brand],
				model: ad.model,
				year: ad.year,
				mileage: ad.mileage,
			}
			break

		case AD_TYPE.SERVICES:
			second = {
				serviceType: [ad.serviceType],
				experience: ad.experience,
				cost: ad.cost,
				schedule: ad.schedule,
			}
			break

		default:
			throw new Error("Unknown ad type")
	}

	return { base, second }
}
