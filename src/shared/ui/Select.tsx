import { ComponentProps } from "react"
import { createListCollection } from "@chakra-ui/react"
import {
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "~/components/ui/select.tsx"
import { SelectOption } from "~/shared/types"

type SelectAdCategoryProps = Omit<ComponentProps<typeof SelectRoot>, "collection"> & {
	options: SelectOption[]
	placeholder: string
	label: string
}

export function Select(props: SelectAdCategoryProps) {
	const { options, placeholder, label, ...rest } = props
	const collection = createListCollection({
		items: options,
	})

	return (
		<SelectRoot collection={collection} {...rest} size="lg" width="320px">
			<SelectLabel>{label}</SelectLabel>
			<SelectTrigger>
				<SelectValueText placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{collection.items.map((category) => (
					<SelectItem item={category} key={category.value}>
						{category.label}
					</SelectItem>
				))}
			</SelectContent>
		</SelectRoot>
	)
}
