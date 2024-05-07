import AddNewItem from "./components/AddNewItem";
import Column from "./components/Column";
import { useAppState } from "./context/AppContext";
import { addList } from "./state/actions";
import { AppContainer } from "./style";

function App() {
	const { lists, dispatch } = useAppState();
	return (
		<AppContainer>
			{lists.map((list) => (
				<Column id={list.id} text={list.text} key={list.id} />
			))}
			<AddNewItem
				toggleBtnText="+ add another list"
				onAdd={(text) => {
					dispatch(addList(text));
				}}
			/>
		</AppContainer>
	);
}

export default App;
