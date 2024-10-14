import List from '@/components/List.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import dbItems from '$lib/database.js';

describe('List', () => {
	it('renders succesfully', () => {
		render(List, {
			props: {
				listItems: dbItems
			}
		});
		expect(screen.getAllByTestId('list-item-content').length).toBe(2);
		expect(screen.getByTestId('add-button')).toBeInTheDocument();
	});

	it('add button renders and functions properly', async () => {
		const { component } = render(List, {
			props: {
				listItems: dbItems
			}
		});
		let addButton = screen.getByTestId('add-button');
		expect(addButton).toBeInTheDocument();
		await fireEvent.click(addButton);

		expect(addButton).not.toBeInTheDocument();
		let editInput = screen.getByTestId('edit-input');
		expect(editInput).toBeInTheDocument();
		const cancelButton = screen.getByTestId('cancel-button');
		expect(cancelButton).toBeInTheDocument();
		// await fireEvent.click(cancelButton);

		// addButton = screen.getByTestId('add-button');
		// expect(addButton).toBeInTheDocument();
		// await fireEvent.click(addButton);

		// const confirmButton = screen.getByTestId('confirm-button');
		// editInput = screen.getByTestId('edit-input');
		// expect(confirmButton).toBeInTheDocument();
		// expect(editInput).toBeInTheDocument();
		// const newTestContent = 'new test content';
		// await fireEvent.input(editInput, { target: { value: newTestContent } });
		// await fireEvent.click(confirmButton);

		// console.dir(component.listItems);
		// expect(component.listItems.at(-1).content).toBe(newTestContent);
	});
});
