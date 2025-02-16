import { createContext, useContext } from "react"
import { Session, SupabaseClient } from "@supabase/supabase-js"

type SupabaseContextType = {
	supabase: SupabaseClient
	session: Session | null
} | null
export const SupabaseContext = createContext<SupabaseContextType>(null)

export const useSupabase = () => {
	const context = useContext(SupabaseContext)
	if (!context) {
		throw new Error("useSupabase must be used within a SupabaseProvider")
	}
	return context.supabase
}

export const useUserId = () => {
	const session = useSession()
	return session?.user.id
}

export const useSession = () => {
	const context = useContext(SupabaseContext)
	if (!context) {
		throw new Error("useSession must be used within a SupabaseProvider")
	}
	return context.session
}
