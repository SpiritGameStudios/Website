<script lang="ts">
	import { fluids, blocks, type Block, type Fluid } from "@util/level/blocks";
	import { getEncodedEntry, type LevelGridSpace, type VisualLevelState, type WorldState } from "@util/level/level";
	import GridSpaceWrapper from "@components/interactive/GridSpaceWrapper.svelte";
	import { type Biome, biomes } from "@util/level/biomes";

	const { blockSize }: { blockSize: number } = $props();

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
				"---K--------&&K&&------------------------------&KK&&------&&&&&",
				"---K--GGG--H--K---------------------------------&K--------&&K&&",
				"---GG-DDDGGGG-K----------------------------------K----------K--",
				"H-GDDGDDDDDDDGK----------------------------------K$---------K--",
				"GGDDDDDDSSDDDDGG----------------------------_-$-GGG---__--HGGGG",
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

	const world: WorldState = $state({
		level: {
			data: fromReadableLevel(),
			width: readableLevel.blocks.data[0].length,
			height: readableLevel.blocks.data.length,
		},
	});
</script>

<div style="grid-template-rows: repeat({world.level.height}, {blockSize}px);" class="grid overflow-x-auto">
	{#each world.level.data as levelRow, iterY}
		<div class="grid" style="grid-template-columns: repeat({world.level.width}, {blockSize}px)">
			{#each levelRow as gridSpace, iterX}
				<GridSpaceWrapper size={blockSize} x={iterX} y={world.level.height - iterY - 1} {gridSpace} />
			{/each}
		</div>
	{/each}
</div>
