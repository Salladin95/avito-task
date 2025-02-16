import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Stack } from "@chakra-ui/react"

import { Select } from "~/shared/ui"
import { Field } from "~/components/ui/field.tsx"
import { NumberInputField, NumberInputRoot } from "~/components/ui/number-input"
import { SERVICE_TYPE, SERVICE_TYPE_OPTIONS } from "~/shared/constants/constants"
import { servicesSchema, type ServicesFormType } from "~/features/ad-forms/schemas"

type ServicesFormProps = {
	onSubmit: (data: ServicesFormType) => void
	isSubmitting?: boolean
	defaultValues?: ServicesFormType
}

const servicesDefaultValue: ServicesFormType = {
	serviceType: [SERVICE_TYPE.DELIVERY],
	experience: 0,
	cost: 0,
	schedule: "",
}

export function ServicesForm(props: ServicesFormProps) {
	const { onSubmit, isSubmitting, defaultValues = servicesDefaultValue } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ServicesFormType>({
		resolver: zodResolver(servicesSchema),
		defaultValues: defaultValues,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction={"column"} gap={"1rem"} justify={"center"}>
				<Controller
					control={control}
					render={({ field: { value, onChange, ...rest } }) => (
						<Select
							label={"Тип услуги:"}
							placeholder={"Выберите тип услуги"}
							options={SERVICE_TYPE_OPTIONS}
							invalid={Boolean(errors.serviceType)}
							value={value}
							onValueChange={({ value }) => {
								onChange(value)
							}}
							{...rest}
							width="320px"
						/>
					)}
					name={"serviceType"}
				/>
				<Field label={"Опыт работы:"} helperText={"Полное количество лет"} errorText={errors.experience?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("experience")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Стоимость:"} errorText={errors.cost?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("cost")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Расписание:"} errorText={errors.schedule?.message}>
					<Input {...register("schedule")} placeholder="Введите расписание..." />
				</Field>
			</Stack>
			<Button
				loading={isSubmitting}
				loadingText="Отправляем..."
				spinnerPlacement="start"
				mt={"1rem"}
				mx={"auto"}
				type="submit"
			>
				Отправить
			</Button>
		</form>
	)
}
