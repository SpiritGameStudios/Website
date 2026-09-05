<script lang="ts">
	import {
		getEncodedEntry,
		toCoordinates,
		type LevelGridSpace,
		type VisualLevelState,
		type WorldState,
	} from "@util/level/level";
	import GridSpaceRenderer from "./GridSpaceRenderer.svelte";
	import { blocks, fluids } from "@util/level/blocks";
	import { biomes, type Biome } from "@util/level/biomes";
	import { type Block, type Fluid } from "@util/level/block";
	import type { ClassValue } from "svelte/elements";

	const props: { blockSize: number; class?: ClassValue } = $props();

	const readableLevel: VisualLevelState = {
		blocks: {
			pattern: {
				"-": undefined,
				S: blocks.stone,
				G: blocks.grass_block,
				D: blocks.dirt,
				B: blocks.sand,
				R: blocks.gravel,
				C: blocks.coal_ore,
				I: blocks.iron_ore,
				N: blocks.granite,
				T: blocks.diorite,
				L: blocks.clay,
				K: blocks.oak_log,
				H: blocks.hollow_oak_log,
				"&": blocks.oak_leaves,
				A: blocks.seagrass,
				V: blocks.short_grass,
				O: blocks.sunbloomed_floropumice,
				U: blocks.sunbloomed_petaleaves,
				W: blocks.mallowbloom_floropumice,
				M: blocks.mallowbloom_petaleaves,
				"%": blocks.seagrass,
				_: blocks.lily_pad,
				$: blocks.firefly_bush,
			},
			data: [
				"--&&&----------------------------------------------------------",
				"-&&&&&-------&&&---------------------------------&&&-----------",
				"-&&&&&------&&&&&------------------------------&&&KK&------&&&-",
				"-&&K&&------&&&&&----------------------------&KK-&K&K-----&&&&&",
				"---K----V---&&K&&------------------------------&KK&&------&&&&&",
				"---K--GGG--H--K---------------------------------&K--------&&K&&",
				"--VDG-DDDGGGGVK----------------------------------K----------K--",
				"H-GDDGDDDDDDDGK----------------------------------K$---------K-V",
				"GGDDDDDDSSDDDDDG----------------------------_-$-GDG---__--HGDGG",
				"DDSSSDDSSSSSSDDDBBB---------------------------GGDDDG~~~~~GGDDDD",
				"DDSSSSSS----SSSDDSSB-%------M--------------%-DDDDSDDD~~BDDDDRSD",
				"SSSS----------SSSSSSBB%%----MM---U---------BBBSSSSSRDDLLLRRSSSS",
				"SS-------------SSSSSSDDDD--MWM---UU-------%SSSSSSSSSSRRRRRSSSRS",
				"S--------------SSSSSSSDDDDD-W---UUO--%%-BBSSSSSSSSSSSSRRSSSSRRR",
				"R--------------SSSTSSSSSSSBBB---UO---BBBDDSIISSSSSSTSTSSSSSSRRS",
				"R-------------SSSTTTTSISSSSSBB%%-OBBBBDDDSSSIISSSSSSTTTSSSSSSSR",
				"RR---------CCSSSSTTTSSIIISSSSSBBBBBDDSSSSSSSSSSSSTSSSSSCCSSSSSS",
				"SRRS-----SCCSSSSSSSTSSSIIISSSSSSSSSSSSSSNNSSSSSSSSSSSCCCSSSSSSS",
				"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSNNNNNSSSSSSSSSSSSSSSSSSSS",
			],
		},
		fluids: {
			pattern: {
				"-": undefined,
				"~": fluids.water,
			},
			data: [
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"-------------------~~~~~~~~~~~~~~~~~~~~~~~~~~~------~~~~~------",
				"--------------------~~~~~~~~~~~~~~~~~~~~~~~~~--------~~--------",
				"----------------------~~~~~~~~~~~~~~~~~~~~~--------------------",
				"-------------------------~~~-~~~~~~~~~~~~~~--------------------",
				"---------------------------~-~~~~~-~~~~~~----------------------",
				"-----------------------------~~~~-~~~--------------------------",
				"------------------------------~~~------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
				"---------------------------------------------------------------",
			],
		},
		biomes: {
			pattern: {
				F: biomes.forest,
				R: biomes.floral_reef,
				S: biomes.swamp,
			},
			data: [
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
			],
		},
	};

	function fromReadableLevel() {
		const grid: LevelGridSpace[][] = [];

		for (let y = 0; y < readableLevel.blocks.data.length; y++) {
			const row: LevelGridSpace[] = [];

			for (let x = 0; x < readableLevel.blocks.data[y].length; x++) {
				row.push({
					block: getEncodedEntry<Block | undefined>(
						readableLevel.blocks.data[y][x],
						readableLevel.blocks.pattern,
					),
					biome: getEncodedEntry<Biome>(readableLevel.biomes.data[y][x], readableLevel.biomes.pattern),
					fluid: getEncodedEntry<Fluid | undefined>(
						readableLevel.fluids.data[y][x],
						readableLevel.fluids.pattern,
					),
				});
			}

			grid.push(row);
		}

		return grid;
	}

	export const world: WorldState = $state({
		level: {
			data: fromReadableLevel(),
			metadata: {
				width: readableLevel.blocks.data[0].length,
				height: readableLevel.blocks.data.length,
				sea_level: 9,
			},
		},
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	oncontextmenu={(e) => e.preventDefault()}
	style="grid-template-rows: repeat({world.level.metadata.height}, {props.blockSize}px);"
	class="grid overflow-x-auto {props.class}">
	{#each world.level.data as levelRow, iterY}
		<div class="grid" style="grid-template-columns: repeat({world.level.metadata.width}, {props.blockSize}px)">
			{#each levelRow as gridSpace, iterX}
				{@const coordinates = toCoordinates(
					{
						column: iterX,
						row: iterY,
					},
					world.level.metadata.height,
				)}

				<GridSpaceRenderer
					{gridSpace}
					{world}
					{coordinates}
					metadata={world.level.metadata}
					size={props.blockSize} />
			{/each}
		</div>
	{/each}
</div>
