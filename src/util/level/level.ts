import type { Block, Fluid } from "@util/level/blocks";
import type { Biome } from "./biomes";

// send help

// this is a utility type for our purposes:
type OnlyFirstChar<S extends string> = S extends `${infer $TFirstChar}${string}` ? $TFirstChar : string;
// this is the type you are after:
type SingleChar<S extends string> = S extends S & OnlyFirstChar<S> ? S & OnlyFirstChar<S> : string & { length: 1 };

// https://stackoverflow.com/a/77232369
export type PatternKey = string & { length: 1 };

export type VisualLevelState = {
	blocks: {
		pattern: Record<SingleChar<string>, Block | undefined>;
		data: string[];
	};
	fluids: {
		pattern: Record<SingleChar<string>, Fluid | undefined>;
		data: string[];
	};
	biomes: {
		pattern: Record<SingleChar<string>, Biome>;
		data: string[];
	};
};

export type LevelGridSpace = {
	block?: Block | undefined;
	biome: Biome;
	fluid?: Fluid;
};

export type WorldState = {
	level: {
		data: LevelGridSpace[][];
		width: number;
		height: number;
	};
};

export function getEncodedEntry<EntryType>(key: string, pattern: { [key: PatternKey]: EntryType }) {
	return pattern[key as PatternKey];
}
