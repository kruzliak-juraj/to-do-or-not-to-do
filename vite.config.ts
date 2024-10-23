import react from "@vitejs/plugin-react"

export const config = {
  plugins: [react()],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
}

export default config
