import { ReactNode, useState } from "react"
import { Container } from "@chakra-ui/react"
import { toaster, Toaster } from "~/components/ui/toaster"
import { useQueryClient } from "@tanstack/react-query"

import { ADS_QUERY_KEY } from "~/shared/api"
import { useCreateAdMutation } from "~/pages/publish-ad-page/api"
import { AD_CATEGORY, AdCategoryType } from "~/shared/constants/constants"
import {
	type AutoFormType,
	type MainStepFormType,
	type RealEstateFormType,
	type PublishAdSecondStepFormType,
	type ServicesFormType,
} from "~/pages/publish-ad-page/schemas"
import { AutoForm, MainStepForm, RealEstateForm, ServicesForm } from "~/pages/publish-ad-page/steps"

const TOAST_DURATION = 3000

export function PublishAdPage() {
	const [step, setStep] = useState<0 | 1>(0)
	const [mainStepData, setMainStep] = useState<MainStepFormType | null>(null)
	const type = mainStepData?.type.length ? mainStepData?.type[0] : null
	const queryClient = useQueryClient()

	const { mutate: createAd } = useCreateAdMutation({
		onError: (err) => {
			toaster.create({
				title: "Failure",
				description: err.message,
				type: "error",
				duration: TOAST_DURATION,
			})
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: [ADS_QUERY_KEY] })
			toaster.create({
				title: "Success",
				description: "Ваше объявление успешно создано!",
				type: "success",
				duration: TOAST_DURATION,
			})
		},
	})

	function onMainStepSubmit(data: MainStepFormType) {
		setMainStep(data)
		setStep(1)
	}

	function handleSecondStepSubmit(formData: PublishAdSecondStepFormType) {
		if (!mainStepData) return
		createAd({ ...mainStepData, ...formData })
	}

	function onRealEstateFormSubmit(data: RealEstateFormType) {
		handleSecondStepSubmit({
			type: AD_CATEGORY.REAL_ESTATE,
			...data,
			propertyType: data.propertyType[0],
		})
	}

	function onAutoFormSubmit(data: AutoFormType) {
		handleSecondStepSubmit({
			type: AD_CATEGORY.AUTO,
			...data,
			brand: data.brand[0],
		})
	}

	function onServicesFormSubmit(data: ServicesFormType) {
		handleSecondStepSubmit({
			type: AD_CATEGORY.SERVICES,
			...data,
			serviceType: data.serviceType[0],
		})
	}

	const renderStepContent = (step: number, type?: AdCategoryType | null) => {
		if (step === 0) return <MainStepForm onSubmit={onMainStepSubmit} />

		if (!type) return null

		if (step === 1) {
			const categoryMap: Record<AdCategoryType, ReactNode> = {
				[AD_CATEGORY.REAL_ESTATE]: <RealEstateForm onSubmit={onRealEstateFormSubmit} />,
				[AD_CATEGORY.AUTO]: <AutoForm onSubmit={onAutoFormSubmit} />,
				[AD_CATEGORY.SERVICES]: <ServicesForm onSubmit={onServicesFormSubmit} />,
			}

			return categoryMap[type]
		}

		return null
	}

	return (
		<Container as={"main"} mx={"auto"} pt={"4rem"}>
			{renderStepContent(step, type)}
			<Toaster />
		</Container>
	)
}
