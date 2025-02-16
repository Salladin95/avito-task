import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Heading } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { toaster, Toaster } from "~/components/ui/toaster"

import { AdForm } from "src/features/ad-forms"
import { LoaderScreen } from "~/shared/ui"
import { AD_TYPE } from "~/shared/constants/constants"
import { ADS_QUERY_KEY, useGetAdById } from "~/shared/api"
import { useEditAdMutation } from "~/pages/edit-ad-page/api"
import {
	type AutoFormType,
	type AdFormBaseSchema,
	type RealEstateFormType,
	type PublishAdSecondStepFormType,
	type ServicesFormType,
} from "~/features/ad-forms/schemas.ts"

const TOAST_DURATION = 3000

export function EditAdPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { id } = useParams()
	const ad = useGetAdById(Number(id), { enabled: Boolean(id) })

	const [step, setStep] = useState<0 | 1>(0)
	const [mainStepData, setMainStep] = useState<AdFormBaseSchema | null>(null)

	const { mutate: createAd } = useEditAdMutation({
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

	if (ad.isPending) return <LoaderScreen />

	if (ad.error || !ad.data) {
		navigate("/e404")
		return null
	}

	const type = mainStepData?.type.length ? mainStepData?.type[0] : ad.data.type

	function handleMainStepSubmit(data: AdFormBaseSchema) {
		setMainStep(data)
		setStep(1)
	}

	function handleSecondStepSubmit(formData: PublishAdSecondStepFormType) {
		if (!mainStepData) return
		createAd({ ...mainStepData, ...formData, id: Number(id) })
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
				Редактирование объявления
			</Heading>
			<AdForm
				onMainStepSubmit={handleMainStepSubmit}
				onRealEstateFormSubmit={handleRealEstateFormSubmit}
				onAutoFormSubmit={handleAutoFormSubmit}
				onServicesFormSubmit={handleServicesFormSubmit}
				step={step}
				adType={type}
				ad={ad.data}
			/>
			<Toaster />
		</Container>
	)
}
