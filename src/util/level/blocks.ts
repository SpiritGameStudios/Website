import type { Biome } from "./biomes";

export type TextureProps = {
	x: number;
	y: number;
	biome: Biome;
};
export type VariantValue<T> = (props: TextureProps) => T;

export type Block = {
	/**
	 * Relative paths for texture layers of the block. Should be square images.
	 */
	textures: string[] | VariantValue<string>[];
	/**
	 * An alpha mask of the current texture. Useful to avoid tinting the background of transparent textures.
	 */
	textureMask?: string | VariantValue<string>;
	/**
	 * A colour to tint the texture. Useful for location-specific colours, like leaves and foliage.
	 */
	textureTint?: string | VariantValue<string>;
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
	 * Relative path for texture of the block. Should be a square image.
	 */
	texture: string | VariantValue<string>;
	/**
	 * An alpha mask of the current texture. Useful to avoid tinting the background of transparent textures.
	 */
	textureMask?: string | VariantValue<string>;
	/**
	 * A colour to tint the texture. Useful for location-specific colours, like leaves and foliage.
	 */
	textureTint?: string | VariantValue<string>;
};

export const blocks: Block[] = [
	{
		textures: ["/assets/textures/block/stone.png"],
	},
	{
		textures: ["/assets/textures/block/grass_block.png"], // #00AE54 is pretty
	},
	{
		textures: ["/assets/textures/block/dirt.png"],
	},
	{
		textures: ["/assets/textures/block/sand.png"],
	},
	{
		textures: ["/assets/textures/block/gravel.png"],
	},
	{
		textures: ["/assets/textures/block/coal_ore.png"],
	},
	{
		textures: ["/assets/textures/block/iron_ore.png"],
	},
	{
		textures: ["/assets/textures/block/granite.png"],
	},
	{
		textures: ["/assets/textures/block/diorite.png"],
	},
	{
		textures: ["/assets/textures/block/seagrass.png"],
	},
	{
		textures: ["/assets/textures/block/sunbloomed_floropumice.png"],
	},
	{
		textures: ["/assets/textures/block/sunbloomed_petaleaves.png"],
	},
	{
		textures: ["/assets/textures/block/mallowbloom_floropumice.png"],
	},
	{
		textures: ["/assets/textures/block/mallowbloom_petaleaves.png"],
	},
	{
		textures: ["/assets/textures/block/water.png"],
		textureTint: (props) => (props.x < 46 ? "#2B39FE" : "#617B64"),
		textureMask: (props) => {
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
	},
	{
		textures: ["/assets/textures/block/clay.png"],
	},
	{
		textures: ["/assets/textures/block/oak_log.png"],
	},
	{
		textures: ["/assets/textures/block/oak_leaves.png"],
		textureMask: "/assets/textures/block/oak_leaves.mask.png",
		textureTint: (props) => (props.x < 45 ? "#59AE30" : "#6A7039"),
	},
	{
		textures: ["/assets/textures/block/hollow_oak_log_side.png"],
	},
];

export const namedBlocks = {
	stone: blocks[0],
	grass_block: blocks[1],
	dirt: blocks[2],
	sand: blocks[3],
	gravel: blocks[4],
	coal_ore: blocks[5],
	iron_ore: blocks[6],
	granite: blocks[7],
	diorite: blocks[8],
	seagrass: blocks[9],
	sunbloomed_floropumice: blocks[10],
	sunbloomed_petaleaves: blocks[11],
	mallowbloom_floropumice: blocks[12],
	mallowbloom_petaleaves: blocks[13],
	water: blocks[14],
	clay: blocks[15],
	oak_log: blocks[16],
	oak_leaves: blocks[17],
	hollow_oak_log_side: blocks[18],
} as const satisfies Record<string, Block>;

export const fluids = {
	water: {
		id: "water",
		texture: "/assets/textures/block/water.png",
		textureTint: (props) => (props.x < 46 ? "#2B39FE" : "#617B64"),
		textureMask: (props) => {
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
	},
} as const satisfies Record<string, Fluid>;
