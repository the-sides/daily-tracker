<script>
	import { onMount } from 'svelte';

	import Button from '../components/button.svelte';
	import StatusInput from '../components/statusInput.svelte';

	import { Log } from '$lib/Logger';
	import { scrollPageToEndLeft } from './../lib/utils.js';

	let statuses = [];
	let statusRootElm;
	let statusEntryOpen = true;

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
	const clearAllItems = () => {
		// TODO: Prompt user first
		statuses = [];
	};

	const flipStatusEntryOpen = () => {
		statusEntryOpen = !statusEntryOpen;
	}

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
	<div class="fixed inset-0 min-h-screen z-10 transition-transform duration-500 {!statusEntryOpen ? '-translate-y-full' :''}">
		<div
			class="relative z-10 flex flex-col items-center justify-center h-full p-8 md:p-24 text-center "
		>
			<h1 class="text-5xl lg:text-9xl opacity-75">What the fuck<br />are you doing?</h1>
			<StatusInput _class="mt-20" {saveStatus} />
			<div class="grid gap-x-3 gap-y-5 mt-8 grid-cols-6">
				<Button color="red" _class="col-span-3">Not working</Button>
				<Button color="green" _class="col-span-3">working</Button>
				<!-- <Button callback={deleteLast}>Delete last</Button> -->
				<Button callback={flipStatusEntryOpen} _class="sdcale-x-150 col-span-6">^</Button>
			</div>
		</div>
		<div class="bg bg-black bg-opacity-40 w-full-h-full absolute inset-0 z-0 " />
		<Button callback={flipStatusEntryOpen} _class="absolute -bottom-24 inset-x-0 mx-auto w-48">^</Button>
	</div>
	<div
		bind:this={statusRootElm}
		style="scroll-behavior: smooth;"
		class="absolute inset-0 w-screen overflow-x-auto h-full p-3 flex flex-col flex-wrap hide-scrollbar"
	>
		<h2 class="sticky top-0 left-0 text-3xl">Entry for <br />{new Date().toDateString()}</h2>
		{#each statuses as status}
			<p class="max-w-[33%]">{status}</p>
		{/each}
	</div>
	<div class="fixed bottom-12 right-12 z-10">
		<Button callback={deleteLast} _class="hover:bg-opacity-75">Delete last</Button>
		<Button callback={clearAllItems} _class="hover:bg-opacity-75">Clear all</Button>
	</div>
</main>
