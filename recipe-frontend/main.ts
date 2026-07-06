import { AppState, Recipe, ElasticSearchResponse } from './types.js';
import { debounce, createRecipeCard, isInViewport } from './utils.js';

// Initialize app state
const state: AppState = {
    query: '',
    results: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true
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
async function searchRecipes(query: string, page: number = 0, size: number = 20): Promise<Recipe[]> {
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
                    multi_match: {
                        query: query,
                        fields: ["title", "description", "ingredients", "keywords"],
                        fuzziness: "AUTO"
                    }
                },
                from: page * size,
                size: size,
                sort: [{ _score: { order: "desc" } }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ElasticSearchResponse = await response.json();
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
        searchStatus.textContent = `${state.results.length} results found`;
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

    resultsContainer.innerHTML = state.results.map(createRecipeCard).join('');
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
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
