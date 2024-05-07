import React, { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "../style";
import useFocus from "../utils/useFocus";

interface Props {
	onAdd(text: string): void;
}
const NewItemForm = ({ onAdd }: Props) => {
	const [text, setText] = useState("");
	const ref = useFocus();
	const handleAddText = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onAdd(text);
		}
	};
	return (
		<NewItemFormContainer>
			<NewItemInput
				value={text}
				onChange={(e) => setText(e.target.value)}
				ref={ref}
				onKeyDown={handleAddText}
			/>
			<NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
		</NewItemFormContainer>
	);
};
export default NewItemForm;
