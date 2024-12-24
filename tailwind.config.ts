import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				spirit: ["Spirit", "Inter", ...defaultTheme.fontFamily.mono],
			},
			colors: {
				"brand-red": "#ff0d2eff",
				"brand-orange": "#ff690fff",
				"brand-yellow": "f1bf00ff",
				"brand-green": "#00ae54ff",
				"brand-blue": "#2b39feff",
				"brand-violet": "#b300ffff",

				"brand-red-dark": "#db003eff",
				"brand-orange-dark": "#e54a00ff",
				"brand-yellow-dark": "d19100ff",
				"brand-green-dark": "#008d3aff",
				"brand-blue-dark": "#012ae0ff",
				"brand-violet-dark": "#8400ffff",

				"project-overflow-1": "#e4003fff",
				"project-overflow-2": "#ff1552ff",
				"project-bombastic-1": "#ff2e2eff",
				"project-bombastic-2": "#ff662fff",
				"project-globalize-1": "#ff9f25ff",
				"project-globalize-2": "#ffc009ff",
				"project-hollow-1": "#61b235ff",
				"project-hollow-2": "#5cc423ff",
				"project-snapper-1": "#1a59edff",
				"project-snapper-2": "#7e82f5ff",
				"project-specter-1": "#6d00e1ff",
				"project-specter-2": "#9914ffff",
				"project-armistice": "#000",

				"logo-deep-purple": "#8400ff",
				"logo-purple": "#b300ff",
				"logo-blue": "#2b39fe",

				"brand-background": "#0b0d0e",
				"brand-background-secondary": "#161b1d",
				"brand-border": "#21292c",
				"brand-text": "#ffffff",
			},
			borderColor: {
				DEFAULT: "#21292C",
			},
		},
	},
	plugins: [],
} satisfies Config;
