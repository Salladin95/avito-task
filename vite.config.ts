import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

const pathSrc = path.resolve(__dirname, "./src")

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			"~": pathSrc,
		},
	},
	preview: {
		host: true,
		port: 8080,
	},
	base: "/avito-task/",
})
