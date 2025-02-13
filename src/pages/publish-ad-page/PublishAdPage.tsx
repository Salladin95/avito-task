import { ReactNode, useState } from "react"
import { AD_CATEGORY, AdCategoryType } from "~/app/constants"
import {
	type AutoFormType,
	type MainStepFormType,
	type RealEstateFormType,
	type SecondStepFormType,
	type ServicesFormType,
} from "~/pages/publish-ad-page/schemas"
import { AutoForm, MainStepForm, RealEstateForm, ServicesForm } from "~/pages/publish-ad-page/steps"
import { Container } from "@chakra-ui/react"

export function PublishAdPage() {
	const [step, setStep] = useState<0 | 1>(0)
	const [mainStepData, setMainStep] = useState<MainStepFormType | null>(null)
	const category = mainStepData?.category.length ? mainStepData?.category[0] : null

	function onMainStepSubmit(data: MainStepFormType) {
		setMainStep(data)
		setStep(1)
	}

	function handleSecondStepSubmit(formData: SecondStepFormType) {
		if (!mainStepData) return
		console.log({ ...mainStepData, ...formData })
	}

	function onRealEstateFormSubmit(data: RealEstateFormType) {
		handleSecondStepSubmit({
			category: AD_CATEGORY.REAL_ESTATE,
			...data,
		})
	}

	function onAutoFormSubmit(data: AutoFormType) {
		handleSecondStepSubmit({
			category: AD_CATEGORY.AUTO,
			...data,
		})
	}

	function onServicesFormSubmit(data: ServicesFormType) {
		handleSecondStepSubmit({
			category: AD_CATEGORY.SERVICES,
			...data,
		})
	}

	const renderStepContent = (step: number, category?: AdCategoryType | null) => {
		if (step === 0) return <MainStepForm onSubmit={onMainStepSubmit} />

		if (!category) return null

		if (step === 1) {
			const categoryMap: Record<AdCategoryType, ReactNode> = {
				[AD_CATEGORY.REAL_ESTATE]: <RealEstateForm onSubmit={onRealEstateFormSubmit} />,
				[AD_CATEGORY.AUTO]: <AutoForm onSubmit={onAutoFormSubmit} />,
				[AD_CATEGORY.SERVICES]: <ServicesForm onSubmit={onServicesFormSubmit} />,
			}

			return categoryMap[category]
		}

		return null
	}

	return (
		<main>
			<Container mx={"auto"} pt={"4rem"}>{renderStepContent(step, category)}</Container>
		</main>
	)
}
