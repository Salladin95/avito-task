import { Link } from "react-router-dom"
import { Box, Button, Image, Stack, Text, VStack } from "@chakra-ui/react"

import { AD } from "~/shared/types"
import { BASE_AD_MAP_LABELS } from "~/shared/constants"

export function AdPreview(props: AD) {
	return (
		<Box
			key={props.id}
			mb="4"
			p="4"
			borderWidth="1px"
			borderRadius="lg"
			boxShadow="md"
			display={"flex"}
			alignItems={"center"}
			gap={"1.5rem"}
			flexDirection={{ base: "column", md: "row" }}
		>
			<Image
				src={props.image || "https://loremflickr.com/g/320/240/paris"}
				alt={props.name}
				width={"150px"}
				borderRadius="md"
				mb="4"
			/>
			<VStack align="start">
				{Object.entries(BASE_AD_MAP_LABELS).map(([key, label]) => (
					<Stack key={key} gap={"1rem"}>
						<Text key={key}>
							<b>{label}:</b> {props[key as keyof typeof BASE_AD_MAP_LABELS]}
						</Text>
					</Stack>
				))}
			</VStack>
			<Button ml={{ base: "0", md: "auto" }} variant={"solid"}>
				<Link to={`/item/${props.id}`}>Открыть</Link>
			</Button>
		</Box>
	)
}
