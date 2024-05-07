import { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useAppState } from "../context/AppContext";
import { useItemDrag } from "../hooks/useItemDrag";
import { moveTask, setDraggedItem } from "../state/actions";
import { CardContainer } from "../style";

interface Props {
	text: string;
	id: string;
	columnId: string;
}
const Card = ({ text, columnId, id }: Props) => {
	const { draggedItem, dispatch } = useAppState();
	const ref = useRef<HTMLDivElement>(null);
	const { drag } = useItemDrag({
		type: "CARD",
		id,
		text,
		columnId,
	});
	const [, drop] = useDrop({
		accept: "CARD",
		hover: throttle(200, () => {
			if (!draggedItem) {
				return;
			}

			if (draggedItem.type !== "CARD") {
				return;
			}
			if (draggedItem.id === id) {
				return;
			}
			dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
			dispatch(setDraggedItem({ ...draggedItem, columnId }));
		}),
	});
	drag(drop(ref));
	return <CardContainer ref={ref}>{text}</CardContainer>;
};
export default Card;
