import { type Block, type Fluid } from "@util/level/block";
import { type Biome } from "@util/level/biomes";

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

export type LevelMetadata = {
	width: number;
	height: number;
	sea_level: number;
};

export type WorldState = {
	level: {
		data: LevelGridSpace[][];
		metadata: LevelMetadata;
	};
};

export type GridCoordinates = {
	x: number;
	y: number;
};
export type LevelPosition = {
	column: number;
	row: number;
};

export function toCoordinates(pos: LevelPosition, levelHeight: number): GridCoordinates {
	return {
		x: pos.column,
		y: levelHeight - pos.row - 1,
	};
}
export function toLevelPosition(pos: GridCoordinates, levelHeight: number): LevelPosition {
	return {
		column: pos.x,
		row: levelHeight - pos.y - 1,
	};
}

export function setBlock(coordinates: GridCoordinates, world: WorldState, block?: Block) {
	try {
		const position = toLevelPosition(coordinates, world.level.metadata.height);
		world.level.data[position.row][position.column].block = block;
		world.level.data[position.row][position.column].fluid = undefined;
	} catch (e) {}
}

export function getEncodedEntry<EntryType>(key: string, pattern: { [key: SingleChar<string>]: EntryType }) {
	return pattern[key as SingleChar<string>];
}
