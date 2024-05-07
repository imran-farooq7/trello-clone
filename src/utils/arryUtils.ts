interface Item {
	id: string;
}

export const findItemIndexById = <TItem extends Item>(
	items: TItem[],
	id: string
) => {
	console.log(id, "findItemIndexById list id");
	return items.findIndex((item: TItem) => item.id === id);
};

export const removeItemByIndex = <TItem>(array: TItem[], index: number) => {
	return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertItemAtIndex = <TItem>(
	array: TItem[],
	index: number,
	item: TItem
) => {
	return [...array.slice(0, index), item, ...array.slice(index)];
};

export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
	const item = array[from];
	return insertItemAtIndex(removeItemByIndex(array, from), to, item);
};
