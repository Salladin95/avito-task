import { Link } from "react-router-dom"
import { LuSearch } from "react-icons/lu"
import { ChangeEvent, useMemo, useState } from "react"
import { Box, Button, Container, Heading, HStack, Input } from "@chakra-ui/react"

import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "~/components/ui/pagination.tsx"
import { InputGroup } from "~/components/ui/input-group"

import { AdPreview } from "~/enteties"
import { useGetAllAds } from "~/shared/api"
import { useDebounce } from "~/shared/hooks"
import { LoaderScreen, Select } from "~/shared/ui"
import { processAds } from "~/pages/home-page/lib"
import {
	AD_CATEGORY_OPTIONS,
	AD_TYPE,
	CAR_BRAND_OPTIONS,
	REAL_ESTATE_TYPE_OPTIONS,
	SERVICE_TYPE_OPTIONS,
} from "~/shared/constants"

export function HomePage() {
	const [page, setPage] = useState(1)
	const { data, isPending } = useGetAllAds()
	const [searchByName, setSearchByName] = useState("")
	const debouncedSearchByName = useDebounce(searchByName)

	const [adTypeFilter, setAdTypeFilter] = useState<string>("")
	const [carBrandFilter, setCarBrandFilter] = useState<string>("")
	const [serviceTypeFilter, setServiceTypeFilter] = useState<string>("")
	const [realEstateTypeFilter, setRealEstateTypeFilter] = useState<string>("")

	const processedAds = useMemo(
		() =>
			processAds({
				ads: data,
				filterByName: debouncedSearchByName,
				page,
				type: adTypeFilter,
				carBrand: carBrandFilter,
				serviceType: serviceTypeFilter,
				propertyType: realEstateTypeFilter,
			}),
		[
			data,
			debouncedSearchByName,
			page,
			adTypeFilter,
			adTypeFilter,
			carBrandFilter,
			serviceTypeFilter,
			realEstateTypeFilter,
		],
	)

	if (isPending) return <LoaderScreen />

	const { ads, totalAds, adsPerPage } = processedAds

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		setSearchByName(e.target.value)
	}

	function handleAdTypeFilterChange(value: string) {
		setAdTypeFilter(value)
		setRealEstateTypeFilter("")
		setCarBrandFilter("")
		setServiceTypeFilter("")
	}

	return (
		<Container mx={"auto"} pb={"2rem"} minHeight="90vh" as={"main"}>
			<Heading as={"h1"} mb={"2rem"} size="2xl">
				Список объявлений
			</Heading>
			<Button mb={"2rem"} ml={"auto"} variant={"solid"}>
				<Link to={"/form"}>Разместить объявление</Link>
			</Button>
			<Box mb={"2rem"} display={"flex"} gap={"1.5rem"}>
				<Select
					value={[adTypeFilter]}
					onValueChange={(e) => handleAdTypeFilterChange(e.value[0])}
					options={[{ value: "all_types", label: "Все" }, ...AD_CATEGORY_OPTIONS]}
					placeholder={"Выберите категорию"}
					label={"Фильтровать по категориям"}
				/>
				{(() => {
					switch (adTypeFilter) {
						case AD_TYPE.REAL_ESTATE:
							return (
								<Select
									value={[realEstateTypeFilter]}
									onValueChange={(e) => setRealEstateTypeFilter(e.value[0])}
									options={[
										{
											value: "all_real_estates",
											label: "Все",
										},
										...REAL_ESTATE_TYPE_OPTIONS,
									]}
									placeholder={"Выберите тип недвижимости"}
									label={"Фильтровать по типу недвижимости:"}
								/>
							)
						case AD_TYPE.AUTO:
							return (
								<Select
									value={[carBrandFilter]}
									onValueChange={(e) => setCarBrandFilter(e.value[0])}
									options={[
										{
											value: "all_autos",
											label: "Все",
										},
										...CAR_BRAND_OPTIONS,
									]}
									placeholder={"Выберите марку автомобиля"}
									label={"Фильтровать по марке автомобиля:"}
								/>
							)
						case AD_TYPE.SERVICES:
							return (
								<Select
									value={[serviceTypeFilter]}
									onValueChange={(e) => setServiceTypeFilter(e.value[0])}
									options={[
										{
											value: "all_services",
											label: "Все",
										},
										...SERVICE_TYPE_OPTIONS,
									]}
									placeholder={"Выберите тип услуг"}
									label={"Фильтровать по типу услуг:"}
								/>
							)
						default:
							return null
					}
				})()}
			</Box>
			<InputGroup w={"100%"} mb={"2rem"} startElement={<LuSearch />}>
				<Input value={searchByName} onChange={handleSearchChange} placeholder="Найти объявление по названию" />
			</InputGroup>
			<Box
				mb="2rem"
				display="grid"
				gap="1rem"
				gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "1fr", xl: "repeat(2, 1fr)" }}
			>
				{ads?.map((ad) => <AdPreview key={ad.id} {...ad} />)}
			</Box>
			<PaginationRoot
				variant={"subtle"}
				count={totalAds}
				pageSize={adsPerPage}
				page={page}
				onPageChange={(e) => setPage(e.page)}
			>
				<HStack overflowX={"auto"} justify={{ base: "start", sm: "center" }}>
					<PaginationPrevTrigger />
					<PaginationItems />
					<PaginationNextTrigger />
				</HStack>
			</PaginationRoot>
		</Container>
	)
}
