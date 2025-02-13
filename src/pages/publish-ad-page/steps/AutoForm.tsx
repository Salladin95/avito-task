import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Stack } from "@chakra-ui/react"

import { Select } from "~/shared/ui"
import { Field } from "~/components/ui/field"
import { CAR_BRAND, CAR_BRAND_OPTIONS } from "~/app/constants.ts"
import { autoSchema, type AutoFormType } from "~/pages/publish-ad-page/schemas"
import { NumberInputField, NumberInputRoot } from "~/components/ui/number-input"

type AutoFormProps = {
	onSubmit: (data: AutoFormType) => void
}

const autoDefaultValue: AutoFormType = {
	brand: [CAR_BRAND.MERCEDES],
	model: "",
	year: new Date().getFullYear(), // Default to the current year
	mileage: undefined,
}

export function AutoForm(props: AutoFormProps) {
	const { onSubmit } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<AutoFormType>({
		resolver: zodResolver(autoSchema),
		defaultValues: autoDefaultValue,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction={"column"} gap={"1rem"} justify={"center"}>
				<Field label={"Марка:"} errorText={errors.brand?.message}>
					<Input {...register("brand")} placeholder="Введите марку..." />
				</Field>
				<Controller
					control={control}
					render={({ field: { value, onChange, ...rest } }) => (
						<Select
							label={"Марка"}
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
					<NumberInputRoot min={1886}>
						<NumberInputField {...register("year")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Пробег:"} errorText={errors.mileage?.message}>
					<NumberInputRoot min={1886}>
						<NumberInputField {...register("mileage")} />
					</NumberInputRoot>
				</Field>
			</Stack>
			<Button mt={"1rem"} mx={"auto"} type="submit">
				Вперед
			</Button>
		</form>
	)
}
