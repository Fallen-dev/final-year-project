/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				default: {
					primary: '#c4a7e7',
					secondary: '#3e8fb0',
					accent: '#eb6f92',
					neutral: '#e0def4',
					'base-100': '#232136',
					info: '#9ccfd8',
					success: '#1FD68D',
					warning: '#f6c177',
					error: '#ea9a97',
					'--rounded-btn': '99999px',
					'--btn-text-case': 'normal'
				}
			}
		, 'light']
	}
};
