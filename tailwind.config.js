module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}', 
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			height: {
				main: 'calc(100% - 5rem)',
				main_footer: 'calc(100% - 5rem - 7rem)'
			},
			minHeight: {
				main: 'calc(100% - 5rem)',
				main_footer: 'calc(100% - 5rem - 7rem)'
			},
			fontFamily: {
				'DIN': ['DIN'],
				'DIN-bold': ['DIN Bold'],
			},
			backgroundImage: {
				'bg1': "url('/images/bg1.png')",
				'bg2': "url('/images/bg2.png')",
				'bg3': "url('/images/bg3.png')"
			},
			// boxShadow: {
			// 	slide: 'inset 10rem 0 0 0 #ffffff'
			// }
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}