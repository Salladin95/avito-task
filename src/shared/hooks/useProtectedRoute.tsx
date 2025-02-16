import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "~/shared/context/auth.tsx"

export function useProtectedRoute() {
	const navigate = useNavigate()
	const { loggedUser: user } = useAuth()
	useEffect(() => {
		if (!user) {
			navigate("/sign-in")
		}
	}, [navigate, user])
}
