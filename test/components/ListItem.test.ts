import { v4 as uuidv4 } from 'uuid';
import { fireEvent, render, screen } from '@testing-library/svelte';
import ListItem from '@/components/ListItem.svelte';
import { describe, it, expect } from 'vitest';
import dbItems from '$lib/database.js';

describe('ListItem', () => {
	it('renders successfully with defaults', () => {
		render(ListItem);
		expect(screen.getByTestId('checkbox')).toBeInTheDocument();
		expect(screen.getByTestId('list-item-content')).toBeInTheDocument();
		expect(screen.getByTestId('edit-button')).toBeInTheDocument();
		expect(screen.getByTestId('delete-button')).toBeInTheDocument();
	});

	it('renders successfully with props', () => {
		render(ListItem, {
			props: {
				checked: true,
				edit: true,
				listItem: { id: uuidv4(), content: 'test item', checked: false }
			}
		});
		expect(screen.getByTestId('checkbox').getAttribute('checked')).toBeFalsy();
		expect(screen.getByTestId('edit-input')).toBeInTheDocument();
		expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
		expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
	});

	it('can check/uncheck by clicking on checkbox or content', async () => {
		const { component } = render(ListItem, {
			props: {
				listItem: dbItems[0]
			}
		});
		const checkbox = screen.getByTestId('checkbox');
		const itemContent = screen.getByTestId('list-item-content');
		expect(checkbox).toBeInTheDocument();
		expect((checkbox as HTMLInputElement).checked).toBe(false);
		await fireEvent.click(checkbox);

		expect((checkbox as HTMLInputElement).checked).toBe(true);
		await fireEvent.click(itemContent);

		expect(component.listItem.checked).toBe(false);
	});

	it('can edit content', async () => {
		const testContent = 'test content';
		const testListItem = {
			id: 1,
			content: testContent,
			checked: false
		};

		render(ListItem, { props: { listItem: testListItem } });

		let itemContent = screen.getByTestId('list-item-content');
		let editButton = screen.getByTestId('edit-button');

		expect(itemContent).toHaveTextContent(testContent);
		expect(editButton).toBeInTheDocument();
		await fireEvent.click(editButton);

		expect(editButton).not.toBeInTheDocument();
		const cancelButton = screen.getByTestId('cancel-button');
		expect(cancelButton).toBeInTheDocument();
		await fireEvent.click(cancelButton);

		editButton = screen.getByTestId('edit-button');
		expect(editButton).toBeInTheDocument();
		await fireEvent.click(editButton);

		const confirmButton = screen.getByTestId('confirm-button');
		const editInput = screen.getByTestId('edit-input');
		expect(confirmButton).toBeInTheDocument();
		expect(editInput).toBeInTheDocument();
		const newTestContent = 'new test content';
		await fireEvent.input(editInput, { target: { value: newTestContent } });
		await fireEvent.click(confirmButton);

		itemContent = screen.getByTestId('list-item-content');
		expect(itemContent).toHaveTextContent(newTestContent);
	});
});
