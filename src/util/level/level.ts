import type { Block, Fluid } from "@util/level/blocks";
import type { Biome } from "./biomes";

type OnlyFirstChar<S extends string> = S extends `${infer $TFirstChar}${string}` ? $TFirstChar : string;
type SingleChar<S extends string> = S extends S & OnlyFirstChar<S> ? S & OnlyFirstChar<S> : string & { length: 1 };

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

export function getEncodedEntry<EntryType>(key: string, pattern: { [key: SingleChar<string>]: EntryType }) {
	return pattern[key as SingleChar<string>];
}
