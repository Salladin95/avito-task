import * as z from "zod"
import {
	AD_TYPE,
	AdCategoryType,
	CAR_BRAND,
	CarBrand,
	REAL_ESTATE_TYPE,
	RealEstateType, SERVICE_TYPE,
	ServiceType,
} from "~/shared/constants/constants.ts"

/**
 * Schema for the main step of the form.
 */
export const adFormBaseSchema = z.object({
	name: z.string().min(1, "Название обязательно"),
	description: z.string().min(1, "Описание обязательно"),
	location: z.string().min(1, "Локация обязательна"),
	image: z.any().optional(),
	type: z.nativeEnum(AD_TYPE).array(),
})

/**
 * Type for the main step form data.
 */
export type AdFormBaseSchema = {
	type: AdCategoryType[]
	description: string
	location: string
	name: string
	image?: FileList
}

/**
 * Schema for the auto type step.
 */
export const autoSchema = z.object({
	brand: z.nativeEnum(CAR_BRAND).array(),
	model: z.string().min(1, "Модель обязательна"),
	year: z.coerce.number({ message: "Обязательное поле" }).min(1886, "Минимальное значение - 1886"),
	mileage: z.coerce.number().min(0, "Поле не может быть меньше 0"),
})

/**
 * Type for the auto form data.
 */
export type AutoFormType = {
	brand: CarBrand[]
	model: string
	year: number
	mileage: number
}

/**
 * Schema for the real estate type step.
 */
export const realEstateSchema = z.object({
	propertyType: z.nativeEnum(REAL_ESTATE_TYPE).array(),
	area: z.coerce.number().min(1, "Площадь обязательна"),
	rooms: z.coerce.number().min(1, "Количество комнат обязательно"),
	price: z.coerce.number().min(1, "Цена обязательна"),
})

/**
 * Type for the real estate form data.
 */
export type RealEstateFormType = {
	propertyType: RealEstateType[]
	area: number
	rooms: number
	price: number
}

/**
 * Schema for the services type step.
 */
export const servicesSchema = z.object({
	serviceType: z.nativeEnum(SERVICE_TYPE).array(),
	experience: z.coerce.number().min(1, "Опыт работы обязателен"),
	cost: z.coerce.number().min(1, "Стоимость обязательна"),
	schedule: z.string().optional(),
})

/**
 * Type for the services form data.
 */
export type ServicesFormType = {
	serviceType: ServiceType[]
	experience: number
	cost: number
	schedule?: string
}

export type PublishAdSecondStepFormType =
	| {
			type: typeof AD_TYPE.REAL_ESTATE
			propertyType: RealEstateType
			area: number
			rooms: number
			price: number
	  }
	| {
			type: typeof AD_TYPE.AUTO
			brand: CarBrand
			model: string
			year: number
			mileage: number
	  }
	| {
			type: typeof AD_TYPE.SERVICES
			serviceType: ServiceType
			experience: number
			cost: number
			schedule?: string
	  }

export type FullPublishAdFormType = Omit<AdFormBaseSchema, "type"> & PublishAdSecondStepFormType
