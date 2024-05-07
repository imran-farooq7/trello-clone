import { useState } from "react";
import { Button } from "../style";
import NewItemForm from "./NewItemForm";

interface Props {
	onAdd(text: string): void;
	toggleBtnText: string;
	dark?: boolean;
}
const AddNewItem = ({ onAdd, toggleBtnText, dark }: Props) => {
	const [showForm, setShowForm] = useState(false);
	if (showForm) {
		return (
			<NewItemForm
				onAdd={(text) => {
					onAdd(text);
					setShowForm(false);
				}}
			/>
		);
	}
	return (
		<Button dark={dark} onClick={() => setShowForm(true)}>
			{toggleBtnText}
		</Button>
	);
};
export default AddNewItem;
