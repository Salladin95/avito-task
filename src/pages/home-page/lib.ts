import { AD } from "~/shared/types"
import { ADS_LIMIT } from "~/shared/api"
import { AD_TYPE } from "~/shared/constants"
import { compose } from "~/shared/lib"

/**
 * Filters ads by name.
 * @param {AD[] | undefined} ads - Array of ads.
 * @param {string} filterByName - Filter criterion for ad names.
 * @returns {AD[] | undefined} Filtered array of ads.
 */
export function filterAdsByName(ads: AD[], filterByName: string) {
	if (!filterByName) return ads
	return ads?.filter((ad) => ad.name.toLowerCase().includes(filterByName.toLowerCase()))
}

/**
 * Filters ads by type.
 * @param {AD[] | undefined} ads - Array of ads.
 * @param {string} type - Filter criterion for ad type.
 * @returns {AD[] | undefined} Filtered array of ads.
 */
export function filterAdsByType(ads: AD[], type: string) {
	if (!type) return ads
	return ads?.filter((ad) => ad.type === type)
}

/**
 * Filters car ads by brand.
 * @param {AD[] | undefined} ads - Array of ads.
 * @param {string} brand - Car brand to filter by.
 * @returns {AD[] | undefined} Filtered array of car ads.
 */
export function filterAdsByCarBrand(ads: AD[], brand: string) {
	if (!brand) return ads
	return ads.filter((ad) => ad.type === AD_TYPE.AUTO && ad.brand === brand)
}

/**
 * Filters real estate ads by property type.
 * @param {AD[] | undefined} ads - Array of ads.
 * @param {string} type - Property type to filter by (e.g., "apartment", "house").
 * @returns {AD[] | undefined} Filtered array of real estate ads.
 */
export function filterAdsByRealEstateType(ads: AD[], type: string) {
	if (!type) return ads
	return ads.filter((ad) => ad.type === AD_TYPE.REAL_ESTATE && ad.propertyType === type)
}

/**
 * Filters service ads by service type.
 * @param {AD[] | undefined} ads - Array of ads.
 * @param {string} type - Service type to filter by (e.g., "cleaning", "plumbing").
 * @returns {AD[] | undefined} Filtered array of service ads.
 */
export function filterAdsByServicesType(ads: AD[], type: string) {
	if (!type) return ads
	return ads.filter((ad) => ad.type === AD_TYPE.SERVICES && ad.serviceType === type)
}

type ProcessedAds = { ads: AD[]; totalAds: number; adsPerPage: number }

/**
 * Paginates ads.
 * @param {AD[] | undefined} ads - Array of ads.
 * @param {number} page - Current page number.
 * @param {number} [limit=ADS_LIMIT] - Number of ads per page.
 */
export function paginateAds(ads: AD[], page: number, limit = ADS_LIMIT): ProcessedAds {
	if (!ads || !ads.length) return { ads: [], totalAds: 0, adsPerPage: 0 }
	const startIndex = (page - 1) * limit
	const endIndex = page * limit
	return {
		ads: ads.slice(startIndex, endIndex),
		totalAds: ads.length,
		adsPerPage: ads.length <= limit ? ads.length : limit,
	}
}

/**
 * Processes ads by applying filtering and pagination.
 * @param {Object} params - Parameters for processing ads.
 * @param {AD[] | undefined} params.ads - Array of ads.
 * @param {string} params.filterByName - Filter criterion for ad names.
 * @param {string} params.type - Filter criterion for ad type.
 * @param {number} params.page - Current page number.
 * @param {number} [params.limit=ADS_LIMIT] - Number of ads per page.
 */
export function processAds({
	ads,
	filterByName,
	type,
	page,
	limit = ADS_LIMIT,
	propertyType,
	serviceType,
	carBrand,
}: {
	ads: AD[] | undefined
	filterByName: string
	type: string
	page: number
	serviceType: string
	carBrand: string
	propertyType: string
	limit?: number
}): ProcessedAds {
	if (!ads) return { ads: [], totalAds: 0, adsPerPage: 0 }

	// Compose filtering functions dynamically
	const pipeline = compose<AD[]>(
		(ads) => filterAdsByServicesType(ads, serviceType),
		(ads) => filterAdsByCarBrand(ads, carBrand),
		(ads) => filterAdsByRealEstateType(ads, propertyType),
		(ads) => filterAdsByType(ads, type),
		(ads) => filterAdsByName(ads, filterByName),
	)

	return paginateAds(pipeline(ads), page, limit)
}
