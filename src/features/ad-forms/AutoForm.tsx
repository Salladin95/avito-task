import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Stack } from "@chakra-ui/react"

import { Select } from "~/shared/ui"
import { Field } from "~/components/ui/field"
import { CAR_BRAND, CAR_BRAND_OPTIONS } from "~/shared/constants/constants"
import { autoSchema, type AutoFormType } from "~/features/ad-forms/schemas"
import { NumberInputField, NumberInputRoot } from "~/components/ui/number-input"

type AutoFormProps = {
	onSubmit: (data: AutoFormType) => void
	isSubmitting?: boolean
	defaultValues?: AutoFormType
}

const autoDefaultValue: AutoFormType = {
	brand: [CAR_BRAND.MERCEDES],
	model: "",
	year: new Date().getFullYear(),
	mileage: 0,
}

export function AutoForm(props: AutoFormProps) {
	const { onSubmit, isSubmitting, defaultValues = autoDefaultValue } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<AutoFormType>({
		resolver: zodResolver(autoSchema),
		defaultValues: defaultValues,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction={"column"} gap={"1rem"} justify={"center"}>
				<Controller
					control={control}
					render={({ field: { value, onChange, ...rest } }) => (
						<Select
							label={"Марка:"}
							placeholder={"Выберите марку автомобиля"}
							options={CAR_BRAND_OPTIONS}
							invalid={Boolean(errors.brand)}
							value={value}
							onValueChange={({ value }) => {
								onChange(value)
							}}
							{...rest}
							width="320px"
						/>
					)}
					name={"brand"}
				/>
				<Field label={"Модель:"} errorText={errors.model?.message}>
					<Input {...register("model")} placeholder="Введите модель..." />
				</Field>
				<Field label={"Год выпуска:"} errorText={errors.year?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("year")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Пробег:"} helperText={"км."} errorText={errors.mileage?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("mileage")} />
					</NumberInputRoot>
				</Field>
			</Stack>
			<Button loading={isSubmitting} loadingText="Отправляем..." spinnerPlacement="start" mt={"1rem"} mx={"auto"} type="submit">
				Отправить
			</Button>
		</form>
	)
}
