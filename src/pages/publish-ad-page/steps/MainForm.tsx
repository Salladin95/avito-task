import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Stack, Textarea } from "@chakra-ui/react"

import { Field } from "~/components/ui/field"
import { FileUpload, Select } from "~/shared/ui"
import { AD_CATEGORY, AD_CATEGORY_OPTIONS } from "~/app/constants"
import { isCorrectType, isFileTooLarge } from "~/pages/publish-ad-page/utils"
import { mainStepSchema, type MainStepFormType } from "~/pages/publish-ad-page/schemas"

type MainStepFormProps = {
	onSubmit: (data: MainStepFormType) => void
}

const mainStepDefaultValue: MainStepFormType = {
	category: [AD_CATEGORY.REAL_ESTATE],
	description: "",
	location: "",
	title: "",
}

export function MainStepForm(props: MainStepFormProps) {
	const { onSubmit } = props
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<MainStepFormType>({
		resolver: zodResolver(mainStepSchema),
		defaultValues: mainStepDefaultValue,
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
							invalid={Boolean(errors.category)}
							value={value}
							onValueChange={({ value }) => {
								onChange(value)
							}}
							{...rest}
							width="320px"
						/>
					)}
					name={"category"}
				/>
				<Field label={"Название:"} errorText={errors.title?.message}>
					<Input {...register("title")} placeholder="Введите название..." />
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
