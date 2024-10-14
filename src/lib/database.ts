import { v4 as uuidv4 } from 'uuid';

const dbItems = [
	{ id: uuidv4(), content: 'item 1', checked: false },
	{ id: uuidv4(), content: 'item 2', checked: false },
	{ id: uuidv4(), content: 'item 3', checked: false },
	{ id: uuidv4(), content: 'item 4', checked: false },
	{ id: uuidv4(), content: 'item 5', checked: false }
];

export default dbItems;
