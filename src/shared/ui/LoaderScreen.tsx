import { Container, Spinner } from "@chakra-ui/react"

export function LoaderScreen({ isPending = true }: { isPending?: boolean }) {
	if (!isPending) return null
	return (
		<Container minHeight="90vh" as="main" display="flex" justifyContent="center" alignItems="center">
			<Spinner size="lg" />
		</Container>
	)
}
