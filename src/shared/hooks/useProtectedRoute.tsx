import { useSupabase } from "~/shared/context"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useProtectedRoute() {
	const supabase = useSupabase()
	const navigate = useNavigate()
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) {
				navigate("/sign-in")
			}
		})
	}, [navigate, supabase])
}
