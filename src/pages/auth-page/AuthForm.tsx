import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Container, Input, Stack } from "@chakra-ui/react"

import { Field } from "~/components/ui/field"
import { Toaster } from "~/components/ui/toaster"
import { PasswordInput } from "~/components/ui/password-input"

export interface AuthFormType {
	email: string
	password: string
}

export const authSchema = z.object({
	email: z.string().email("Введите валидную почту."),
	password: z.string().min(6, "Как минимум 6 символов"),
})

type AuthFormProps = {
	onSubmit: (data: AuthFormType) => void
}

export function AuthForm(props: AuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormType>({
		resolver: zodResolver(authSchema),
	})

	return (
		<Container as={"main"} mx={"auto"}>
			<form onSubmit={handleSubmit(props.onSubmit)}>
				<Stack gap="4" align="flex-start" mx={"auto"} maxW="sm">
					<Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
						<Input placeholder={"Введите почту..."} {...register("email")} />
					</Field>
					<Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
						<PasswordInput placeholder={"Введите пароль..."} {...register("password")} />
					</Field>
					<Button type="submit">Отправить</Button>
				</Stack>
			</form>
			<Toaster />
		</Container>
	)
}
