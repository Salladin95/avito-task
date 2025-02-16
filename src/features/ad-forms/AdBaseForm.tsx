import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Stack, Textarea } from "@chakra-ui/react"

import { Field } from "~/components/ui/field"
import { FileUpload, Select } from "~/shared/ui"
import { AD_TYPE, AD_CATEGORY_OPTIONS } from "~/shared/constants/constants"
import { isCorrectType, isFileTooLarge } from "~/features/ad-forms/utils"
import { adFormBaseSchema, type AdFormBaseSchema } from "~/features/ad-forms/schemas"

type MainStepFormProps = {
	onSubmit: (data: AdFormBaseSchema) => void
	defaultValues?: AdFormBaseSchema
}

const mainStepDefaultValue: AdFormBaseSchema = {
	type: [AD_TYPE.REAL_ESTATE],
	description: "",
	location: "",
	name: "",
}

export function AdBaseForm(props: MainStepFormProps) {
	const { onSubmit, defaultValues = mainStepDefaultValue } = props
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AdFormBaseSchema>({
		resolver: zodResolver(adFormBaseSchema),
		defaultValues: defaultValues,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction={"column"} gap={"1rem"} justify={"center"}>
				<Controller
					control={control}
					render={({ field: { value, onChange, ...rest } }) => (
						<Select
							label={"Категория:"}
							placeholder={"Выберите категорию"}
							options={AD_CATEGORY_OPTIONS}
							invalid={Boolean(errors.type)}
							value={value}
							onValueChange={({ value }) => {
								onChange(value)
							}}
							{...rest}
							width="320px"
						/>
					)}
					name={"type"}
				/>
				<Field label={"Название:"} errorText={errors.name?.message}>
					<Input {...register("name")} placeholder="Введите название..." />
				</Field>
				<Field label={"Локация:"} errorText={errors.location?.message}>
					<Input {...register("location")} placeholder="Введите локацию..." />
				</Field>
				<Field label={"Описание:"} errorText={errors.description?.message}>
					<Textarea rows={6} {...register("description")} placeholder="Введите описание..." />
				</Field>
				<Controller
					control={control}
					render={({ field: { onChange, ...rest } }) => (
						<FileUpload
							{...rest}
							validate={(file, details) => {
								if (details.acceptedFiles.some((f) => f.name === file.name)) {
									return ["FILE_EXISTS"]
								} else if (isFileTooLarge(file)) {
									return ["FILE_TOO_LARGE"]
								} else if (!isCorrectType(file)) {
									return ["FILE_INVALID_TYPE"]
								}
								return null
							}}
							invalid={Boolean(errors.image)}
							onFileChange={(files) => onChange(files.acceptedFiles)}
						/>
					)}
					name={"image"}
				/>
			</Stack>
			<Button mt={"2rem"} mx={"auto"} type="submit">
				Вперед
			</Button>
		</form>
	)
}
