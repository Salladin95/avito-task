import { Badge, Box, VStack, Text, Image, Stack, Button } from "@chakra-ui/react"

import { AD } from "~/shared/types"
import { AD_TYPE, AUTO_MAP_LABELS, REAL_ESTATE_MAP_LABELS, SERVICES_MAP_LABELS } from "~/shared/constants"
import { Link } from "react-router-dom"

export function Ad(props: AD) {
	return (
		<Box key={props.id} mb={6} p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg" alignItems="center" gap={5}>
			<Image
				src={props.image || "https://loremflickr.com/g/320/240/paris"}
				alt={props.name}
				maxW={"lg"}
				borderRadius="md"
				mb="4"
				mx={"auto"}
			/>
			<VStack align="start" flex={1} gap={"1.5rem"}>
				{(() => {
					switch (props.type) {
						case AD_TYPE.REAL_ESTATE:
							return Object.entries(REAL_ESTATE_MAP_LABELS).map(([key, label]) => (
								<Stack key={key} gap={"1rem"}>
									<Text key={key}>
										<b>{label}:</b>
										<Badge>{props[key as keyof typeof REAL_ESTATE_MAP_LABELS]}</Badge>
									</Text>
								</Stack>
							))
						case AD_TYPE.AUTO:
							return Object.entries(AUTO_MAP_LABELS).map(([key, label]) => (
								<Stack key={key} gap={"1rem"}>
									<Text key={key}>
										<b>{label}:</b> <Badge>{props[key as keyof typeof AUTO_MAP_LABELS]}</Badge>
									</Text>
								</Stack>
							))
						case AD_TYPE.SERVICES:
							return Object.entries(SERVICES_MAP_LABELS).map(([key, label]) => (
								<Stack key={key} gap={"1rem"}>
									<Text key={key}>
										<b>{label}:</b> <Badge>{props[key as keyof typeof SERVICES_MAP_LABELS]}</Badge>
									</Text>
								</Stack>
							))
						default:
							return null
					}
				})()}
				<Button>
					<Link to={`/form/${props.id}`}>Редактировать</Link>
				</Button>
			</VStack>
		</Box>
	)
}
