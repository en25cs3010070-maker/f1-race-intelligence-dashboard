# F1 Race Intelligence Dashboard 2010-2026

A black-and-red Formula 1 analytics site: hero with live counters, project overview, interactive dashboard (circuit map, country bars, driver leaderboard, team ranking, team/season filters), Tableau-style story tabs, insights, drivers and circuit gallery.

## Tech
Plain HTML5, CSS3 and vanilla JavaScript. No framework, no build step, no npm dependencies.
Fonts (Orbitron, Rajdhani) load from Google Fonts.

## Structure
```
index.html        page markup
css/styles.css    all styling (theme variables in :root)
js/data.js        circuits, drivers, teams, chart values
js/app.js         rendering, filters, story tabs, counters
assets/           hero.jpg, f1-logo.png
```

## Run locally
Option 1: open `index.html` in a browser.
Option 2 (local server): `npm start`, then visit http://localhost:3000
Option 3: `python3 -m http.server 3000`

## Data note
Driver, team and circuit names come from the Tableau workbook. The point totals `DP` and `TP` in `js/data.js` are sample values; replace them with real exports from the workbook's Excel source.

## Deploy on GitHub Pages
Push the folder, then Settings > Pages > Deploy from branch > `main` / root.
