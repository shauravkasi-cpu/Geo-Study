# Geo Study — Map Quiz

A browser-based geography quiz app. You see a country name and click its location on an interactive world map — similar to Seterra.

## Features

- **Map quiz** — "Where is France?" → click the country on the map
- **Preset quizzes** — All countries, or by continent (Africa, Asia, Europe, Americas, Oceania)
- **Custom quizzes** — Paste your own list of countries to study
- **Saved quizzes** — Custom lists stored in your browser (localStorage)
- **Retry missed** — After a quiz, retry only the countries you got wrong
- **No login required** — Everything runs locally in your browser

## AP Human Map Quiz 1

A dedicated preset for **Unit 1 Map Practice** with:
- **49 countries** from your worksheet
- **21 physical features** (Himalayas, Nile River, Suez Canal, etc.)

For physical features, the map shows **no labels** — click the location and you'll be graded by how close you are to the correct spot.

## Dark / Light Theme

Use the **🌙 / ☀️** button in the top-right corner to switch themes. Your preference is saved automatically.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Install and run

```bash
cd "geo study app"
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages).

## How to Play

1. Choose a preset quiz or create a custom one
2. Read the country name in the panel
3. Click the matching country on the map
4. Get instant feedback — wrong answers highlight the correct country in green
5. View your score and retry missed countries at the end

## Custom Quizzes

In **Create Custom Quiz**, enter countries one per line or comma-separated:

```
France
Germany
Japan
USA
UK
```

Common aliases work: `USA`, `UK`, `America`, `South Korea`, etc.

Unrecognized names show suggestions so you can fix typos before starting.

## Tech Stack

- React + TypeScript + Vite
- [react-simple-maps](https://www.react-simple-maps.io/) + [world-atlas](https://github.com/topojson/world-atlas) for the map
- [@turf/boolean-point-in-polygon](https://turfjs.org/) for geographic hit detection

## Notes

- Country boundaries and names follow [Natural Earth](https://www.naturalearthdata.com/) data (via world-atlas). Some disputed territories use Natural Earth defaults.
- Progress and custom quizzes are stored in `localStorage` — clearing browser data will remove them.

## License

MIT
