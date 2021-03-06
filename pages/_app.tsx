import 'tailwindcss/tailwind.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
		<ThemeProvider attribute='class'>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default appWithTranslation(MyApp)
