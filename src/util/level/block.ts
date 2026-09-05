import { type Biome } from "@util/level/biomes";
import { type GridCoordinates, type LevelMetadata } from "@util/level/level";
import type { MouseGameEvent } from "./events";

export type TextureProps = {
	coordinates: GridCoordinates;
	biome: Biome;
	metadata: LevelMetadata;
};
export type VariantValue<T> = (props: TextureProps) => T;

export type TextureLayer = {
	/**
	 * Relative path for texture layers of the block. Should be a square image.
	 */
	path: string | VariantValue<string>;
	/**
	 * An alpha mask of the current texture. Useful to avoid tinting textures underneath.
	 */
	maskPath?: string | VariantValue<string>;
	/**
	 * A colour to tint the texture. Useful for location-specific colours, like leaves and foliage.
	 */
	tint?: string | VariantValue<string>;
	/**
	 * Custom CSS for rendering the layer.
	 */
	css?: string | VariantValue<string>;
};

export type BlockAction = (event: Event, type: MouseGameEvent, props: TextureProps) => void;

export type BlockMetadata = {
	transparent: boolean;
	mayPlaceOn: boolean;
};

export type Block = {
	readonly id: string;
	readonly textures: TextureLayer[];
	readonly metadata: BlockMetadata;
	readonly action?: BlockAction;
};

type BlockBuilder = {
	id: string;
	textures: TextureLayer[];
	metadata: BlockMetadata;
	action?: BlockAction;
	addTexture: (t: TextureLayer) => BlockBuilder;
	addAction: (a: BlockAction) => BlockBuilder;
	transparent: () => BlockBuilder;
	mayPlaceOn: () => BlockBuilder;
	build: () => Block;
};

export function buildBlock(id: string) {
	const builder: BlockBuilder = {
		id,
		textures: new Array<TextureLayer>(),
		metadata: {
			transparent: false,
			mayPlaceOn: false,
		},
		action: undefined,

		addTexture(texture: TextureLayer) {
			this.textures.push(texture);
			return this;
		},
		addAction(action: BlockAction) {
			this.action = action;
			return this;
		},
		transparent() {
			this.metadata.transparent = true;
			return this;
		},
		mayPlaceOn() {
			this.metadata.mayPlaceOn = true;
			return this;
		},
		build() {
			return {
				id: this.id,
				textures: this.textures,
				metadata: this.metadata,
				action: this.action,
			};
		},
	};

	return builder;
}

export type Fluid = {
	/**
	 * Unique identifier for the fluid.
	 */
	id: string;
	/**
	 * Definitions of texture, masks and tint layers for the block.
	 */
	textures: TextureLayer[];
};

export function minmax(test: number, min: number, max: number) {
	return Math.min(Math.max(test, min), max);
}
