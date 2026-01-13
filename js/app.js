/**
 * Voedzame Shakes App
 * Een toegankelijke app voor voedzame shake recepten
 */

// State
let recipes = [];
let favorites = [];
let shoppingList = [];

// DOM Elements
const recipesView = document.getElementById('recipes-view');
const favoritesView = document.getElementById('favorites-view');
const shoppingView = document.getElementById('shopping-view');
const recipesList = document.getElementById('recipes-list');
const favoritesList = document.getElementById('favorites-list');
const shoppingListEl = document.getElementById('shopping-list');
const noFavorites = document.getElementById('no-favorites');
const noShopping = document.getElementById('no-shopping');
const clearShoppingBtn = document.getElementById('clear-shopping');
const navBtns = document.querySelectorAll('.nav-btn');
const toast = document.getElementById('toast');

// Emoji mapping for recipes
const recipeEmojis = {
    'banana-peanut': '🍌',
    'chocolate-avocado': '🍫',
    'berry-boost': '🍇',
    'mango-coconut': '🥭',
    'apple-cinnamon': '🍎',
    'vanilla-walnut': '🌰',
    'strawberry-oat': '🍓',
    'pear-almond': '🍐'
};

// Initialize app
async function init() {
    await loadRecipes();
    loadFromStorage();
    renderRecipes();
    setupEventListeners();
    registerServiceWorker();
}

// Load recipes from JSON
async function loadRecipes() {
    try {
        const response = await fetch('recipes.json');
        const data = await response.json();
        recipes = data.recipes;
    } catch (error) {
        console.error('Fout bij laden recepten:', error);
        showToast('Kon recepten niet laden');
    }
}

// Load data from localStorage
function loadFromStorage() {
    try {
        const storedFavorites = localStorage.getItem('voedzame-favorites');
        const storedShopping = localStorage.getItem('voedzame-shopping');

        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
        }
        if (storedShopping) {
            shoppingList = JSON.parse(storedShopping);
        }
    } catch (error) {
        console.error('Fout bij laden opgeslagen data:', error);
    }
}

