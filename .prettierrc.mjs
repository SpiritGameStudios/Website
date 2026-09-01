/** @type {import('prettier').Config} */
export default {
	printWidth: 120,
	bracketSameLine: true,
	useTabs: true,
	singleQuote: false,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: ["*.astro"],
			options: {
				parser: "astro",
			},
		},
	],
};
