import { getSelectOptions } from "~/shared/lib"

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

export const AD_TYPE = {
	REAL_ESTATE: "Недвижимость",
	AUTO: "Авто",
	SERVICES: "Услуги",
} as const
export type AdCategoryType = (typeof AD_TYPE)[keyof typeof AD_TYPE]

export const AD_TYPE_LABEL_MAP: Record<AdCategoryType, string> = {
	[AD_TYPE.REAL_ESTATE]: "Недвижимость",
	[AD_TYPE.AUTO]: "Авто",
	[AD_TYPE.SERVICES]: "Услуги",
} as const

export const AD_CATEGORY_OPTIONS = getSelectOptions(AD_TYPE, AD_TYPE_LABEL_MAP)

export const REAL_ESTATE_TYPE = {
	APARTMENT: "APARTMENT",
	HOUSE: "HOUSE",
	COTTAGE: "COTTAGE",
} as const
export type RealEstateType = (typeof REAL_ESTATE_TYPE)[keyof typeof REAL_ESTATE_TYPE]

export const REAL_ESTATE_TYPE_LABEL_MAP: Record<RealEstateType, string> = {
	[REAL_ESTATE_TYPE.APARTMENT]: "Квартира",
	[REAL_ESTATE_TYPE.HOUSE]: "Дом",
	[REAL_ESTATE_TYPE.COTTAGE]: "Коттедж",
} as const

export const REAL_ESTATE_TYPE_OPTIONS = getSelectOptions(REAL_ESTATE_TYPE, REAL_ESTATE_TYPE_LABEL_MAP)

export const CAR_BRAND = {
	TOYOTA: "TOYOTA",
	BMW: "BMW",
	MERCEDES: "MERCEDES",
	LADA: "LADA",
} as const
export type CarBrand = (typeof CAR_BRAND)[keyof typeof CAR_BRAND]

export const CAR_BRAND_LABEL_MAP: Record<CarBrand, string> = {
	[CAR_BRAND.TOYOTA]: "Toyota",
	[CAR_BRAND.BMW]: "BMW",
	[CAR_BRAND.MERCEDES]: "Mercedes",
	[CAR_BRAND.LADA]: "Lada",
} as const
export const CAR_BRAND_OPTIONS = getSelectOptions(CAR_BRAND, CAR_BRAND_LABEL_MAP)

export const SERVICE_TYPE = {
	REPAIR: "REPAIR",
	CLEANING: "CLEANING",
	DELIVERY: "DELIVERY",
} as const
export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE]

export const SERVICE_TYPE_LABEL_MAP: Record<ServiceType, string> = {
	[SERVICE_TYPE.REPAIR]: "Ремонт",
	[SERVICE_TYPE.CLEANING]: "Уборка",
	[SERVICE_TYPE.DELIVERY]: "Доставка",
} as const

export const SERVICE_TYPE_OPTIONS = getSelectOptions(SERVICE_TYPE, SERVICE_TYPE_LABEL_MAP)
