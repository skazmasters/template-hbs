# HTML Starter (Astro)

Static multi-page starter for layout handoff: file-based routes, a client index, and a UI kit.

Stack: Astro 7, Tailwind CSS 4, TypeScript. No Sass, Gulp, or jQuery.

## Commands

```sh
yarn install
yarn dev      # http://localhost:4321/
yarn build    # static files in build/
yarn preview
yarn typecheck
yarn screenshots
```

`/` is the plate index. Site pages start at `/home/`.

Register routes in `src/data/pages.json`. CI builds, then captures screenshots into `build/preview/`.
