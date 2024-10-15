<script>
	import PlusIcon from './icons/PlusIcon.svelte';
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
			<PlusIcon />
		</button>
	{/if}
</div>
