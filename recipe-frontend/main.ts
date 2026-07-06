import { AppState, Recipe, ElasticSearchResponse } from './types.js';
import { debounce, createRecipeCard, isInViewport } from './utils.js';

// Initialize app state
const state: AppState = {
    query: '',
    results: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true,
    sortField: null,
    sortOrder: null,
    totalResults: null
};

// DOM elements
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const resultsContainer = document.getElementById('results-container') as HTMLElement;
const loadingIndicator = document.getElementById('loading-indicator') as HTMLElement;
const errorMessage = document.getElementById('error-message') as HTMLElement;
const searchStatus = document.getElementById('search-status') as HTMLElement;

// API configuration
// For production: const ELASTICSEARCH_ENDPOINT = '/api/search'; // Requires proxy setup
// For development: using mock data below

// Search ElasticSearch
async function searchRecipes(query: string, page: number = 0, size: number = 18): Promise<Recipe[]> {
    if (!query.trim()) return [];

    try {
        // In a real implementation, this would be a proper ElasticSearch query
        // For now, we'll simulate it with a mock response
        console.log(`Searching for "${query}" page ${page}`);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
               
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // REAL API CALL - Make sure proxy is running
        const response = await fetch('http://142.4.218.188:3001/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: {
                    function_score: {
                        query: {
                            bool: {
                                should: [
                                    {
                                        match_phrase: {
                                            "title": {
                                                query: query,
                                                boost: 15.0,  // Exact phrase match - highest priority
                                                slop: 2       // Allow 2 words between terms
                                            }
                                        }
                                    },
                                    {
                                        match: {
                                            "title": {
                                                query: query,
                                                boost: 10.0  // Individual word matches - still important
                                            }
                                        }
                                    },
                                    {
                                        match: {
                                            "ingredients": {
                                                query: query,
                                                boost: 2.0  // Ingredients have 2x priority
                                            }
                                        }
                                    },
                                    {
                                        match: {
                                            "keywords": {
                                                query: query,
                                                boost: 3.0  // Keywords have 3x priority
                                            }
                                        }
                                    },
                                    {
                                        match: {
                                            "authors": {
                                                query: query,
                                                boost: 0.3  // Author has 0.3x priority
                                            }
                                        }
                                    },
                                    {
                                        match: {
                                            "description": {
                                                query: query,
                                                boost: 1.0  // Description has normal priority
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        functions: [
                            {
                                filter: { exists: { field: "calories" } },
                                weight: 2
                            },
                            {
                                filter: { exists: { field: "protein" } },
                                weight: 2
                            },
                            {
                                filter: { exists: { field: "carbohydrates" } },
                                weight: 2
                            },
                            {
                                filter: { exists: { field: "fat" } },
                                weight: 2
                            },
                            {
                                filter: { exists: { field: "saturated_fat" } },
                                weight: 1
                            },
                            {
                                filter: { exists: { field: "cholesterol" } },
                                weight: 1
                            },
                            {
                                filter: { exists: { field: "fiber" } },
                                weight: 1
                            },
                            {
                                filter: { exists: { field: "sodium" } },
                                weight: 1
                            },
                            {
                                filter: { exists: { field: "sugar" } },
                                weight: 1
                            }
                        ],
                        // Use a simple boost based on sort field presence and value
                        ...(state.sortField ? [{
                            filter: { exists: { field: state.sortField } },
                            weight: 20  // Strong boost for having the field
                        }] : []),
                        score_mode: "sum",
                        boost_mode: "multiply",
                        max_boost: 3
                    }
                },
                from: page * size,
                size: size,
                sort: state.sortField 
                    ? [
                        { _score: { order: "desc" } },  // Primary sort by relevance
                        { [state.sortField]: { order: state.sortOrder || "asc", missing: "_last" } }  // Secondary sort by field
                      ]
                    : [{ _score: { order: "desc" } }],
                track_total_hits: true
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Search error:', response.status, errorText);
            
            // If sorting fails, reset to default and try again
            if (state.sortField && response.status === 400) {
                console.warn('Sort field not found, resetting to relevance sort');
                state.sortField = null;
                state.sortOrder = null;
                return searchRecipes(query, page, size); // Retry without sorting
            }
            
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ElasticSearchResponse = await response.json();
        state.totalResults = data.hits.total.value;
        return data.hits.hits.map(hit => hit._source);
        
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}

// Update UI state
function updateUI() {
    // Update loading indicator
    if (state.loading) {
        loadingIndicator.classList.add('active');
    } else {
        loadingIndicator.classList.remove('active');
    }

    // Update error message
    if (state.error) {
        errorMessage.textContent = state.error;
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
    }

    // Update search status
    if (state.query) {
        if (state.totalResults !== null) {
            searchStatus.textContent = `${state.totalResults.toLocaleString()} total results (showing ${state.results.length})`;
        } else {
            searchStatus.textContent = `${state.results.length} results found`;
        }
    } else {
        searchStatus.textContent = '';
    }
}

// Render results
function renderResults() {
    if (state.query === '') {
        resultsContainer.innerHTML = '<p class="no-results">Enter a search term to find recipes</p>';
        return;
    }

    if (state.results.length === 0) {
        resultsContainer.innerHTML = state.query 
            ? '<p class="no-results">No recipes found. Try a different search.</p>'
            : '<p class="no-results">Enter a search term to find recipes</p>';
        return;
    }

    resultsContainer.innerHTML = state.results.map(recipe => createRecipeCard(recipe, state.sortField, state.sortOrder)).join('');
}

// Perform search
async function performSearch() {
    if (state.loading) return;
    
    state.loading = true;
    state.error = null;
    updateUI();

    try {
        if (state.page === 0) {
            // First page - reset results
            state.results = [];
        }

        const newResults = await searchRecipes(state.query, state.page);
        
        if (state.page === 0) {
            state.results = newResults;
        } else {
            state.results = [...state.results, ...newResults];
        }

        // Check if there are more results
        state.hasMore = newResults.length > 0;
        
        renderResults();
    } catch (error) {
        console.error('Search failed:', error);
        state.error = error instanceof Error ? error.message : 'Unknown error occurred';
        if (state.page === 0) {
            state.results = [];
            renderResults();
        }
    } finally {
        state.loading = false;
        updateUI();
    }
}

// Debounced search
const debouncedSearch = debounce(() => {
    state.page = 0;
    state.totalResults = null; // Reset total when query changes
    performSearch();
}, 300);

// Handle scroll for infinite loading
function handleScroll() {
    if (state.loading || !state.hasMore || state.query === '') return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    const threshold = 500; // 500px from bottom

    if (pageHeight - scrollPosition < threshold) {
        state.page++;
        performSearch();
    }
}

// Handle sort field dropdown change
function handleSortFieldChange() {
    const selectElement = document.getElementById('sort-field') as HTMLSelectElement;
    const field = selectElement.value;
    const directionButton = document.getElementById('sort-direction') as HTMLButtonElement;
    
    if (field === '') {
        // No sorting - use relevance
        state.sortField = null;
        state.sortOrder = null;
        directionButton.style.display = 'none';
    } else {
        // New field - default to descending
        state.sortField = field;
        state.sortOrder = 'desc';
        directionButton.style.display = 'inline-block';
        directionButton.className = 'descending';
        directionButton.textContent = '↓ Descending';
    }
    
    // Reset to first page when sorting changes
    state.page = 0;
    performSearch();
}



// Handle sort direction toggle
function handleSortDirectionToggle() {
    const button = document.getElementById('sort-direction') as HTMLButtonElement;
    
    if (state.sortOrder === 'desc') {
        state.sortOrder = 'asc';
        button.className = 'ascending';
        button.textContent = '↑ Ascending';
    } else {
        state.sortOrder = 'desc';
        button.className = 'descending';
        button.textContent = '↓ Descending';
    }
    
    // Reset to first page when sorting changes
    state.page = 0;
    performSearch();
}

// Initialize event listeners
function initEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        state.query = target.value.trim();
        debouncedSearch();
    });

    // Scroll for infinite loading
    window.addEventListener('scroll', handleScroll);

    // Initial search if there's a query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
        searchInput.value = initialQuery;
        state.query = initialQuery;
        performSearch();
    }
}

// Initialize the app
function init() {
    updateUI();
    renderResults();
    initEventListeners();
    
    // Expose sort functions globally
    (window as any).handleSortFieldChange = handleSortFieldChange;
    (window as any).handleSortDirectionToggle = handleSortDirectionToggle;
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
