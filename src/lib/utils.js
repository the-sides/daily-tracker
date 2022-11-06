export const delay = (ms) => {
    return new Promise(res => {
        setTimeout(() => { res(true) }, ms)
    })
}

export const scrollPageToEndLeft = async (elm) => {
    // This would be better if a store and effect was used. 
    // https://svelte.dev/repl/baccba5b5e4049d6a167fa9a3c9cad7f?version=3.42.6
    await delay(100);
    elm.scrollLeft = elm.scrollWidth;
}

export const buildStatusItem = (statusItem) => {
    console.log('building', statusItem)
    return `
        <p>
            <span>${new Date(statusItem.t).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
            ${statusItem.v.replaceAll('\n', '<br/>')}
        </p>
    `
}