import { useEffect } from "react"
import { Button, Container, HStack } from "@chakra-ui/react"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "~/shared/context/auth.tsx"

export function MainPageLayout() {
	const { loggedUser: user, logout } = useAuth()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/list", { replace: true }) // Redirect to "/list"
		}
	}, [location.pathname, navigate])

	function handleSignOut() {
		logout()
		navigate("/")
	}

	return (
		<>
			<Container display={"flex"} mx={"auto"} mb={"2rem"} py={"1rem"} as={"header"}>
				<Button variant={"ghost"}>
					<Link to={"/"}>Home</Link>
				</Button>
				{!user && (
					<HStack gap={"1.5rem"} display={"flex"} alignItems={"center"} ml={"auto"}>
						<Button variant={"ghost"}>
							<Link to={"/sign-in"}>Войти</Link>
						</Button>
						<Button variant={"ghost"}>
							<Link to={"/sign-up"}>Зарегистрироваться</Link>
						</Button>
					</HStack>
				)}
				{user && (
					<Button ml={"auto"} onClick={handleSignOut} variant={"ghost"}>
						Выйти
					</Button>
				)}
			</Container>
			<Outlet />
		</>
	)
}
