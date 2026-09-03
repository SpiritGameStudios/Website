<script lang="ts">
	import GridSpaceRenderer from "@components/interactive/GridSpaceRenderer.svelte";
	import type { LevelGridSpace } from "@util/level/level";

	const { size, gridSpace, x, y }: { size: number; gridSpace: LevelGridSpace; x: number; y: number } = $props();
</script>

{#if typeof gridSpace !== "undefined"}
	<GridSpaceRenderer {gridSpace} {x} {y} {size} />
{:else}
	<div style="width: {size}px; height: {size}px;"></div>
{/if}
