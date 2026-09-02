export type TextureProps = {
	x: number;
	y: number;
};
export type ConditionalTexture = (props: TextureProps) => string;

export type Block = {
	texture: string | ConditionalTexture;
	action?: (event: Event) => void;
};

export const blocks: Block[] = [
	{
		texture: "/assets/textures/block/stone.png",
	},
	{
		texture: "/assets/textures/block/grass_block.png",
	},
	{
		texture: "/assets/textures/block/dirt.png",
	},
	{
		texture: "/assets/textures/block/sand.png",
	},
	{
		texture: "/assets/textures/block/gravel.png",
	},
	{
		texture: "/assets/textures/block/coal_ore.png",
	},
	{
		texture: "/assets/textures/block/iron_ore.png",
	},
	{
		texture: "/assets/textures/block/granite.png",
	},
	{
		texture: "/assets/textures/block/diorite.png",
	},
	{
		texture: "/assets/textures/block/seagrass.png",
	},
	{
		texture: "/assets/textures/block/sunbloomed_floropumice.png",
	},
	{
		texture: "/assets/textures/block/sunbloomed_petaleaves.png",
	},
	{
		texture: "/assets/textures/block/mallowbloom_floropumice.png",
	},
	{
		texture: "/assets/textures/block/mallowbloom_petaleaves.png",
	},
	{
		texture: (props) => {
			switch (props.y) {
				case 8:
					return "/assets/textures/block/water_depth_1.png";
				case 7:
					return "/assets/textures/block/water_depth_2.png";
				case 6:
					return "/assets/textures/block/water_depth_3.png";
				case 5:
					return "/assets/textures/block/water_depth_4.png";
				case 4:
					return "/assets/textures/block/water_depth_5.png";
				case 3:
					return "/assets/textures/block/water_depth_6.png";
				default:
					return "/assets/textures/block/water_surface.png";
			}
		},
	},
];

export type BlockIdMap = { [key: string]: Block };

export const namedBlocks: BlockIdMap = {
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
};