// Save to localStorage
function saveToStorage() {
    try {
        localStorage.setItem('voedzame-favorites', JSON.stringify(favorites));
        localStorage.setItem('voedzame-shopping', JSON.stringify(shoppingList));
    } catch (error) {
        console.error('Fout bij opslaan:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Clear shopping list
    clearShoppingBtn.addEventListener('click', clearShoppingList);
}

// Switch between views
function switchView(viewName) {
    // Update nav buttons
    navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update views
    [recipesView, favoritesView, shoppingView].forEach(view => {
        view.classList.remove('active');
    });

    switch (viewName) {
        case 'recipes':
            recipesView.classList.add('active');
            break;
        case 'favorites':
            favoritesView.classList.add('active');
            renderFavorites();
            break;
        case 'shopping':
            shoppingView.classList.add('active');
            renderShoppingList();
            break;
    }
}

// Render recipes list - fully expanded
function renderRecipes() {
    recipesList.innerHTML = recipes.map(recipe => createFullRecipeCard(recipe)).join('');
    addCardEventListeners(recipesList);
}

// Render favorites list
function renderFavorites() {
    const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

    if (favoriteRecipes.length === 0) {
        favoritesList.innerHTML = '';
        noFavorites.style.display = 'block';
    } else {
        noFavorites.style.display = 'none';
        favoritesList.innerHTML = favoriteRecipes.map(recipe => createFullRecipeCard(recipe)).join('');
        addCardEventListeners(favoritesList);
    }
}

// Create fully expanded recipe card HTML
function createFullRecipeCard(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    const emoji = recipeEmojis[recipe.image] || '🥤';

    return `
        <article class="recipe-card" data-id="${recipe.id}" data-type="${recipe.image}">
            <div class="recipe-header-section">
                <span class="recipe-emoji">${emoji}</span>
                <div class="recipe-title-block">
                    <h3 class="recipe-name">${recipe.name}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                </div>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}"
                        data-id="${recipe.id}"
                        aria-label="${isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>

            <div class="recipe-stats">
                <span class="stat">
                    <span class="stat-icon">🔥</span>
                    <span class="stat-value">${recipe.calories} kcal</span>
                </span>
                <span class="stat">
                    <span class="stat-icon">💪</span>
                    <span class="stat-value">${recipe.protein}g eiwit</span>
                </span>
                <span class="stat">
                    <span class="stat-icon">⏱️</span>
                    <span class="stat-value">${recipe.prepTime} min</span>
                </span>
            </div>

            <div class="recipe-ingredients">
                <h4 class="recipe-section-title">🛒 Ingrediënten</h4>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ing => `
                        <li class="ingredient-item">
                            <span class="ingredient-name">${ing.item}</span>
                            <span class="ingredient-amount">${ing.amount}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="recipe-instructions">
                <h4 class="recipe-section-title">👨‍🍳 Bereiding</h4>
                <p class="instructions-text">${recipe.instructions}</p>
            </div>

            <button class="btn btn-primary add-shopping-btn" data-id="${recipe.id}">
                🛒 Voeg ingrediënten toe aan boodschappenlijst
            </button>
        </article>
    `;
}

// Add event listeners to recipe cards
function addCardEventListeners(container) {
    // Favorite button click
    container.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const recipeId = parseInt(btn.dataset.id);
            toggleFavorite(recipeId);
        });
    });

    // Add to shopping list button
    container.querySelectorAll('.add-shopping-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const recipeId = parseInt(btn.dataset.id);
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                addToShoppingList(recipe);
            }
        });
    });
}

// Toggle favorite
function toggleFavorite(recipeId) {
    const index = favorites.indexOf(recipeId);
    const recipe = recipes.find(r => r.id === recipeId);

    if (index === -1) {
        favorites.push(recipeId);
        showToast(`${recipe.name} toegevoegd aan favorieten`);
    } else {
        favorites.splice(index, 1);
        showToast(`${recipe.name} verwijderd uit favorieten`);
    }

    saveToStorage();
    renderRecipes();

    // Also update favorites view if visible
    if (favoritesView.classList.contains('active')) {
        renderFavorites();
    }
}

// Add recipe ingredients to shopping list
function addToShoppingList(recipe) {
    let addedCount = 0;

    recipe.ingredients.forEach(ingredient => {
        // Check if item already exists
        const existingIndex = shoppingList.findIndex(
            item => item.name.toLowerCase() === ingredient.item.toLowerCase()
        );

        if (existingIndex === -1) {
            shoppingList.push({
                id: Date.now() + Math.random(),
                name: ingredient.item,
                amount: ingredient.amount,
                checked: false,
                recipeId: recipe.id
            });
            addedCount++;
        }
    });

    saveToStorage();

    if (addedCount > 0) {
        showToast(`${addedCount} ingrediënten toegevoegd aan boodschappenlijst`);
    } else {
        showToast('Alle ingrediënten staan al op je lijst');
    }
}

// Render shopping list
function renderShoppingList() {
    if (shoppingList.length === 0) {
        shoppingListEl.innerHTML = '';
        noShopping.style.display = 'block';
        clearShoppingBtn.style.display = 'none';
    } else {
        noShopping.style.display = 'none';
        clearShoppingBtn.style.display = 'block';

        // Sort: unchecked first
        const sortedList = [...shoppingList].sort((a, b) => a.checked - b.checked);

        shoppingListEl.innerHTML = sortedList.map(item => `
            <div class="shopping-item ${item.checked ? 'checked' : ''}" data-id="${item.id}">
                <div class="shopping-checkbox ${item.checked ? 'checked' : ''}"
                     data-id="${item.id}"
                     role="checkbox"
                     aria-checked="${item.checked}"
                     tabindex="0">
                </div>
                <span class="shopping-text">${item.name}</span>
                <span class="shopping-amount">${item.amount}</span>
                <button class="shopping-delete" data-id="${item.id}" aria-label="Verwijder ${item.name}">
                    ✕
                </button>
            </div>
        `).join('');

        // Add event listeners
        shoppingListEl.querySelectorAll('.shopping-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', () => toggleShoppingItem(checkbox.dataset.id));
            checkbox.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleShoppingItem(checkbox.dataset.id);
                }
            });
        });

        shoppingListEl.querySelectorAll('.shopping-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteShoppingItem(btn.dataset.id));
        });
    }
}

// Toggle shopping item checked state
function toggleShoppingItem(itemId) {
    const item = shoppingList.find(i => i.id.toString() === itemId.toString());
    if (item) {
        item.checked = !item.checked;
        saveToStorage();
        renderShoppingList();
    }
}

// Delete shopping item
function deleteShoppingItem(itemId) {
    const index = shoppingList.findIndex(i => i.id.toString() === itemId.toString());
    if (index !== -1) {
        const item = shoppingList[index];
        shoppingList.splice(index, 1);
        saveToStorage();
        renderShoppingList();
        showToast(`${item.name} verwijderd`);
    }
}

// Clear shopping list
function clearShoppingList() {
    if (confirm('Weet je zeker dat je de hele boodschappenlijst wilt leegmaken?')) {
        shoppingList = [];
        saveToStorage();
        renderShoppingList();
        showToast('Boodschappenlijst leeggemaakt');
    }
}

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Register service worker for PWA
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('sw.js');
            console.log('Service Worker geregistreerd');
        } catch (error) {
            console.log('Service Worker registratie mislukt:', error);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
