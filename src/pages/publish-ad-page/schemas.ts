import * as z from "zod"
import { AD_TYPE, CAR_BRAND, REAL_ESTATE_TYPE, SERVICE_TYPE } from "~/shared/constants/constants.ts"

/**
 * Schema for the main step of the form.
 */
export const mainStepSchema = z.object({
	name: z.string().min(1, "Название обязательно"),
	description: z.string().min(1, "Описание обязательно"),
	location: z.string().min(1, "Локация обязательна"),
	image: z.any().optional(),
	type: z.nativeEnum(AD_TYPE).array(),
})

/**
 * Type for the main step form data.
 */
export type MainStepFormType = z.infer<typeof mainStepSchema>

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
export type AutoFormType = z.infer<typeof autoSchema>

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
export type RealEstateFormType = z.infer<typeof realEstateSchema>

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
export type ServicesFormType = z.infer<typeof servicesSchema>

export type PublishAdSecondStepFormType =
	| {
			type: typeof AD_TYPE.REAL_ESTATE
			propertyType: string
			area: number
			rooms: number
			price: number
	  }
	| {
			type: typeof AD_TYPE.AUTO
			brand: string
			model: string
			year: number
			mileage?: number
	  }
	| {
			type: typeof AD_TYPE.SERVICES
			serviceType: string
			experience: number
			cost: number
			schedule?: string
	  }

export type FullPublishAdFormType = Omit<MainStepFormType, "type"> & PublishAdSecondStepFormType
