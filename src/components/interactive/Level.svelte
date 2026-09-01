<script lang="ts">
	const { size }: { size: number } = $props();

	type Block = {
		texture: string;
		action?: (event: Event) => void;
	};

	const blocks: { [key: string]: Block } = {
		stone: {
			texture: "/assets/textures/block/stone.png",
		},
		grass_block: {
			texture: "/assets/textures/block/grass_block.png",
		},
		dirt: {
			texture: "/assets/textures/block/dirt.png",
		},
		sand: {
			texture: "/assets/textures/block/sand.png",
		},
		gravel: {
			texture: "/assets/textures/block/gravel.png",
		},
		coal_ore: {
			texture: "/assets/textures/block/coal_ore.png",
		},
		iron_ore: {
			texture: "/assets/textures/block/iron_ore.png",
		},
		granite: {
			texture: "/assets/textures/block/granite.png",
		},
		diorite: {
			texture: "/assets/textures/block/diorite.png",
		},
		seagrass: {
			texture: "/assets/textures/block/seagrass.png",
		},
		sunbloomed_floropumice: {
			texture: "/assets/textures/block/sunbloomed_floropumice.png",
		},
		sunbloomed_petaleaves: {
			texture: "/assets/textures/block/sunbloomed_petaleaves.png",
		},
		mallowbloom_floropumice: {
			texture: "/assets/textures/block/mallowbloom_floropumice.png",
		},
		mallowbloom_petaleaves: {
			texture: "/assets/textures/block/mallowbloom_petaleaves.png",
		},
		water_surface: {
			texture: "/assets/textures/block/water_surface.png",
		},
		water_depth_1: {
			texture: "/assets/textures/block/water_depth_1.png",
		},
		water_depth_2: {
			texture: "/assets/textures/block/water_depth_2.png",
		},
		water_depth_3: {
			texture: "/assets/textures/block/water_depth_3.png",
		},
		water_depth_4: {
			texture: "/assets/textures/block/water_depth_4.png",
		},
		water_depth_5: {
			texture: "/assets/textures/block/water_depth_5.png",
		},
		water_depth_6: {
			texture: "/assets/textures/block/water_depth_6.png",
		},
	};

	const levelState: (Block | Block[] | null)[][] = [
		[null, null, null, null, null, null, blocks.grass_block, blocks.grass_block, blocks.grass_block],
		[
			null,
			null,
			null,
			blocks.grass_block,
			blocks.grass_block,
			null,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.grass_block,
			blocks.grass_block,
			blocks.grass_block,
			blocks.grass_block,
		],
		[
			null,
			null,
			blocks.grass_block,
			blocks.dirt,
			blocks.dirt,
			blocks.grass_block,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.grass_block,
		],
		[
			blocks.grass_block,
			blocks.grass_block,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.stone,
			blocks.stone,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.grass_block,
			blocks.grass_block,
		],
		[
			blocks.dirt,
			blocks.dirt,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.dirt,
			blocks.dirt,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.dirt,
			blocks.dirt,
			blocks.dirt,
			blocks.sand,
			blocks.sand,
			blocks.sand,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
			blocks.water_surface,
		],
		[
			blocks.dirt,
			blocks.dirt,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			null,
			null,
			null,
			null,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.dirt,
			blocks.dirt,
			blocks.stone,
			blocks.stone,
			blocks.sand,
			blocks.water_depth_1,
			[blocks.seagrass, blocks.water_depth_1],
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			blocks.water_depth_1,
			[blocks.seagrass, blocks.water_depth_1],
			blocks.water_depth_1,
			blocks.sand,
		],
		[
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.stone,
			blocks.sand,
			blocks.sand,
			[blocks.seagrass, blocks.water_depth_2],
			[blocks.seagrass, blocks.water_depth_2],
			[blocks.seagrass, blocks.water_depth_2],
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.water_depth_2,
			blocks.sand,
			blocks.sand,
			blocks.sand,
		],
	];
</script>

<div class="flex flex-col">
	{#each levelState as levelRow}
		<div class="flex flex-row">
			{#each levelRow as block}
				{#if block && !Array.isArray(block)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						onclick={block.action || (() => {})}
						style="width: {size}px; height: {size}px; background-image: url({block.texture}); background-size: {size}px">
					</div>
				{:else if Array.isArray(block)}
					<div class="relative" style="width: {size}px; height: {size}px;">
						{#each block as layer, iteration}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								onclick={layer.action || (() => {})}
								class="top-0 absolute"
								style="z-index: {0 -
									(block.length +
										iteration)}; width: {size}px; height: {size}px; background-image: url({layer.texture}); background-size: {size}px">
							</div>
						{/each}
					</div>
				{:else}
					<div style="width: {size}px; height: {size}px;"></div>
				{/if}
			{/each}
		</div>
	{/each}
</div>
