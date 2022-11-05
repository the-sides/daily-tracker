<script>
	export let callback = () => {
		window.alert('default callback');
	};
	export let color = 'grey';
    export let _class; 
	const colorMap = {
		grey: 'bg-gray-700',
		red: 'bg-red-600 hover:bg-red-800',
		green: 'bg-green-600 hover:bg-green-800'
	};
</script>

<button on:click={callback()} class={colorMap[color] + '  rounded-md p-4 block ' + _class}>
	<slot />
</button>
