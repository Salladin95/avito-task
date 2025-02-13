import * as z from "zod"
import { AD_CATEGORY, CAR_BRAND, REAL_ESTATE_TYPE, SERVICE_TYPE } from "~/app/constants"

/**
 * Schema for the main step of the form.
 */
export const mainStepSchema = z.object({
	title: z.string().min(1, "Название обязательно"),
	description: z.string().min(1, "Описание обязательно"),
	location: z.string().min(1, "Локация обязательна"),
	image: z.any().optional(),
	category: z.nativeEnum(AD_CATEGORY).array(),
})

/**
 * Type for the main step form data.
 */
export type MainStepFormType = z.infer<typeof mainStepSchema>

/**
 * Schema for the auto category step.
 */
export const autoSchema = z.object({
	brand: z.nativeEnum(CAR_BRAND).array(),
	model: z.string().min(1, "Модель обязательна"),
	year: z.number().min(1886, "Год выпуска обязателен"),
	mileage: z.number().optional(),
})

/**
 * Type for the auto form data.
 */
export type AutoFormType = z.infer<typeof autoSchema>

/**
 * Schema for the real estate category step.
 */
export const realEstateSchema = z.object({
	propertyType: z.nativeEnum(REAL_ESTATE_TYPE).array(),
	area: z.number().min(1, "Площадь обязательна"),
	rooms: z.number().min(1, "Количество комнат обязательно"),
	price: z.number().min(1, "Цена обязательна"),
})

/**
 * Type for the real estate form data.
 */
export type RealEstateFormType = z.infer<typeof realEstateSchema>

/**
 * Schema for the services category step.
 */
export const servicesSchema = z.object({
	serviceType: z.nativeEnum(SERVICE_TYPE).array(),
	experience: z.number().min(1, "Опыт работы обязателен"),
	cost: z.number().min(1, "Стоимость обязательна"),
	schedule: z.string().optional(),
})

/**
 * Type for the services form data.
 */
export type ServicesFormType = z.infer<typeof servicesSchema>

export type SecondStepFormType =
	| {
			category: "REAL_ESTATE"
			propertyType: string
			area: number
			rooms: number
			price: number
	  }
	| {
			category: "AUTO"
			brand: string
			model: string
			year: number
			mileage?: number
	  }
	| {
			category: "SERVICES"
			serviceType: string
			experience: number
			cost: number
			schedule?: string
	  }

export type FullFormType = Omit<MainStepFormType, "category"> & SecondStepFormType
