import { AD_TYPE, CarBrand, RealEstateType, ServiceType } from "~/shared/constants"

export type SelectOption = {
	label: string
	value: string
}

export interface BaseAd {
	id: number
	name: string
	description: string
	location: string
	type: string
	image?: string
	userId: string
}

export interface RealEstate extends BaseAd {
	type: typeof AD_TYPE.REAL_ESTATE
	propertyType: RealEstateType
	area: number
	rooms: number
	price: number
}

export interface Car extends BaseAd {
	type: typeof AD_TYPE.AUTO
	brand: CarBrand
	year: number
	mileage: number
	model: string
}

export interface Service extends BaseAd {
	type: typeof AD_TYPE.SERVICES
	serviceType: ServiceType
	experience: number
	cost: number
	schedule?: string
}

export type AD = RealEstate | Car | Service
