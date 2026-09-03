import { type Biome, defaultBiome } from "./biomes";

export type TextureProps = {
	x: number;
	y: number;
	biome: Biome;
};
export type VariantValue<T> = (props: TextureProps) => T;

export type TextureLayer = {
	/**
	 * Relative path for texture layers of the block. Should be a square image.
	 */
	path: string | VariantValue<string>;
	/**
	 * An alpha mask of the current texture. Useful to avoid tinting textures underneath.
	 */
	maskPath?: string | VariantValue<string>;
	/**
	 * A colour to tint the texture. Useful for location-specific colours, like leaves and foliage.
	 */
	tint?: string | VariantValue<string>;
};

export type Block = {
	/**
	 * Unique identifier for the block.
	 */
	id: string;
	/**
	 * Definitions of texture, masks and tint layers for the block.
	 */
	textures: TextureLayer[];
	/**
	 * An action to occur on press of any occurrence of the block.
	 * @param event The event recieved on press.
	 * @returns A function to handle any block press.
	 */
	action?: (event: Event) => void;
};

export type Fluid = {
	/**
	 * Unique identifier for the fluid.
	 */
	id: string;
	/**
	 * Definitions of texture, masks and tint layers for the block.
	 */
	textures: TextureLayer[];
};

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
				maskPath: (props) => {
					switch (props.y) {
						case 8:
							return "/assets/textures/block/water_depth_1.mask.png";
						case 7:
							return "/assets/textures/block/water_depth_2.mask.png";
						case 6:
							return "/assets/textures/block/water_depth_3.mask.png";
						case 5:
							return "/assets/textures/block/water_depth_4.mask.png";
						case 4:
							return "/assets/textures/block/water_depth_5.mask.png";
						case 3:
							return "/assets/textures/block/water_depth_6.mask.png";
						default:
							return "/assets/textures/block/water_surface.mask.png";
					}
				},
				tint: (props) => props.biome.colours.water ?? defaultBiome.colours.water,
			},
		],
	},
} as const satisfies Record<string, Fluid>;
