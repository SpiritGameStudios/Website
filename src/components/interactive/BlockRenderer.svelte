<script lang="ts">
	import type { Block } from "@util/level/blocks";

	const {
		blockData,
		size,
		x,
		y,
		style = "",
	}: { blockData: Block; size: number; x: number; y: number; style?: string } = $props();

	const texture = $derived(
		typeof blockData.texture === "string"
			? blockData.texture // static textures
			: blockData.texture({
					x,
					y,
				}),
	);
</script>

<!-- These blocks are not buttons. <3 lynn -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={blockData.action || (() => {})}
	style="
		width: {size}px;
		height: {size}px;
		background-image: url({texture});
		background-size: {size}px;
		{style}">
</div>
