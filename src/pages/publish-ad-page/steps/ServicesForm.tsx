import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Stack } from "@chakra-ui/react"

import { Select } from "~/shared/ui"
import { Field } from "~/components/ui/field"
import { SERVICE_TYPE, SERVICE_TYPE_OPTIONS } from "~/app/constants"
import { NumberInputField, NumberInputRoot } from "~/components/ui/number-input"
import { servicesSchema, type ServicesFormType } from "~/pages/publish-ad-page/schemas"

type ServicesFormProps = {
	onSubmit: (data: ServicesFormType) => void
}

const servicesDefaultValue: ServicesFormType = {
	serviceType: [SERVICE_TYPE.DELIVERY],
	experience: 0,
	cost: 0,
	schedule: "",
}

export function ServicesForm(props: ServicesFormProps) {
	const { onSubmit } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ServicesFormType>({
		resolver: zodResolver(servicesSchema),
		defaultValues: servicesDefaultValue,
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
				<Field label={"Опыт работы:"} errorText={errors.experience?.message}>
					<NumberInputRoot min={1}>
						<NumberInputField {...register("experience")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Стоимость:"} errorText={errors.cost?.message}>
					<NumberInputRoot min={1}>
						<NumberInputField {...register("cost")} />
					</NumberInputRoot>
				</Field>
				<Field label={"Расписание:"} errorText={errors.schedule?.message}>
					<Input {...register("schedule")} placeholder="Введите расписание..." />
				</Field>
			</Stack>
			<Button mt={"1rem"} mx={"auto"} type="submit">
				Вперед
			</Button>
		</form>
	)
}
