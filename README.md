# Daily Tracker
Small PWA for tracking hourly updates, as I'm swapping between work and play, providing updates whenever I start something new.

Should be an interesting way to learn how to write with time more.

Persisting data:
I'm using localStorage since my use case considers all these ponts.
https://www.rdegges.com/2018/please-stop-using-local-storage/

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
