<script lang="ts">
	import type { Block } from "@util/level/blocks";
	import BlockRenderer from "@components/interactive/BlockRenderer.svelte";

	const { size, blockData, x, y }: { size: number; blockData: Block[] | Block | null; x: number; y: number } =
		$props();
</script>

{#if blockData}
	{#if Array.isArray(blockData)}
		<div class="relative" style="width: {size}px; height: {size}px;">
			{#each blockData as layer, iteration}
				<BlockRenderer
					blockData={layer}
					{x}
					{y}
					{size}
					style="position: absolute; top: 0px; z-index: {0 - iteration}" />
			{/each}
		</div>
	{:else}
		<BlockRenderer {blockData} {x} {y} {size} />
	{/if}
{:else}
	<div style="width: {size}px; height: {size}px;"></div>
{/if}
