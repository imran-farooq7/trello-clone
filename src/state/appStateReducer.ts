import { nanoid } from "nanoid";
import { Action } from "./actions";
import { findItemIndexById, moveItem } from "../utils/arryUtils";
import { DragItem } from "../types/DragItem";
export interface Task {
	id: string;
	text: string;
}
export interface List {
	id: string;
	text: string;
	tasks: Task[];
}

export interface AppState {
	lists: List[];
	DraggedItem: DragItem | null;
}

export const appStateReducer = (
	draft: AppState,
	action: Action
): AppState | void => {
	switch (action.type) {
		case "ADD_LIST":
			{
				draft.lists.push({
					id: nanoid(),
					text: action.payload,
					tasks: [],
				});
			}
			break;
		case "ADD_TASK": {
			const { text, listId } = action.payload;
			const tasksListIndex = findItemIndexById(draft.lists, listId);
			draft.lists[tasksListIndex]?.tasks.push({
				id: nanoid(),
				text,
			});
			break;
		}
		case "MOVE_LIST": {
			const { draggedId, hoverId } = action.payload;
			const dragItem = findItemIndexById(draft.lists, draggedId);
			const hoverItem = findItemIndexById(draft.lists, hoverId);
			draft.lists = moveItem(draft.lists, dragItem, hoverItem);
			break;
		}
		case "SET_DRAG_ITEM": {
			draft.DraggedItem = action.payload;
			break;
		}
		case "MOVE_TASK": {
			const { draggedItemId, hoverItemId, sourceColumnId, targetColumnId } =
				action.payload;
			const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
			const targetListIndex = findItemIndexById(draft.lists, targetColumnId);
			const dragIndex = findItemIndexById(
				draft.lists[sourceListIndex].tasks,
				draggedItemId
			);
			const hoverIndex = hoverItemId
				? findItemIndexById(draft.lists[targetListIndex].tasks, hoverItemId)
				: 0;
			const items = draft.lists[sourceListIndex].tasks[dragIndex];
			draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);
			draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, items);
			break;
		}
	}
};
