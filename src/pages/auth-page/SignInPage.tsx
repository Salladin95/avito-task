import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { errorToMessage } from "~/shared/lib"
import { useAuth } from "~/shared/context/auth"
import { toaster } from "~/components/ui/toaster"
import { type AuthFormType, AuthForm } from "~/pages/auth-page/AuthForm"

export function SignInPage() {
	const navigate = useNavigate()
	const authContext = useAuth()

	const handleSubmit = async (formData: AuthFormType) => {
		try {
			authContext.login(formData.email, formData.password)
			navigate("/")
		} catch (error) {
			toaster.create({
				description: errorToMessage(error),
				type: "error",
				title: "Error",
			})
		}
	}

	useEffect(() => {
		if (authContext.loggedUser) {
			navigate("/")
		}
	}, [])

	return <AuthForm onSubmit={handleSubmit} />
}
