export interface ColumnDragItem {
	id: string;
	type: "COLUMN";
	text: string;
}
export interface TaskDragItem {
	id: string;
	type: "CARD";
	columnId: string;
	text: string;
}
export type DragItem = ColumnDragItem | TaskDragItem;
