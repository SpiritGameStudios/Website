<script lang="ts">
	import { fluids, namedBlocks, type Block, type Fluid } from "@util/level/blocks";
	import { getEncodedEntry, type LevelGridSpace, type VisualLevelState, type WorldState } from "@util/level/level";
	import GridSpaceWrapper from "@components/interactive/GridSpaceWrapper.svelte";
	import { type Biome, biomes } from "@util/level/biomes";

	const { blockSize }: { blockSize: number } = $props();

	const readableLevel: VisualLevelState = {
		blocks: {
			pattern: {
				"-": undefined,
				S: namedBlocks.stone,
				G: namedBlocks.grass_block,
				D: namedBlocks.dirt,
				B: namedBlocks.sand,
				R: namedBlocks.gravel,
				C: namedBlocks.coal_ore,
				I: namedBlocks.iron_ore,
				N: namedBlocks.granite,
				T: namedBlocks.diorite,
				L: namedBlocks.clay,
				K: namedBlocks.oak_log,
				H: namedBlocks.hollow_oak_log_side,
				"&": namedBlocks.oak_leaves,
				A: namedBlocks.seagrass,
				"~": namedBlocks.water,
				O: namedBlocks.sunbloomed_floropumice,
				U: namedBlocks.sunbloomed_petaleaves,
				W: namedBlocks.mallowbloom_floropumice,
				M: namedBlocks.mallowbloom_petaleaves,
				"%": namedBlocks.seagrass,
			},
			data: [
				"--&&&----------------------------------------------------------",
				"-&&&&&-------&&&---------------------------------&&&-----------",
				"-&&&&&------&&&&&------------------------------&&&KK&------&&&-",
				"-&&K&&------&&&&&----------------------------&KK-&K&K-----&&&&&",
				"---K--------&&K&&------------------------------&KK&&------&&&&&",
				"---K--GGG--H--K---------------------------------&K--------&&K&&",
				"---GG-DDDGGGG-K----------------------------------K----------K--",
				"H-GDDGDDDDDDDGK----------------------------------K----------K--",
				"GGDDDDDDSSDDDDGG--------------------------------GGG-------HGGGG",
				"DDSSSDDSSSSSSDDDBBB---------------------------GGDDDG~~~~~GGDDDD",
				"DDSSSSSS----SSSDDSSB-%------M--------------%-DDDDSDDDLLBDDDDRSD",
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
				"----------------------~~~~~~~~~~~~~~~~~~~~~-----------~~~------",
				"-------------------------~~~~~~~~~~~~~~~~~~--------------------",
				"---------------------------~~~~~~~~~~~~~~----------------------",
				"-----------------------------~~~~~~~~--------------------------",
				"------------------------------~~~~-----------------------------",
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
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
				"FFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRSSSSSSSSSSSSSSSSS",
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

	const world: WorldState = $state({
		level: {
			data: fromReadableLevel(),
			width: readableLevel.blocks.data.length,
			height: readableLevel.blocks.data[0].length,
		},
	});
</script>

<div class="flex flex-col overflow-x-auto">
	{#each world.level.data as levelRow, iterY}
		<div class="grid" style="grid-template-columns: repeat({levelRow.length}, {blockSize}px)">
			{#each levelRow as gridSpace, iterX}
				<GridSpaceWrapper size={blockSize} x={iterX} y={world.level.data.length - iterY - 1} {gridSpace} />
			{/each}
		</div>
	{/each}
</div>
