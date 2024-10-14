import { writable } from 'svelte/store';
import dbItems from '$lib/database.js';
import { vi } from 'vitest';

const mockFakeDbItemsWritable = writable(dbItems);

export const mockStore = {
	subscribe: mockFakeDbItemsWritable.subscribe,
	set: vi.fn(),
	mockSetSubscribeValue: (value: any): void => mockFakeDbItemsWritable.set(value)
};
