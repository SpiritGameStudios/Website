<script lang="ts">
	import { type VariantValue } from "@util/level/block";
	import type { LevelGridSpace, LevelMetadata } from "@util/level/level";

	const {
		gridSpace,
		size,
		x,
		y,
		metadata,
		style = "",
	}: {
		gridSpace: LevelGridSpace;
		size: number;
		x: number;
		y: number;
		metadata: LevelMetadata;
		style?: string;
	} = $props();

	const computeProperty = (value: string | VariantValue<string>) => {
		return value instanceof Function
			? value({
					x,
					y,
					biome: gridSpace.biome,
					metadata,
				})
			: value; // static textures
	};
</script>

<div class="relative">
	{@html `<!-- ${x}, ${y} -->`}

	{#if gridSpace.block}
		{@html `<!-- block/${gridSpace.block.id} -->`}
		{#each gridSpace.block.textures as layer, iteration}
			{@const layerTexture = computeProperty(layer.path)}
			{@const layerTextureMask = layer.maskPath ? computeProperty(layer.maskPath) : undefined}
			{@const layerTint = layer.tint ? computeProperty(layer.tint) : undefined}
			{@const layerCss = layer.css ? computeProperty(layer.css) : undefined}

			<!-- These blocks are not useful buttons for page navigation. <3 lynn -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="top-0 left-0 absolute"
				onclick={gridSpace.block?.action || (() => {})}
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
				onclick={gridSpace.block?.action || (() => {})}
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
