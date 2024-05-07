import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	Dispatch,
} from "react";
import {
	AppState,
	List,
	Task,
	appStateReducer,
} from "../state/appStateReducer";
import { useImmerReducer } from "use-immer";
import { Action } from "../state/actions";
import { DragItem } from "../types/DragItem";

export const appData: AppState = {
	DraggedItem: null,
	lists: [
		{
			id: "0",
			text: "To do",
			tasks: [
				{
					id: "td0",
					text: "Generate App",
				},
			],
		},
		{
			id: "1",
			text: "In Progress",
			tasks: [
				{
					id: "td1",
					text: "Write CSS",
				},
			],
		},
		{
			id: "2",
			text: "Complete",
			tasks: [
				{
					id: "td2",
					text: "write unit tests",
				},
			],
		},
	],
};
interface AppStateContextProps {
	lists: List[];
	getTasksListById(id: string): Task[];
	dispatch: Dispatch<Action>;
	draggedItem: DragItem | null;
}
const AppContext = createContext<AppStateContextProps>(
	{} as AppStateContextProps
);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useImmerReducer(appStateReducer, appData);
	const { lists, DraggedItem } = state;
	const getListsByid = (id: string) => {
		return lists.find((list) => list.id === id)?.tasks || [];
	};
	return (
		<AppContext.Provider
			value={{
				lists,
				getTasksListById: getListsByid,
				dispatch,
				draggedItem: DraggedItem,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppState = () => {
	return useContext(AppContext);
};
