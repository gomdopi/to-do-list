<script>
	import { fakeDbItems } from '$lib/stores';
	import { onMount, tick } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import CheckIcon from './icons/CheckIcon.svelte';
	import PencilIcon from './icons/PencilIcon.svelte';
	import TrashIcon from './icons/TrashIcon.svelte';
	import XMarkIcon from './icons/XMarkIcon.svelte';

	export let add = false;
	export let checkbox = true;
	export let edit = false;
	export let listItem = { id: uuidv4(), content: '', checked: false };

	let oldContent = listItem.content;

	function setupAutoGrowInput() {
		const textarea = document.querySelector('#auto-grow');
		textarea.textContent = oldContent ?? '';

		textarea?.addEventListener('input', () => {
			const scrollHeight = textarea.scrollHeight;
			const height = Math.max(24, scrollHeight); // Minimum height is 32 pixels

			textarea.style.height = `${height}px`;
		});
	}

	onMount(() => {
		if (add == true) {
			setupAutoGrowInput();
		}
	});

	function handleCancel() {
		if (add == true) {
			add = false;
			return;
		}
		listItem.content = oldContent;
		edit = false;
	}

	function handleCheck() {
		let idx = $fakeDbItems.findIndex((item) => item.id == listItem.id);
		$fakeDbItems[idx].checked = !$fakeDbItems[idx].checked;
	}

	function handleConfirm() {
		const textarea = document.querySelector('#auto-grow');
		listItem.content = textarea.value;
		if (add == true) {
			$fakeDbItems = [...$fakeDbItems, listItem];
			add = false;
			return;
		}
		oldContent = listItem.content;
		edit = false;
	}

	function handleDelete() {
		$fakeDbItems = $fakeDbItems.filter((item) => item.id != listItem.id);
	}

	async function handleEdit() {
		edit = true;
		await tick();

		setupAutoGrowInput();
	}
</script>

<div class="group flex gap-1">
	{#if listItem}
		{#if checkbox}
			<input type="checkbox" bind:checked={listItem.checked} class="mr-2" data-testid="checkbox" />
		{/if}
		{#if !edit}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div on:click={handleCheck} class="flex flex-grow" data-testid="list-item-content">
				{listItem.content}
			</div>
		{:else}
			<!-- <input bind:value={listItem.content} class="flex flex-grow" data-testid="edit-input" /> -->
			<textarea id="auto-grow" class="w-full resize-none h-6 overflow-y-hidden"></textarea>
		{/if}
		<div class="flex place-items-center gap-1">
			{#if !edit}
				<button
					on:click={handleEdit}
					class="invisible group-hover:visible grid place-items-center bg-green-500 border-slate-900 border rounded w-5 h-5"
					data-testid="edit-button"
				>
					<PencilIcon />
				</button>
				<button
					on:click={handleDelete}
					class="invisible group-hover:visible grid place-items-center bg-red-500 border-slate-900 border rounded w-5 h-5"
					data-testid="delete-button"
				>
					<TrashIcon />
				</button>
			{:else}
				<button
					on:click={handleConfirm}
					class="grid place-items-center bg-green-500 border-slate-900 border rounded w-5 h-5"
					data-testid="confirm-button"
				>
					<CheckIcon />
				</button>
				<button
					on:click={handleCancel}
					class="grid place-items-center bg-red-500 border-slate-900 border rounded w-5 h-5"
					data-testid="cancel-button"
				>
					<XMarkIcon />
				</button>
			{/if}
		</div>
	{/if}
</div>
