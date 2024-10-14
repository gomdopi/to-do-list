<script>
	import { fakeDbItems } from '$lib/stores';
	import List from './components/List.svelte';

	export let name = 'To-Do List';
</script>

<div class="bg-slate-200 rounded-md border-slate-700 border-2 min-w-80 w-3/6 max-w-xl">
	<div class="bg-slate-400 rounded-t-sm border-slate-800 border-b p-2">
		<p class="text-3xl text-center">{name}</p>
	</div>
	<div class="p-4">
		<List listItems={$fakeDbItems} />
	</div>
</div>
