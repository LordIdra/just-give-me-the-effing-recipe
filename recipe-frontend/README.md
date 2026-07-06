# Just Give Me The Fucking Recipe - Frontend

A simple, performant frontend for recipe search with no bullshit.

## Features

- **Semantic Search**: Type in what you're craving and get relevant recipes
- **Infinite Scroll**: Loads 20 results at a time, more as you scroll
- **Responsive Design**: 1 column on mobile, 2 on tablet, 3 on desktop
- **Dark Theme**: Easy on the eyes, no eye-cancer light themes
- **Fast**: Debounced search (300ms) to avoid unnecessary API calls
- **No Dependencies**: Vanilla TypeScript, no React/Vue bullshit

## Installation

```bash
npm install
npm run build
```

## Development

```bash
npm run dev
```

This will watch for TypeScript changes and run a local server on port 8080.

## Production

```bash
npm run build
npm start
```

## File Structure

- `index.html` - Main HTML entry point
- `styles.css` - Dark theme styling with responsive grid
- `main.ts` - Main application logic
- `types.ts` - TypeScript interfaces
- `utils.ts` - Utility functions (time formatting, debounce, etc.)
- `dist/` - Compiled output

## API Integration

The frontend expects an ElasticSearch endpoint at `/api/search`. In production, you'll need to:

1. Set up a proxy server to handle CORS
2. Configure the `ELASTICSEARCH_ENDPOINT` constant in `main.ts`
3. Ensure your ElasticSearch instance is properly secured

## Recipe Data Structure

Each recipe should include:
- Title
- Image (first from array is used)
- Original link
- Rating count
- Prep time, cook time, total time (in seconds)
- Ingredients list
- Nutrition info (if available)
- Author

## Testing

Run the integration tests:

```bash
node integration_test.js
```

Or open `test_frontend.html` in a browser for functional tests.

## Deployment

Just copy the `dist/` folder to your web server. No complicated build pipelines needed.

## Philosophy

- **Simple**: No unnecessary dependencies
- **Fast**: Minimal JavaScript, efficient rendering
- **User-friendly**: Dark theme, responsive, accessible
- **No bullshit**: Just show the fucking recipes
