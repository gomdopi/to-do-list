<script>
	import { fakeDbItems } from '$lib/stores';
	import { v4 as uuidv4 } from 'uuid';
	import { onMount, tick } from 'svelte';

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-4"
					>
						<path
							d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
						/>
					</svg>
				</button>
				<button
					on:click={handleDelete}
					class="invisible group-hover:visible grid place-items-center bg-red-500 border-slate-900 border rounded w-5 h-5"
					data-testid="delete-button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-4"
					>
						<path
							fill-rule="evenodd"
							d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			{:else}
				<button
					on:click={handleConfirm}
					class="grid place-items-center bg-green-500 border-slate-900 border rounded w-5 h-5"
					data-testid="confirm-button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-4"
					>
						<path
							fill-rule="evenodd"
							d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				<button
					on:click={handleCancel}
					class="grid place-items-center bg-red-500 border-slate-900 border rounded w-5 h-5"
					data-testid="cancel-button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-4"
					>
						<path
							d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
						/>
					</svg>
				</button>
			{/if}
		</div>
	{/if}
</div>
