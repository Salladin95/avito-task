import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "~/components/ui/file-upload.tsx"
import { ComponentProps } from "react"

type FileUploadProps = ComponentProps<typeof FileUploadRoot>

export function FileUpload(props: FileUploadProps) {
	return (
		<FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10} {...props}>
			<FileUploadDropzone label="Перетащите сюда для загрузки" description=".png, .jpg, .jpeg, .webp до 5MB" />
			<FileUploadList />
		</FileUploadRoot>
	)
}
