import App from '@/App.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

describe('App', () => {
	it('renders successfully', () => {
		render(App, { props: { name: 'Test' } });
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
