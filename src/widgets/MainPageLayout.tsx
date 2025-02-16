import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Container, HStack } from "@chakra-ui/react"

import { useSupabase, useUserId } from "~/shared/context"

export function MainPageLayout() {
	const userId = useUserId()
	const supabase = useSupabase()
	const navigate = useNavigate()

	function handleSignOut() {
		supabase?.auth.signOut()
		navigate("/")
	}

	return (
		<>
			<Container display={"flex"} mb={"2rem"} py={"1rem"} as={"header"}>
				<Button variant={"ghost"}>
					<Link to={"/"}>Home</Link>
				</Button>
				{!userId && (
					<HStack gap={"1.5rem"} display={"flex"} alignItems={"center"} ml={"auto"}>
						<Button variant={"ghost"}>
							<Link to={"/sign-in"}>Войти</Link>
						</Button>
						<Button variant={"ghost"}>
							<Link to={"/sign-up"}>Зарегистрироваться</Link>
						</Button>
					</HStack>
				)}
				{userId && (
					<Button ml={"auto"} onClick={handleSignOut} variant={"ghost"}>
						Выйти
					</Button>
				)}
			</Container>
			<Outlet />
		</>
	)
}
