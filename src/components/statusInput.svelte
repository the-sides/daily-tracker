<script>
	import { Log } from '$lib/Logger';
	import { onMount } from 'svelte';

	export let _class;
	export let saveStatus;
	export let currentTime;

	let inputElm;
	let inputKeyMapping = new Map();

    onMount(() => {
        inputElm.focus()
    })

	const adjustHeight = () => {
        // 24px line height. Rem would be better for zooming in/out
		// Log('height', inputElm.scrollHeight);
        // Log('mapp', inputKeyMapping);
	};

    const inputKeyReleased = (e) => {
        delete inputKeyMapping[e.key];
    }
	const inputPress = (e) => {

        // only worry about logging shift for now
        if(e.key === 'Shift') {
            inputKeyMapping['Shift'] = true
        }

		if (e.key === 'Enter' && !inputKeyMapping['Shift'] ) {
			e.preventDefault(); // Stops from newline in <textarea>
			if (inputElm.value.trim() !== '') {
				saveStatus(inputElm.value);
			}
			inputElm.value = '';
		}
        adjustHeight();

	};
</script>

<form on:submit={(e) => saveStatus(e, inputElm)} class={_class + ' max-w-full w-[400px] relative'}>
	<span class="absolute left-[-3rem] h-6 inset-y-0 my-auto">{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false})}</span>
	<textarea
		bind:this={inputElm}
		type="text"
		on:keydown={inputPress}
        on:keyup={inputKeyReleased}
		draggable="false"
		rows="1"
		class="w-[calc(100%-4rem)] h-auto m-0 block"
	/>
	<button
		type="submit"
		class="absolute inset-0 ml-auto bg-green-600 hover:bg-green-800 w-16 rounded-r-md">send</button
	>
</form>
