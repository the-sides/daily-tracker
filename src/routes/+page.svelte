<script>
	import Button from '../components/button.svelte';
	import StatusInput from '../components/statusInput.svelte';
	import {Log} from '$lib/Logger'
	import { onMount } from 'svelte';
	let statuses = [];


	const saveStatus = (value) => {
		statuses = [...statuses, value];
		Log('Status Items', statuses)
		window.localStorage.setItem('items', JSON.stringify({statuses}) )
	};
	
	const deleteLast = () => {
		statuses.pop();
		statuses = [...statuses];
	};

	onMount(() => {
		const itemsString = window.localStorage.getItem('items')
		
		if(itemsString)
			statuses = JSON.parse(itemsString).statuses;
	})

</script>

<main class="relative">
	<div
		class="flex flex-col items-center justify-center min-h-screen p-8 md:p-24 text-center relative z-10"
	>
		<h1 class="text-9xl opacity-75">What the fuck<br />are you doing?</h1>
		<StatusInput _class="mt-20" {saveStatus} />
		<div class="flex gap-8 mt-8">
			<Button color="red">Not working</Button>
			<Button color="green">working</Button>
			<Button callback={deleteLast}>Delete last</Button>
		</div>
	</div>
	<div class="absolute inset-0 w-full h-full flex flex-col flex-wrap">
		{#each statuses as status}
			<p>{status}</p>
		{/each}
	</div>
</main>
