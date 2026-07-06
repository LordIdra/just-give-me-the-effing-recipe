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

    // Nutrition data
    const nutritionData = [];
    if (recipe.calories) nutritionData.push({ label: "Calories", value: recipe.calories });
    if (recipe.carbohydrates) nutritionData.push({ label: "Carbs", value: recipe.carbohydrates + "g" });
    if (recipe.protein) nutritionData.push({ label: "Protein", value: recipe.protein + "g" });
    if (recipe.fat) nutritionData.push({ label: "Fat", value: recipe.fat + "g" });

    const nutritionHtml = nutritionData.length > 0
        ? `<div class="recipe-section">
            <h3>Nutrition</h3>
            <div class="nutrition-grid">
                ${nutritionData.map(n => `<div class="nutrition-item"><strong>${n.label}</strong>${n.value}</div>`).join("")}
            </div>
          </div>`
        : "";

    return `
        <div class="recipe-card">
            <img src="${imageUrl}" alt="${recipe.title}" class="recipe-image" loading="lazy">
            <div class="recipe-content">
                <h2 class="recipe-title">${recipe.title}</h2>
                <a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="recipe-link">View Original Recipe</a>
                
                <div class="recipe-meta">
                    <div class="meta-item">⭐ ${recipe.rating_count || "No"} ratings</div>
                    <div class="meta-item">⏱️ Prep: ${prepTime}</div>
                    <div class="meta-item">🍳 Cook: ${cookTime}</div>
                    <div class="meta-item">⏰ Total: ${totalTime}</div>
                </div>
                
                <div class="recipe-section">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.ingredients.map((ing: string) => `<li>${ing}</li>`).join("")}
                    </ul>
                </div>
                
                ${nutritionHtml}
                
                <div class="recipe-section">
                    <p><strong>Author:</strong> ${author}</p>
                </div>
            </div>
        </div>
    `;
}