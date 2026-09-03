import { defaultBiome } from "./biomes";
import { minmax, type Block, type Fluid } from "./block";

export const blocks = {
	stone: {
		id: "stone",
		textures: [{ path: "/assets/textures/block/stone.png" }],
	},
	grass_block: {
		id: "grass_block",
		textures: [
			{
				path: "/assets/textures/block/grass_block_layer.png",
				maskPath: "/assets/textures/block/grass_block_layer.mask.png",
				tint: (props) => props.biome.colours.grass ?? defaultBiome.colours.grass,
			},
			{
				path: "/assets/textures/block/dirt.png",
			},
		],
	},
	dirt: {
		id: "dirt",
		textures: [{ path: "/assets/textures/block/dirt.png" }],
	},
	sand: {
		id: "sand",
		textures: [{ path: "/assets/textures/block/sand.png" }],
	},
	gravel: {
		id: "gravel",
		textures: [{ path: "/assets/textures/block/gravel.png" }],
	},
	coal_ore: {
		id: "coal_ore",
		textures: [{ path: "/assets/textures/block/coal_ore.png" }],
	},
	iron_ore: {
		id: "iron_ore",
		textures: [{ path: "/assets/textures/block/iron_ore.png" }],
	},
	granite: {
		id: "granite",
		textures: [{ path: "/assets/textures/block/granite.png" }],
	},
	diorite: {
		id: "diorite",
		textures: [{ path: "/assets/textures/block/diorite.png" }],
	},
	seagrass: {
		id: "seagrass",
		textures: [{ path: "/assets/textures/block/seagrass.png" }],
	},
	sunbloomed_floropumice: {
		id: "sunbloomed_floropumice",
		textures: [{ path: "/assets/textures/block/sunbloomed_floropumice.png" }],
	},
	sunbloomed_petaleaves: {
		id: "sunbloomed_petaleaves",
		textures: [{ path: "/assets/textures/block/sunbloomed_petaleaves.png" }],
	},
	mallowbloom_floropumice: {
		id: "mallowbloom_floropumice",
		textures: [{ path: "/assets/textures/block/mallowbloom_floropumice.png" }],
	},
	mallowbloom_petaleaves: {
		id: "mallowbloom_petaleaves",
		textures: [{ path: "/assets/textures/block/mallowbloom_petaleaves.png" }],
	},
	lily_pad: {
		id: "lily_pad",
		textures: [
			{
				path: "/assets/textures/block/lily_pad.png",
				maskPath: "/assets/textures/block/lily_pad.mask.png",
				tint: (props) => props.biome.colours.foliage ?? defaultBiome.colours.foliage,
			},
		],
	},
	clay: {
		id: "clay",
		textures: [{ path: "/assets/textures/block/clay.png" }],
	},
	oak_log: {
		id: "oak_log",
		textures: [{ path: "/assets/textures/block/oak_log.png" }],
	},
	oak_leaves: {
		id: "oak_leaves",
		textures: [
			{
				path: "/assets/textures/block/oak_leaves.png",
				maskPath: "/assets/textures/block/oak_leaves.mask.png",
				tint: (props) => props.biome.colours.foliage ?? defaultBiome.colours.foliage,
			},
		],
	},
	hollow_oak_log: {
		id: "hollow_oak_log",
		textures: [{ path: "/assets/textures/block/hollow_oak_log.png" }],
	},
	firefly_bush: {
		id: "firefly_bush",
		textures: [{ path: "/assets/textures/block/firefly_bush.png" }],
	},
} as const satisfies Record<string, Block>;

export const fluids = {
	water: {
		id: "water",
		textures: [
			{
				path: "/assets/textures/block/water.png",
				maskPath: (props) =>
					props.y !== props.metadata.sea_level
						? "/assets/textures/block/water.mask.png"
						: "/assets/textures/block/water_surface.mask.png",
				tint: (props) => props.biome.colours.water ?? defaultBiome.colours.water,
				css: (props) =>
					`opacity: ${props.y !== props.metadata.sea_level ? minmax((props.y * -16 + 272) / 2.56, 0, 100) : 100}%;`,
			},
		],
	},
} as const satisfies Record<string, Fluid>;
