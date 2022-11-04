<script>
	import { onMount } from 'svelte';
	
	import Button from '../components/button.svelte';
	import StatusInput from '../components/statusInput.svelte';
	
	import { Log } from '$lib/Logger';
	import { scrollPageToEndLeft } from './../lib/utils.js';

	let statuses = [];
	let statusRootElm;

	const saveStatus = (value) => {
		statuses = [...statuses, value];
		Log('Status Items', statuses);
		window.localStorage.setItem('items', JSON.stringify({ statuses }));
		scrollPageToEndLeft(statusRootElm);
	};

	const deleteLast = () => {
		statuses.pop();
		statuses = [...statuses];
		scrollPageToEndLeft(statusRootElm);
	};

	const copyScrollToStatusRoot = (evt) => {
		// https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/
		statusRootElm.style.scrollBehavior = '';
		statusRootElm.scrollLeft += evt.deltaY / 2;
		statusRootElm.style.scrollBehavior = 'smooth';
	};

	onMount(() => {
		const itemsString = window.localStorage.getItem('items');

		if (itemsString) statuses = JSON.parse(itemsString).statuses;

		document.addEventListener('wheel', copyScrollToStatusRoot);
		scrollPageToEndLeft(statusRootElm);

		return () => {
			document.removeEventListener('wheel', copyScrollToStatusRoot);
		};
	});
</script>

<main class="relative h-[calc(100vh-24px)] w-screen">
	<div class="fixed inset-0 min-h-screen z-10">
		<div
			class="relative z-10 flex flex-col items-center justify-center h-full p-8 md:p-24 text-center "
		>
			<h1 class="text-5xl lg:text-9xl opacity-75">What the fuck<br />are you doing?</h1>
			<StatusInput _class="mt-20" {saveStatus} />
			<div class="flex gap-8 mt-8">
				<Button color="red">Not working</Button>
				<Button color="green">working</Button>
				<Button callback={deleteLast}>Delete last</Button>
			</div>
		</div>
		<div class="bg bg-black bg-opacity-40 w-full-h-full absolute inset-0 z-0" />
	</div>
	<div
		bind:this={statusRootElm}
		style="scroll-behavior: smooth;"
		class="absolute inset-0 w-screen overflow-x-auto h-full p-3 flex flex-col flex-wrap hide-scrollbar"
	>
		<h2 class="sticky top-0 left-0 text-3xl">Entry for <br />{new Date().toDateString()}</h2>
		{#each statuses as status}
			<p>{status}</p>
		{/each}
	</div>
</main>
