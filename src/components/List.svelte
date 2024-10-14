<script>
	import ListItem from './ListItem.svelte';

	export let listItems = [];

	let add = false;

	function handleAdd() {
		add = true;
	}
</script>

<div class="flex flex-wrap gap-2">
	{#each listItems as listItem}
		<div class="w-full grow">
			<ListItem bind:listItem />
		</div>
	{/each}
	{#if add}
		<div class="w-full grow">
			<ListItem bind:add checkbox={false} edit={true} />
		</div>
	{:else}
		<button on:click={handleAdd} data-testid="add-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="size-6"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	{/if}
</div>
