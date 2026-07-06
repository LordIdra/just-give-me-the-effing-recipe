# Frontend Demo

## Search Functionality

1. **Real-time Search**: As you type, the frontend debounces input (300ms) and performs semantic search
2. **Search Status**: Shows number of results found
3. **Error Handling**: Displays user-friendly error messages

## Results Display

### Recipe Card Structure

Each recipe card contains:

```
┌─────────────────────────────────┐
│         [Recipe Image]          │
├─────────────────────────────────┤
│  Recipe Title                   │
│  View Original Recipe [link]     │
│                                 │
│  ⭐ 42 ratings  ⏱️ 15m  🍳 30m  │
│  ⏰ 45m total                    │
│                                 │
│  Ingredients:                   │
│  • 1 lb chicken                 │
│  • 2 cups water                 │
│  • Salt to taste                │
│                                 │
│  Nutrition:                     │
│  [Calories] [Protein] [Carbs]   │
│  [Fat]                          │
│                                 │
│  Author: Chef Chicken            │
└─────────────────────────────────┘
```

### Responsive Grid

- **Mobile (<768px)**: 1 column
- **Tablet (768-1200px)**: 2 columns  
- **Desktop (>1200px)**: 3 columns

## Infinite Scroll

- Loads 20 results initially
- Automatically loads more when user scrolls near bottom (500px threshold)
- Shows loading indicator during fetch
- Stops when no more results available

## Performance Features

- **Debounced Search**: 300ms delay after typing stops
- **Lazy Loading Images**: `loading="lazy"` attribute
- **Efficient Rendering**: Minimal DOM updates
- **CSS Grid**: Modern, efficient layout

## Dark Theme

- Background: `#121212` (almost black)
- Cards: `#1e1e1e` (dark gray)
- Text: `#e0e0e0` (light gray)
- Accent: `#ff6b6b` (soft red)
- Hover effects with subtle elevation

## Example Search Flow

1. User types "chicken curry"
2. After 300ms pause, search is triggered
3. Loading indicator shows
4. Results appear in grid format
5. User scrolls down, more results load automatically
6. User clicks recipe to view original source

## Mock Data Example

The current implementation uses mock data that generates recipes like:

```json
{
  "id": 1,
  "title": "chicken curry Recipe 1",
  "images": ["https://source.unsplash.com/random/400x200/?chicken%2Ccurry,food&sig=1"],
  "rating_count": "42",
  "prep_time_seconds": "900",
  "cook_time_seconds": "1800", 
  "total_time_seconds": "2700",
  "ingredients": ["1 lb chicken curry", "2 cups water", "Salt to taste"],
  "calories": "342",
  "protein": "24",
  "authors": ["Chef chicken curry"]
}
```

## Production Integration

To connect to real ElasticSearch:

1. Uncomment the real API call in `main.ts`
2. Set `ELASTICSEARCH_ENDPOINT` to your proxy URL
3. Ensure CORS headers are properly configured
4. Handle authentication if needed

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid support
- Module support