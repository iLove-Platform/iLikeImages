<div align="center">

<img src="icons/for-readme.png" alt="iLikeImages" width="480">

# iLikeImages

**Browser-based photo editor with stylistic presets and manual adjustment**

[Website](https://ilikeimages.onrender.com/) · [Photo Editor](https://ilikeimages.onrender.com/photoeditor/)

</div>

---

## Overview

iLikeImages is a client-side photo editor that runs entirely in the browser. The user uploads an image, applies one of the available tools, extends it with checkbox presets and manual sliders, and downloads the final result. There is no backend: all processing is performed through the Canvas API.

## Features

- 7 tools: Contrast, Calm Day, Summer Style, Winter Day, Autumn Morning, Spring Good Day, Night Sky
- 6 "Calm Day" substyles: Comfort, Evening, 2021 Vibe, Winter 2024, Childhood, Night Day
- 12 checkboxes with fixed parameter sets
- 5 sliders (range 0–100): brightness, contrast, saturation, warmth/coolness, grain
- Result download in JPEG (95% quality)
- Responsive layout with no horizontal scroll on mobile
- No backend and no external processing dependencies

## Sample Combinations

| File | Combination |
|---|---|
| `images/preview1.png` | Winter Day + Winter 2024 + Winter Night |
| `images/preview2.png` | Summer Style + 2021 Vibe + Calm Day |
| `images/preview3.png` | Spring Good Day + Evening + New Year |

## Project Structure

```text
iLikeImages/
├── index.html              # Landing page
├── favicon.png             # Site icon
├── robots.txt              # Search engine crawler rules
├── sitemap.xml             # Sitemap
├── README.md
│
├── photoeditor/
│   └── index.html          # Photo editor
│
├── icons/
│   ├── logo.png            # Header logo
│   └── for-readme.png      # README logo
│
├── images/
│   ├── preview1.png
│   ├── preview2.png
│   └── preview3.png
│
├── css/
│   ├── style.css           # Base: background, font, header, footer
│   └── components.css      # Buttons, sliders, checkboxes, gallery
│
├── js/
│   ├── filters.js          # CSSgram presets, tools, checkboxes, slider formulas
│   ├── canvas.js           # Loading, rendering, grain, download
│   └── app.js              # Initialization and event handlers
│
└── assets/                 # Reserved
```

## Technologies

- HTML5, CSS3, JavaScript (no frameworks, no build step)
- Canvas API: `ctx.filter`, `canvas.toBlob`
- CSSgram 0.1.10 (jsDelivr CDN): 26 filter presets
- Google Fonts: Open Sans
- Render: hosting (`ilikeimages.onrender.com`)

## Local Setup

1. Download the project or clone the repository.
2. Open the folder in an editor (for example, Spck Editor).
3. Run it through Live Server. Opening the file directly (`file://`) is not recommended: script loading may be restricted.
4. Open `http://localhost:...` in a browser.

## Workflow

1. Open the photo editor.
2. Click "Choose Photo" and upload an image.
3. Select a tool.
4. Enable checkboxes as needed.
5. Adjust parameters with the sliders.
6. Click "Download Ready Image".

## Script Load Order

```text
js/filters.js -> js/canvas.js -> js/app.js
```

All scripts are loaded with the `defer` attribute. Breaking this order causes the error `canvasState is not defined`.

## License

The project is distributed freely. Use, modification, and redistribution are permitted.

---

<div align="center">

2026 · iLikeImages

</div>
