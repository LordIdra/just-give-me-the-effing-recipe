// Format time in seconds to human-readable format
export function formatTime(seconds: string): string {
    const numSeconds = parseInt(seconds);
    if (isNaN(numSeconds) || numSeconds <= 0) return "N/A";

    const hours = Math.floor(numSeconds / 3600);
    const minutes = Math.floor((numSeconds % 3600) / 60);
    const secondsRemaining = numSeconds % 60;

    let parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secondsRemaining > 0 && parts.length === 0) parts.push(`${secondsRemaining}s`);

    return parts.join(" ") || "N/A";
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number | null = null;
    return function (...args: Parameters<T>): void {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = window.setTimeout(() => func(...args), wait);
    };
}

// Format number with commas
export function formatNumber(num: string | number): string {
    return Number(num).toLocaleString();
}

// Get first valid image URL
export function getFirstImage(images: string[]): string {
    if (!images || images.length === 0) return "https://via.placeholder.com/400x200?text=No+Image";
    return images[0];
}

// Check if element is in viewport
export function isInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Create recipe card HTML
export function createRecipeCard(recipe: any): string {
    const prepTime = formatTime(recipe.prep_time_seconds);
    const cookTime = formatTime(recipe.cook_time_seconds);
    const totalTime = formatTime(recipe.total_time_seconds);
    const imageUrl = getFirstImage(recipe.images);
    const author = recipe.authors?.length > 0 ? recipe.authors[0] : "Unknown";

    // Nutrition data - show all fields, use N/A for missing values
    const nutritionData = [
        { label: "Calories", value: recipe.calories || "N/A" },
        { label: "Carbs", value: recipe.carbohydrates ? recipe.carbohydrates + "g" : "N/A" },
        { label: "Protein", value: recipe.protein ? recipe.protein + "g" : "N/A" },
        { label: "Fat", value: recipe.fat ? recipe.fat + "g" : "N/A" },
        { label: "Saturated", value: recipe.saturated_fat ? recipe.saturated_fat + "g" : "N/A" },
        { label: "Cholesterol", value: recipe.cholesterol ? recipe.cholesterol + "mg" : "N/A" },
        { label: "Fiber", value: recipe.fiber ? recipe.fiber + "g" : "N/A" },
        { label: "Sodium", value: recipe.sodium ? recipe.sodium + "mg" : "N/A" },
        { label: "Sugar", value: recipe.sugar ? recipe.sugar + "g" : "N/A" }
    ];

    const nutritionHtml = nutritionData.length > 0
        ? `<div class="recipe-section">
            <h3>Nutrition</h3>
            <div class="nutrition-grid">
                ${nutritionData.map(n => `<div class="nutrition-item ${n.value === 'N/A' ? 'na-item' : ''}"><strong>${n.label}</strong>${n.value}</div>`).join("")}
            </div>
          </div>`
        : "";

    return `
        <a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="recipe-card-link">
            <div class="recipe-card">
                <img src="${imageUrl}" alt="${recipe.title}" class="recipe-image" loading="lazy">
                <div class="recipe-content">
                    <h2 class="recipe-title">${recipe.title}</h2>
                    <div class="recipe-author">
                        <strong>Author:</strong> ${author}
                    </div>
                    
                    <div class="recipe-meta">
                        <div class="meta-item">⏱️ Prep: ${prepTime}</div>
                        <div class="meta-item">🍳 Cook: ${cookTime}</div>
                        <div class="meta-item">⏰ Total: ${totalTime}</div>
                    </div>
                    
                    ${nutritionHtml}
                    
                    <div class="recipe-section">
                        <h3>Ingredients</h3>
                        <ul class="compact-ingredients">
                            ${recipe.ingredients.map((ing: string) => `<li>${ing}</li>`).join("")}
                        </ul>
                    </div>
                </div>
            </div>
        </a>
    `;
}