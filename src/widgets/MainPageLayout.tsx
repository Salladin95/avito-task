import { Link, Outlet } from "react-router-dom"
import { Button, Container } from "@chakra-ui/react"

export function MainPageLayout() {
	return (
		<>
			<Container mb={"2rem"} py={"1rem"} as={"header"}>
				<Button variant={"ghost"}>
					<Link to={"/"}>Home</Link>
				</Button>
			</Container>
			<Outlet />
		</>
	)
}
