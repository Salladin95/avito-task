import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"

const pathSrc = path.resolve(__dirname, "./src")

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	resolve: {
		alias: {
			"~": pathSrc,
		},
	},
	base: "/avito-task/",
})
