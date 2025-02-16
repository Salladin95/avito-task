import { Button, Stack } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Select } from "~/shared/ui/Select"
import { Field } from "~/components/ui/field"
import { NumberInputField, NumberInputRoot } from "~/components/ui/number-input"
import { realEstateSchema, type RealEstateFormType } from "~/features/ad-forms/schemas"
import { REAL_ESTATE_TYPE, REAL_ESTATE_TYPE_OPTIONS } from "~/shared/constants/constants"

type RealEstateFormProps = {
	onSubmit: (data: RealEstateFormType) => void
	isSubmitting?: boolean
	defaultValues?: RealEstateFormType
}

const realEstateDefaultValue: RealEstateFormType = {
	propertyType: [REAL_ESTATE_TYPE.HOUSE],
	area: 0,
	rooms: 0,
	price: 0,
}

export function RealEstateForm(props: RealEstateFormProps) {
	const { onSubmit, isSubmitting, defaultValues = realEstateDefaultValue } = props
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RealEstateFormType>({
		resolver: zodResolver(realEstateSchema),
		defaultValues: defaultValues,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction={"column"} gap={"1rem"} justify={"center"}>
				<Controller
					control={control}
					render={({ field: { value, onChange, ...rest } }) => (
						<Select
							label={"Тип недвижимости:"}
							placeholder={"Выберите тип недвижимости"}
							options={REAL_ESTATE_TYPE_OPTIONS}
							invalid={Boolean(errors.propertyType)}
							value={value}
							onValueChange={({ value }) => {
								onChange(value)
							}}
							{...rest}
							width="320px"
						/>
					)}
					name={"propertyType"}
				/>
				<Field label={"Площадь:"} helperText={"кв. м."} errorText={errors.area?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("area")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Количество комнат:"} errorText={errors.rooms?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("rooms")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Цена:"} errorText={errors.price?.message}>
					<NumberInputRoot>
						<NumberInputField {...register("price")} />
					</NumberInputRoot>
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
