import { useParams } from "react-router-dom"

import { Ad } from "~/enteties"
import { LoaderScreen } from "~/shared/ui"
import { useGetAdById } from "~/shared/api"
import { Container } from "@chakra-ui/react"

export function AdPage() {
	const { id } = useParams()
	const ad = useGetAdById(id as string, { enabled: Boolean(id) })
	if (ad.isPending) return <LoaderScreen />
	if (!ad.data) return null
	return (
		<Container mx={"auto"} as={"main"}>
			<Ad {...ad.data} />
		</Container>
	)
}
