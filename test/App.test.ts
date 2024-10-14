import { render, screen } from '@testing-library/svelte';
import App from '@/App.svelte';
import { describe, it, expect } from 'vitest';

describe('App', () => {
	it('renders successfully', () => {
		render(App, { props: { name: 'Test' } });
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
