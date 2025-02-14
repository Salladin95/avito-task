import { Button, Stack } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Select } from "~/shared/ui/Select.tsx"
import { Field } from "~/components/ui/field.tsx"
import { REAL_ESTATE_TYPE, REAL_ESTATE_TYPE_OPTIONS } from "~/shared/constants/constants.ts"
import { NumberInputField, NumberInputRoot } from "~/components/ui/number-input.tsx"
import { realEstateSchema, type RealEstateFormType } from "~/pages/publish-ad-page/schemas.ts"

type RealEstateFormProps = {
	onSubmit: (data: RealEstateFormType) => void
}

const realEstateDefaultValue: RealEstateFormType = {
	propertyType: [REAL_ESTATE_TYPE.HOUSE],
	area: 0,
	rooms: 0,
	price: 0,
}

export function RealEstateForm(props: RealEstateFormProps) {
	const { onSubmit } = props
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RealEstateFormType>({
		resolver: zodResolver(realEstateSchema),
		defaultValues: realEstateDefaultValue,
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
			<Button mt={"1rem"} mx={"auto"} type="submit">
				Отправить
			</Button>
		</form>
	)
}
