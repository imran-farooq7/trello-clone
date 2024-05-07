import { DragItem } from "../types/DragItem";
export type Action =
	| {
			type: "ADD_LIST";
			payload: string;
	  }
	| {
			type: "ADD_TASK";
			payload: {
				text: string;
				listId: string;
			};
	  }
	| {
			type: "MOVE_LIST";
			payload: {
				draggedId: string;
				hoverId: string;
			};
	  }
	| {
			type: "SET_DRAG_ITEM";
			payload: DragItem | null;
	  }
	| {
			type: "MOVE_TASK";
			payload: {
				draggedItemId: string;
				hoverItemId: string | null;
				sourceColumnId: string;
				targetColumnId: string;
			};
	  };
export const addTask = (listId: string, text: string): Action => {
	return {
		type: "ADD_TASK",
		payload: {
			listId,
			text,
		},
	};
};

export const addList = (text: string): Action => {
	return {
		type: "ADD_LIST",
		payload: text,
	};
};
export const moveList = (draggedId: string, hoverId: string): Action => {
	return {
		type: "MOVE_LIST",
		payload: {
			draggedId,
			hoverId,
		},
	};
};
export const setDraggedItem = (draggedItem: DragItem | null): Action => {
	return {
		type: "SET_DRAG_ITEM",
		payload: draggedItem,
	};
};

export const moveTask = (
	draggedItemId: string,
	hoverItemId: string | null,
	sourceColumnId: string,
	targetColumnId: string
): Action => {
	return {
		type: "MOVE_TASK",
		payload: {
			draggedItemId,
			hoverItemId,
			sourceColumnId,
			targetColumnId,
		},
	};
};
