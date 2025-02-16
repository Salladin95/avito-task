import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { toaster } from "~/components/ui/toaster"
import { AuthForm, type AuthFormType } from "~/pages/auth-page/AuthForm"
import { errorToMessage } from "~/shared/lib"
import { useAuth } from "~/shared/context/auth.tsx"

export function SignUpPage() {
	const navigate = useNavigate()
	const { loggedUser: user, register: createUser } = useAuth()

	const handleSubmit = async (user: AuthFormType) => {
		try {
			createUser(user)
			navigate("/")
		} catch (e) {
			toaster.create({
				description: errorToMessage(e),
				type: "error",
				title: "Error",
			})
		}
	}

	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [])

	return <AuthForm onSubmit={handleSubmit} />
}
