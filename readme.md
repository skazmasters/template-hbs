# HTML Starter (Astro)

Static multi-page starter for layout handoff: file-based routes, a client index, and a UI kit.

Stack: Astro 7, Tailwind CSS 4, TypeScript, Biome. No Sass, Gulp, or jQuery.

## Commands

```sh
yarn install
yarn dev      # http://localhost:4321/template-hbs/
yarn build    # static files in build/
yarn preview
yarn lint
yarn lint:fix
yarn typecheck
yarn screenshots
```

The index lives at `/`. Site pages start at `/home/`. `base` is `/template-hbs` so GitHub Pages project URLs match local preview.

## Add a page

1. Create the route under `src/pages/` (folders become URL segments).
2. Register it in `src/data/pages.json` (`slug`, `href`, `title`, `order`, `screenshot`).
3. Set the site name and description in `src/data/site.json`.

Icons are SVG files in `src/assets/svg/inline/`. Pass `icon="close"` to `Btn`.

CI runs `yarn build`, then `yarn screenshots`, and deploys `build/` to `gh-pages`. Screenshots land in `build/preview/` and `public/preview/` (png files are gitignored).
