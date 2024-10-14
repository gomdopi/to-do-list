import { writable } from 'svelte/store';
import dbItems from '$lib/database.js';

export const fakeDbItems = writable(dbItems);
