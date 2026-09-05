import { minmax } from "./block";
import { blocks } from "./blocks";
import {
	setBlock,
	toLevelPosition,
	type GridCoordinates,
	type LevelGridSpace,
	type LevelMetadata,
	type LevelPosition,
	type WorldState,
} from "./level";

export type MouseGameEvent = "mouse_left_click" | "mouse_middle_click" | "mouse_right_click";

export type GameEvent = MouseGameEvent;

export function onGridClick(
	event: MouseEvent,
	gridSpace: LevelGridSpace,
	coordinates: GridCoordinates,
	metadata: LevelMetadata,
	world: WorldState,
) {
	event.preventDefault();
	switch (event.buttons) {
		case 1: // Left mouse button
			onEvent(event, "mouse_left_click");
			if (gridSpace.block) gridSpace.block = undefined;
			break;
		case 2: // Right mouse button
			onEvent(event, "mouse_right_click");
			if (mayPlace(coordinates, world)) {
				setBlock(coordinates, world, blocks.stone);
			}
			break;
		case 3: // Middle mouse button
			onEvent(event, "mouse_middle_click");
			//console.log("middle mouse");
			break;
	}
}
export function onEvent(event: Event, type: GameEvent) {}

function getSpace(position: LevelPosition, world: WorldState) {
	const rowInBounds = minmax(position.row, 0, world.level.metadata.height - 1) === position.row;
	const colInBounds = minmax(position.column, 0, world.level.metadata.width - 1) === position.column;
	if (!rowInBounds || !colInBounds) {
		return null;
	}
	return world.level.data[position.row][position.column];
}

export function mayPlace(coordinates: GridCoordinates, world: WorldState) {
	const levelPosition = toLevelPosition(coordinates, world.level.metadata.height);

	const gridSpace = world.level.data[levelPosition.row][levelPosition.column];

	// If placing on the space of an existing block
	if (gridSpace.block) {
		if (gridSpace.block.metadata.mayPlaceOn) return true; // Allow replacement of certain blocks, such as grasses.
		return false;
	}

	// Above
	const above = getSpace(
		{
			row: levelPosition.row - 1,
			column: levelPosition.column,
		},
		world,
	);
	if (above && above.block) return true;
	// Below
	const below = getSpace(
		{
			row: levelPosition.row + 1,
			column: levelPosition.column,
		},
		world,
	);
	if (below && below.block) return true;
	// Left
	const left = getSpace(
		{
			row: levelPosition.row,
			column: levelPosition.column - 1,
		},
		world,
	);
	if (left && left.block) return true;
	// Right
	const right = getSpace(
		{
			row: levelPosition.row,
			column: levelPosition.column + 1,
		},
		world,
	);
	if (right && right.block) return true;

	return false;
}
