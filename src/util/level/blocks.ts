import { minmax, type Block, type Fluid, buildBlock } from "@util/level/block";
import { defaultBiome } from "@util/level/biomes";

export const blocks = {
	stone: buildBlock("stone").addTexture({ path: "/assets/textures/block/stone.png" }).build(),
	grass_block: buildBlock("grass_block")
		.addTexture({
			path: "/assets/textures/block/grass_block_layer.png",
			maskPath: "/assets/textures/block/grass_block_layer.mask.png",
			tint: (props) => props.biome.colours.grass ?? defaultBiome.colours.grass,
		})
		.addTexture({
			path: "/assets/textures/block/dirt.png",
		})
		.build(),
	dirt: buildBlock("dirt").addTexture({ path: "/assets/textures/block/dirt.png" }).build(),
	sand: buildBlock("sand").addTexture({ path: "/assets/textures/block/sand.png" }).build(),
	gravel: buildBlock("gravel").addTexture({ path: "/assets/textures/block/gravel.png" }).build(),
	coal_ore: buildBlock("coal_ore").addTexture({ path: "/assets/textures/block/coal_ore.png" }).build(),
	iron_ore: buildBlock("iron_ore").addTexture({ path: "/assets/textures/block/iron_ore.png" }).build(),
	granite: buildBlock("granite").addTexture({ path: "/assets/textures/block/granite.png" }).build(),
	diorite: buildBlock("diorite").addTexture({ path: "/assets/textures/block/diorite.png" }).build(),
	seagrass: buildBlock("seagrass")
		.addTexture({ path: "/assets/textures/block/seagrass.png" })
		.transparent()
		.mayPlaceOn()
		.build(),
	short_grass: buildBlock("short_grass")
		.addTexture({
			path: "/assets/textures/block/short_grass.png",
			maskPath: "/assets/textures/block/short_grass.mask.png",
			tint: (props) => props.biome.colours.grass ?? defaultBiome.colours.grass,
		})
		.transparent()
		.mayPlaceOn()
		.build(),
	sunbloomed_floropumice: buildBlock("sunbloomed_floropumice")
		.addTexture({ path: "/assets/textures/block/sunbloomed_floropumice.png" })
		.build(),
	sunbloomed_petaleaves: buildBlock("sunbloomed_petaleaves")
		.addTexture({ path: "/assets/textures/block/sunbloomed_petaleaves.png" })
		.transparent()
		.build(),
	mallowbloom_floropumice: buildBlock("mallowbloom_floropumice")
		.addTexture({ path: "/assets/textures/block/mallowbloom_floropumice.png" })
		.build(),
	mallowbloom_petaleaves: buildBlock("mallowbloom_petaleaves")
		.addTexture({ path: "/assets/textures/block/mallowbloom_petaleaves.png" })
		.transparent()
		.build(),
	lily_pad: buildBlock("lily_pad")
		.addTexture({
			path: "/assets/textures/block/lily_pad.png",
			maskPath: "/assets/textures/block/lily_pad.mask.png",
			tint: (props) => props.biome.colours.foliage ?? defaultBiome.colours.foliage,
		})
		.transparent()
		.build(),
	clay: buildBlock("clay").addTexture({ path: "/assets/textures/block/clay.png" }).build(),
	oak_log: buildBlock("oak_log").addTexture({ path: "/assets/textures/block/oak_log.png" }).build(),
	oak_leaves: buildBlock("oak_leaves")
		.addTexture({
			path: "/assets/textures/block/oak_leaves.png",
			maskPath: "/assets/textures/block/oak_leaves.mask.png",
			tint: (props) => props.biome.colours.foliage ?? defaultBiome.colours.foliage,
		})
		.transparent()
		.build(),
	hollow_oak_log: buildBlock("hollow_oak_log")
		.addTexture({ path: "/assets/textures/block/hollow_oak_log.png" })
		.transparent()
		.build(),
	firefly_bush: buildBlock("firefly_bush")
		.addTexture({ path: "/assets/textures/block/firefly_bush.png" })
		.transparent()
		.build(),
} as const satisfies Record<string, Block>;

export const fluids = {
	water: {
		id: "water",
		textures: [
			{
				path: "/assets/textures/block/water.png",
				maskPath: (props) =>
					props.coordinates.y !== props.metadata.sea_level
						? "/assets/textures/block/water.mask.png"
						: "/assets/textures/block/water_surface.mask.png",
				tint: (props) => props.biome.colours.water ?? defaultBiome.colours.water,
				css: (props) =>
					`opacity: ${props.coordinates.y !== props.metadata.sea_level ? minmax((props.coordinates.y * -16 + 272) / 2.56, 0, 100) : 100}%;`,
			},
		],
	},
} as const satisfies Record<string, Fluid>;
