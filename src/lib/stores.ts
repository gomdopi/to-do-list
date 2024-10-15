import dbItems from '$lib/database.js';
import { writable } from 'svelte/store';

export const fakeDbItems = writable(dbItems);
