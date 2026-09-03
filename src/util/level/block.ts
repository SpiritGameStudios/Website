import { type Biome } from "./biomes";
import type { LevelMetadata } from "./level";

export type TextureProps = {
	x: number;
	y: number;
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

export type Block = {
	/**
	 * Unique identifier for the block.
	 */
	id: string;
	/**
	 * Definitions of texture, masks and tint layers for the block.
	 */
	textures: TextureLayer[];
	/**
	 * An action to occur on press of any occurrence of the block.
	 * @param event The event recieved on press.
	 * @returns A function to handle any block press.
	 */
	action?: (event: Event) => void;
};

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
