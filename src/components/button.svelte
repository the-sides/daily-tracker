<script>
	export let callback = () => {
		window.alert('default callback');
	};
    export let color = 'grey';
    const colorMap = {
        grey: 'bg-gray-700',
        red: 'bg-red-600 hover:bg-red-800',
        green: 'bg-green-600 hover:bg-green-800'
    }
</script>

<button on:click={callback()} class={colorMap[color] + '  w-24 h-24 rounded-md p-4'}>
	<slot />
</button>
