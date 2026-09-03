export type Biome = {
	id: string;
	colours: {
		foliage?: string;
		grass?: string;
		water?: string;
	};
};

export const defaultBiome: Biome = {
	id: "default",
	colours: {
		grass: "#8EB971",
		foliage: "#71A74D",
		water: "#3F76E4",
	},
};

export const biomes = {
	forest: {
		id: "forest",
		colours: {
			foliage: "#59AE30",
			grass: "#79C05A",
			water: "#2B39FE",
		},
	},
	swamp: {
		id: "swamp",
		colours: {
			foliage: "#6A7039",
			grass: "#6A7039",
			water: "#617b64",
		},
	},
	floral_reef: {
		id: "floral_reef",
		colours: {
			water: "#0093c4",
		},
	},
} as const satisfies Record<string, Biome>;
