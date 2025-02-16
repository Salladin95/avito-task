import { getSelectOptions } from "~/shared/lib"
import { BaseAd, Car, RealEstate, Service } from "~/shared/types"

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
	APARTMENT: "Квартира",
	HOUSE: "Дом",
	COTTAGE: "Коттедж",
} as const
export type RealEstateType = (typeof REAL_ESTATE_TYPE)[keyof typeof REAL_ESTATE_TYPE]

export const REAL_ESTATE_TYPE_LABEL_MAP: Record<RealEstateType, string> = {
	[REAL_ESTATE_TYPE.APARTMENT]: "Квартира",
	[REAL_ESTATE_TYPE.HOUSE]: "Дом",
	[REAL_ESTATE_TYPE.COTTAGE]: "Коттедж",
} as const

export const REAL_ESTATE_TYPE_OPTIONS = getSelectOptions(REAL_ESTATE_TYPE, REAL_ESTATE_TYPE_LABEL_MAP)

export const CAR_BRAND = {
	TOYOTA: "Toyota",
	BMW: "BMW",
	MERCEDES: "Mercedes",
	LADA: "Lada",
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
	REPAIR: "Ремонт",
	CLEANING: "Уборка",
	DELIVERY: "Доставка",
} as const
export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE]

export const SERVICE_TYPE_LABEL_MAP: Record<ServiceType, string> = {
	[SERVICE_TYPE.REPAIR]: "Ремонт",
	[SERVICE_TYPE.CLEANING]: "Уборка",
	[SERVICE_TYPE.DELIVERY]: "Доставка",
} as const

export const SERVICE_TYPE_OPTIONS = getSelectOptions(SERVICE_TYPE, SERVICE_TYPE_LABEL_MAP)

export const BASE_AD_MAP_LABELS: Record<keyof Omit<BaseAd, "id" | "image">, string> = {
	name: "Название",
	description: "Описание",
	location: "Локация",
	type: "Тип",
}

export const REAL_ESTATE_MAP_LABELS: Record<keyof Omit<RealEstate, "id" | "image">, string> = {
	...BASE_AD_MAP_LABELS,
	propertyType: "Тип недвижимости",
	area: "Площадь",
	rooms: "Комнат",
	price: "Цена",
}

export const AUTO_MAP_LABELS: Record<keyof Omit<Car, "id" | "image">, string> = {
	...BASE_AD_MAP_LABELS,
	brand: "Марка",
	model: "Модель",
	year: "Год выпуска",
	mileage: "Пробег",
}

export const SERVICES_MAP_LABELS: Record<keyof Omit<Service, "id" | "image">, string> = {
	...BASE_AD_MAP_LABELS,
	serviceType: "Тип услуги",
	experience: "Опыт",
	cost: "Стоимость",
	schedule: "График",
}
