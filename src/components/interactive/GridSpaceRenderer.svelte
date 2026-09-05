<script lang="ts">
	import { type VariantValue } from "@util/level/block";
	import type { GridCoordinates, LevelGridSpace, LevelMetadata, WorldState } from "@util/level/level";
	import { mayPlace, onGridClick } from "@util/level/events";

	const {
		gridSpace,
		size,
		coordinates,
		metadata,
		world,
		style = "",
	}: {
		gridSpace: LevelGridSpace;
		size: number;
		coordinates: GridCoordinates;
		metadata: LevelMetadata;
		world: WorldState;
		style?: string;
	} = $props();

	const computeProperty = (value: string | VariantValue<string>) => {
		return value instanceof Function
			? value({
					coordinates,
					biome: gridSpace.biome,
					metadata,
				})
			: value; // static textures
	};
</script>

<!-- These blocks are not useful buttons for page navigation. <3 lynn -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmousedown={(event) => onGridClick(event, gridSpace, coordinates, metadata, world)}
	class="relative {mayPlace(coordinates, world) || gridSpace.block
		? 'hover:outline-2 cursor-pointer'
		: ''} hover:z-2">
	{@html `<!-- ${coordinates.x}, ${coordinates.y} -->`}

	{#if gridSpace.block}
		{@html `<!-- block/${gridSpace.block.id} -->`}

		<div class="top-0 left-0 absolute" style="width: {size}px; height: {size}px;">
			{#each gridSpace.block.textures as layer, iteration}
				{@const layerTexture = computeProperty(layer.path)}
				{@const layerTextureMask = layer.maskPath ? computeProperty(layer.maskPath) : undefined}
				{@const layerTint = layer.tint ? computeProperty(layer.tint) : undefined}
				{@const layerCss = layer.css ? computeProperty(layer.css) : undefined}

				<div
					class="top-0 left-0 absolute"
					style={[
						`width: ${size}px;`,
						`height: ${size}px;`,
						`z-index: ${0 - iteration};`,
						`background-image: url(${layerTexture});`,
						`background-size: ${size}px;`,
						layerTextureMask ? `mask: url(${layerTextureMask}) alpha 0 0/${size}px ${size}px;` : null,
						layerTint ? `background-color: ${layerTint}; background-blend-mode: multiply;` : null,
						layerCss ?? null,
						style,
					].join(" ")}>
				</div>
			{/each}
		</div>
	{/if}

	{#if gridSpace.fluid}
		{@html `<!-- fluid/${gridSpace.fluid.id} -->`}

		{#each gridSpace.fluid.textures as layer, iteration}
			{@const layerTexture = computeProperty(layer.path)}
			{@const layerTextureMask = layer.maskPath ? computeProperty(layer.maskPath) : undefined}
			{@const layerTint = layer.tint ? computeProperty(layer.tint) : undefined}
			{@const layerCss = layer.css ? computeProperty(layer.css) : undefined}
			{@const zedOffset = gridSpace.block ? -1 * gridSpace.block.textures.length : 0}

			<!-- These blocks are not useful buttons for page navigation. <3 lynn -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="top-0 left-0 absolute"
				style={[
					`width: ${size}px;`,
					`height: ${size}px;`,
					`z-index: ${zedOffset - iteration};`,
					`background-image: url(${layerTexture});`,
					`background-size: ${size}px;`,
					layerTextureMask ? `mask: url(${layerTextureMask}) alpha 0 0/${size}px ${size}px;` : null,
					layerTint ? `background-color: ${layerTint}; background-blend-mode: multiply;` : null,
					layerCss ?? null,
					style,
				].join(" ")}>
			</div>
		{/each}
	{/if}
</div>
