<script lang="ts">
	import { namedBlocks, type VariantValue } from "@util/level/blocks";
	import type { LevelGridSpace } from "@util/level/level";

	const {
		gridSpace,
		size,
		x,
		y,
		style = "",
	}: { gridSpace: LevelGridSpace; size: number; x: number; y: number; style?: string } = $props();

	const computeProperty = (value: string | VariantValue<string>) => {
		return value instanceof Function
			? value({
					x,
					y,
					biome: gridSpace.biome,
				})
			: value; // static textures
	};

	const computeProperties = (value: string[] | VariantValue<string>[]) => {
		const properties = [];

		for (const layer of value) {
			if (typeof layer === "string") {
				properties.push(layer);
			} else {
				properties.push(
					layer({
						x,
						y,
						biome: gridSpace.biome,
					}),
				);
			}
		}

		return properties;
	};
</script>

<div class="relative">
	{#if gridSpace.block}
		{@const blockTextures = computeProperties(gridSpace.block.textures)}
		{@const blockTextureTint = gridSpace.block.textureTint
			? computeProperty(gridSpace.block.textureTint)
			: undefined}
		{@const blockTextureMask = gridSpace.block.textureMask
			? computeProperty(gridSpace.block.textureMask)
			: undefined}

		{#each blockTextures as texture}
			<!-- These blocks are not useful buttons for page navigation. <3 lynn -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="top-0"
				onclick={gridSpace.block?.action || (() => {})}
				style={[
					`width: ${size}px;`,
					`height: ${size}px;`,
					`z-index: ${0 - (blockTextures.length - 1)};`,
					`background-image: url(${texture});`,
					`background-size: ${size}px;`,
					blockTextureTint ? `background-color: ${blockTextureTint}; background-blend-mode: multiply;` : null,
					blockTextureMask ? `mask: url(${blockTextureMask}) alpha 0 0/${size}px ${size}px;` : null,
					style,
				].join(" ")}>
			</div>
		{/each}
	{/if}

	{#if gridSpace.fluid}
		{@const fluidTexture = computeProperty(gridSpace.fluid.texture)}
		{@const fluidTextureTint = gridSpace.fluid.textureTint
			? computeProperty(gridSpace.fluid.textureTint)
			: undefined}
		{@const fluidTextureMask = gridSpace.fluid.textureMask
			? computeProperty(gridSpace.fluid.textureMask)
			: undefined}

		<!-- These blocks are not useful buttons for page navigation. <3 lynn -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute top-0 -z-1"
			onclick={gridSpace.block?.action || (() => {})}
			style={[
				`width: ${size}px;`,
				`height: ${size}px;`,
				`background-image: url(${fluidTexture});`,
				`background-size: ${size}px;`,
				fluidTextureTint ? `background-color: ${fluidTextureTint}; background-blend-mode: multiply;` : null,
				fluidTextureMask ? `mask: url(${fluidTextureMask}) alpha 0 0/${size}px ${size}px;` : null,
				style,
			].join(" ")}>
		</div>
	{/if}
</div>
