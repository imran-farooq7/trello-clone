import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useAppState } from "../context/AppContext";
import { useItemDrag } from "../hooks/useItemDrag";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions";
import { ColumnContainer, ColumnTitle } from "../style";
import AddNewItem from "./AddNewItem";
import Card from "./Card";

interface Props {
	text: string;
	id: string;
}
const Column = ({ text, id }: Props) => {
	const { getTasksListById, dispatch, draggedItem } = useAppState();
	// console.log(id, "column");
	const tasks = getTasksListById(id);
	const ref = useRef<HTMLDivElement>(null);
	const { drag } = useItemDrag({ type: "COLUMN", id, text });
	const [, drop] = useDrop({
		accept: ["COLUMN", "CARD"],

		hover: throttle(200, () => {
			if (!draggedItem) {
				return;
			}
			if (draggedItem.type === "COLUMN") {
				if (draggedItem.id === id) {
					return;
				}
				dispatch(moveList(draggedItem.id, id));
			} else {
				if (draggedItem.columnId === id) {
					return;
				}
				if (tasks.length) {
					return;
				}
				dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
				dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
			}
		}),
	});
	drag(drop(ref));
	return (
		<ColumnContainer ref={ref}>
			<ColumnTitle>{text}</ColumnTitle>
			{tasks.map((task) => (
				<Card id={task.id} text={task.text} key={task.id} columnId={id} />
			))}
			<AddNewItem
				onAdd={(text) => {
					console.log(id, "on add taks id");
					dispatch(addTask(id, text));
				}}
				dark
				toggleBtnText="+ add another item"
			/>
		</ColumnContainer>
	);
};
export default Column;
