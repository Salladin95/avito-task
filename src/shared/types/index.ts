import { AD_TYPE, CarBrand, RealEstateType, ServiceType } from "~/shared/constants"

export type SelectOption = {
	label: string
	value: string
}

interface BaseAd {
	id: number
	name: string
	description: string
	location: string
	type: string
	image?: string
}

interface RealEstate extends BaseAd {
	type: typeof AD_TYPE.REAL_ESTATE
	propertyType: RealEstateType
	area: number
	rooms: number
	price: number
}

interface Car extends BaseAd {
	type: typeof AD_TYPE.AUTO
	brand: CarBrand
	year: number
	mileage: number
	model: string
}

interface Service extends BaseAd {
	type: typeof AD_TYPE.SERVICES
	serviceType: ServiceType
	experience: number
	cost: number
	schedule: string
}

export type AD = RealEstate | Car | Service
