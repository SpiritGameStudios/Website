import type { Block } from "@util/level/blocks";

// https://stackoverflow.com/a/77232369
export type PatternKey = { 0: string; length: 1 } & string;

export type LevelState = {
	pattern: {
		[key: PatternKey]: Block[] | Block | null;
	};
	blocks: string[];
};

export function getBlock(key: string, pattern: { [key: PatternKey]: Block[] | Block | null }) {
	return pattern[key as PatternKey];
}
