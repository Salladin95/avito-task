import { useForm } from "react-hook-form"
import { Button, Container, Input, Stack } from "@chakra-ui/react"

import { Field } from "~/components/ui/field"
import { toaster, Toaster } from "~/components/ui/toaster"
import { useSession, useSupabase } from "~/shared/context"
import { PasswordInput } from "~/components/ui/password-input"
import { useNavigate } from "react-router-dom"

interface FormValues {
	email: string
	password: string
}

export function SignInPage() {
	const supabase = useSupabase()
	const session = useSession()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const navigate = useNavigate()

	const onSubmit = handleSubmit(async (formData) => {
		const { error } = await supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		})

		if (error) {
			toaster.create({
				description: error.message,
				type: "error",
				title: "Error",
			})
		}
	})

	if (session) {
		navigate("/")
	}

	return (
		<Container as={"main"} mx={"auto"}>
			<form onSubmit={onSubmit}>
				<Stack gap="4" align="flex-start" mx={"auto"} maxW="sm">
					<Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
						<Input {...register("email", { required: "Email is required" })} />
					</Field>

					<Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
						<PasswordInput {...register("password", { required: "Password is required", min: 6 })} />
					</Field>

					<Button type="submit">Submit</Button>
				</Stack>
			</form>
			<Toaster />
		</Container>
	)
}
