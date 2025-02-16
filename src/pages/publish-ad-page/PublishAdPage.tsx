import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Heading } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { toaster, Toaster } from "~/components/ui/toaster"

import { ADS_QUERY_KEY } from "~/shared/api"
import { AdForm } from "src/features/ad-forms"
import { AD_TYPE } from "~/shared/constants/constants"
import { useCreateAdMutation } from "~/pages/publish-ad-page/api"
import {
	type AutoFormType,
	type AdFormBaseSchema,
	type RealEstateFormType,
	type PublishAdSecondStepFormType,
	type ServicesFormType,
} from "~/features/ad-forms/schemas"
import { toBase64 } from "~/shared/lib"
import { useUserId } from "~/shared/context"
import { useProtectedRoute } from "~/shared/hooks"

const TOAST_DURATION = 3000

export function PublishAdPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [step, setStep] = useState<0 | 1>(0)
	const [mainStepData, setMainStep] = useState<AdFormBaseSchema | null>(null)
	const type = mainStepData?.type.length ? mainStepData?.type[0] : null

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
			navigate("/")
		},
	})

	function handleMainStepSubmit(data: AdFormBaseSchema) {
		setMainStep(data)
		setStep(1)
	}

	const userId = useUserId()
	useProtectedRoute()

	async function handleSecondStepSubmit(formData: PublishAdSecondStepFormType) {
		if (!mainStepData) return
		let image: undefined | string = undefined
		if (mainStepData.image) {
			image = await toBase64(mainStepData.image[0])
		}
		createAd({ ...mainStepData, ...formData, userId: userId ?? "", image })
	}

	function handleRealEstateFormSubmit(data: RealEstateFormType) {
		handleSecondStepSubmit({
			type: AD_TYPE.REAL_ESTATE,
			...data,
			propertyType: data.propertyType[0],
		})
	}

	function handleAutoFormSubmit(data: AutoFormType) {
		handleSecondStepSubmit({
			type: AD_TYPE.AUTO,
			...data,
			brand: data.brand[0],
		})
	}

	function handleServicesFormSubmit(data: ServicesFormType) {
		handleSecondStepSubmit({
			type: AD_TYPE.SERVICES,
			...data,
			serviceType: data.serviceType[0],
		})
	}

	return (
		<Container as={"main"} mx={"auto"} pt={"2rem"}>
			<Heading fontSize={"3rem"} mb={"3rem"} textAlign={"center"} size="2xl">
				Создание объявления
			</Heading>
			<AdForm
				onMainStepSubmit={handleMainStepSubmit}
				onRealEstateFormSubmit={handleRealEstateFormSubmit}
				onAutoFormSubmit={handleAutoFormSubmit}
				onServicesFormSubmit={handleServicesFormSubmit}
				step={step}
				adType={type}
			/>
			<Toaster />
		</Container>
	)
}
