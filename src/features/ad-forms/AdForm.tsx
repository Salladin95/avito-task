import { ReactNode } from "react"

import { AD_TYPE, AdCategoryType } from "~/shared/constants"

import { AD } from "~/shared/types"
import { getAdFormData } from "~/features/ad-forms/lib"
import { AutoForm } from "~/features/ad-forms/AutoForm"
import { AdBaseForm } from "~/features/ad-forms/AdBaseForm"
import { RealEstateForm } from "~/features/ad-forms/RealEstateForm"
import { ServicesForm } from "~/features/ad-forms/ServicesForm"
import type { AdFormBaseSchema, AutoFormType, RealEstateFormType, ServicesFormType } from "~/features/ad-forms/schemas"

type AdFormProps = {
	onMainStepSubmit: (data: AdFormBaseSchema) => void
	onRealEstateFormSubmit: (data: RealEstateFormType) => void
	onAutoFormSubmit: (data: AutoFormType) => void
	onServicesFormSubmit: (data: ServicesFormType) => void
	isSubmitting?: boolean
	step: 0 | 1
	adType: AdCategoryType | null
	ad?: AD
}

export function AdForm(props: AdFormProps) {
	const {
		onMainStepSubmit,
		onServicesFormSubmit,
		onRealEstateFormSubmit,
		onAutoFormSubmit,
		isSubmitting,
		adType: type,
		step,
		ad,
	} = props

	const adFormData = getAdFormData(ad)

	if (step === 0) return <AdBaseForm defaultValues={adFormData?.base} onSubmit={onMainStepSubmit} />

	if (!type) return null

	if (step === 1) {
		const categoryMap: Record<AdCategoryType, ReactNode> = {
			[AD_TYPE.REAL_ESTATE]: (
				<RealEstateForm
					defaultValues={adFormData?.second as undefined | RealEstateFormType}
					isSubmitting={isSubmitting}
					onSubmit={onRealEstateFormSubmit}
				/>
			),
			[AD_TYPE.AUTO]: (
				<AutoForm
					defaultValues={adFormData?.second as undefined | AutoFormType}
					isSubmitting={isSubmitting}
					onSubmit={onAutoFormSubmit}
				/>
			),
			[AD_TYPE.SERVICES]: (
				<ServicesForm
					defaultValues={adFormData?.second as undefined | ServicesFormType}
					isSubmitting={isSubmitting}
					onSubmit={onServicesFormSubmit}
				/>
			),
		}
		return categoryMap[type]
	}

	return null
}
