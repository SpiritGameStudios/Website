<script lang="ts">
	import { namedBlocks, type Block } from "@util/level/blocks";
	import { getBlock, type LevelState } from "@util/level/level";
	import BlockWrapper from "@components/interactive/BlockWrapper.svelte";

	const { blockSize }: { blockSize: number } = $props();

	const level: LevelState = $state({
		pattern: {
			"-": null,
			S: namedBlocks.stone,
			G: namedBlocks.grass_block,
			D: namedBlocks.dirt,
			B: namedBlocks.sand,
			R: namedBlocks.gravel,
			C: namedBlocks.coal_ore,
			I: namedBlocks.iron_ore,
			N: namedBlocks.granite,
			T: namedBlocks.diorite,
			A: namedBlocks.seagrass,
			O: namedBlocks.sunbloomed_floropumice,
			"~": namedBlocks.water,
			"[": [namedBlocks.sunbloomed_petaleaves, namedBlocks.water],
			"]": [namedBlocks.sunbloomed_petaleaves, namedBlocks.water],
			"{": [namedBlocks.sunbloomed_petaleaves, namedBlocks.water],
			"}": [namedBlocks.sunbloomed_petaleaves, namedBlocks.water],
			W: namedBlocks.mallowbloom_floropumice,
			"<": [namedBlocks.mallowbloom_petaleaves, namedBlocks.water],
			">": [namedBlocks.mallowbloom_petaleaves, namedBlocks.water],
			"?": [namedBlocks.mallowbloom_petaleaves, namedBlocks.water],
			"0": namedBlocks.water_surface,
			"!": [namedBlocks.seagrass, namedBlocks.water],
			"@": [namedBlocks.seagrass, namedBlocks.water],
			"#": [namedBlocks.seagrass, namedBlocks.water],
			$: [namedBlocks.seagrass, namedBlocks.water],
			"^": [namedBlocks.seagrass, namedBlocks.water],
		},
		blocks: [
			"------GGG",
			"---GG-DDDGGGG",
			"--GDDGDDDDDDDG",
			"GGDDDDDDSSDDDDGG",
			"DDSSSDDSSSSSSDDDBBB~~~~~~~~~~~~~~~~~~~~~~~~~~~",
			"DDSSSSSS----SSSDDSSB~!~~~~~~<~~~~~~~~~~~~~~!~B",
			"SSSS----------SSSSSSBB@@~~~~>>~~~[~~~~~~~~~BBB",
			"SS-------------SSSSSSDDDD~~?W?~~~]]~~~~~~~#SSS",
			"S--------------SSSSSSSDDDDD~W~~~{{O~~$$~~BBSSS",
			"R--------------SSSTSSSSSSSBBB~~~}O~~~BBBDDSIIS",
			"R-------------SSSTTTTSISSSSSBB^^~OBBBBDDDSSSII",
			"RR---------CCSSSSTTTSSIIISSSSSBBBBBDDSSSSSSSSS",
			"SRRS-----SCCSSSSSSSTSSSIIISSSSSSSSSSSSSSNNSSSS",
			"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSNNNNNSSS",
		],
	});
</script>

<div class="flex flex-col">
	{#each level.blocks as levelRow, iterY}
		<div class="flex flex-row">
			{#each levelRow as block, iterX}
				<BlockWrapper
					size={blockSize}
					x={iterX}
					y={level.blocks.length - iterY - 1}
					blockData={getBlock(block, level.pattern)} />
			{/each}
		</div>
	{/each}
</div>
