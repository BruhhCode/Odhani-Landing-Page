# Odhani — Landing Page Export

A premium landing page for the Odhani ethnic wear brand, exported in 4 formats.

## Files

- `index.html` — Standalone HTML page
- `styles.css` — All styles (vanilla CSS, no framework)
- `script.js` — Vanilla JS that hydrates content + Quick View modal
- `content.json` — All copy, products, collections, testimonials
- `tokens.json` — Design tokens (colors, fonts, shadows)
- `Odhani.jsx` — React component version (consumes `content.json`)
- `assets/` — All product & hero imagery

## Run the static version
Open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Use the React version
```jsx
import Odhani from "./Odhani.jsx";
import content from "./content.json";
import "./styles.css";

export default () => <Odhani content={content} />;
```
Copy `assets/` into your app's `public/` folder so paths like `assets/hero.jpg` resolve.

## Fonts
The HTML loads Cormorant Garamond + Inter from Google Fonts. For the React build, add the same `<link>` to your document head.
