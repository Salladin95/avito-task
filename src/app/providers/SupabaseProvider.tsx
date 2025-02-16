import { PropsWithChildren, useEffect, useState } from "react"
import { Session, SupabaseClient } from "@supabase/supabase-js"

import { SupabaseContext } from "~/shared/context"

export const SupabaseProvider = ({
	children,
	supabase,
}: PropsWithChildren & {
	supabase: SupabaseClient
}) => {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	return <SupabaseContext.Provider value={{ supabase, session }}>{children}</SupabaseContext.Provider>
}
