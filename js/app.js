/**
 * Voedzame Shakes App
 * Modern, simple recipe app with smart shopping list
 */

// ===== RECIPES DATA =====
const recipes = [
    {
        id: 1,
        name: "Banaan Pindakaas Power",
        emoji: "🍌",
        gradient: "gradient-banana",
        kcal: 650,
        protein: 28,
        ingredients: [
            { item: "Volle melk", amount: "300 ml" },
            { item: "Rijpe banaan", amount: "1 grote" },
            { item: "Pindakaas", amount: "2 eetlepels" },
            { item: "Griekse yoghurt", amount: "100 gram" },
            { item: "Honing", amount: "1 eetlepel" },
            { item: "Havermout", amount: "30 gram" }
        ]
    },
    {
        id: 2,
        name: "Chocolade Avocado Dream",
        emoji: "🍫",
        gradient: "gradient-chocolate",
        kcal: 580,
        protein: 24,
        ingredients: [
            { item: "Volle melk", amount: "250 ml" },
            { item: "Rijpe avocado", amount: "½ stuks" },
            { item: "Cacaopoeder", amount: "2 eetlepels" },
            { item: "Kwark", amount: "100 gram" },
            { item: "Honing", amount: "2 eetlepels" },
            { item: "Vanille-extract", amount: "1 theelepel" }
        ]
    },
    {
        id: 3,
        name: "Rode Vruchten Boost",
        emoji: "🍇",
        gradient: "gradient-berry",
        kcal: 520,
        protein: 26,
        ingredients: [
            { item: "Volle melk", amount: "250 ml" },
            { item: "Diepvries rode vruchten", amount: "150 gram" },
            { item: "Griekse yoghurt", amount: "150 gram" },
            { item: "Honing", amount: "2 eetlepels" },
            { item: "Amandelboter", amount: "1 eetlepel" }
        ]
    },
    {
        id: 4,
        name: "Mango Kokos Tropic",
        emoji: "🥭",
        gradient: "gradient-mango",
        kcal: 590,
        protein: 22,
        ingredients: [
            { item: "Kokosmelk", amount: "200 ml" },
            { item: "Volle melk", amount: "100 ml" },
            { item: "Mango (vers of diepvries)", amount: "150 gram" },
            { item: "Griekse yoghurt", amount: "100 gram" },
            { item: "Honing", amount: "1 eetlepel" },
            { item: "Geraspte kokos", amount: "2 eetlepels" }
        ]
    },
    {
        id: 5,
        name: "Appel Kaneel Comfort",
        emoji: "🍎",
        gradient: "gradient-apple",
        kcal: 540,
        protein: 20,
        ingredients: [
            { item: "Volle melk", amount: "300 ml" },
            { item: "Appel (geschild)", amount: "1 grote" },
            { item: "Kwark", amount: "100 gram" },
            { item: "Havermout", amount: "40 gram" },
            { item: "Kaneel", amount: "1 theelepel" },
            { item: "Honing", amount: "2 eetlepels" }
        ]
    },
    {
        id: 6,
        name: "Vanille Walnoot Kracht",
        emoji: "🌰",
        gradient: "gradient-vanilla",
        kcal: 620,
        protein: 25,
        ingredients: [
            { item: "Volle melk", amount: "300 ml" },
            { item: "Walnoten", amount: "30 gram" },
            { item: "Griekse yoghurt", amount: "100 gram" },
            { item: "Vanille-extract", amount: "1 theelepel" },
            { item: "Honing", amount: "2 eetlepels" },
            { item: "Banaan", amount: "½ stuks" }
        ]
    },
    {
        id: 7,
        name: "Aardbei Havermout Start",
        emoji: "🍓",
        gradient: "gradient-strawberry",
        kcal: 560,
        protein: 24,
        ingredients: [
            { item: "Volle melk", amount: "300 ml" },
            { item: "Aardbeien", amount: "150 gram" },
            { item: "Havermout", amount: "50 gram" },
            { item: "Griekse yoghurt", amount: "100 gram" },
            { item: "Honing", amount: "1 eetlepel" }
        ]
    },
    {
        id: 8,
        name: "Peren Amandel Genot",
        emoji: "🍐",
        gradient: "gradient-pear",
        kcal: 550,
        protein: 23,
        ingredients: [
            { item: "Volle melk", amount: "250 ml" },
            { item: "Rijpe peer", amount: "1 grote" },
            { item: "Amandelboter", amount: "2 eetlepels" },
            { item: "Kwark", amount: "100 gram" },
            { item: "Honing", amount: "1 eetlepel" },
            { item: "Amandelmelk", amount: "50 ml" }
        ]
    }
];

// ===== STATE =====
let favorites = [];
// Shopping list now stores recipes with portions: [{recipeId: 1, portions: 2}, ...]
let shoppingRecipes = [];
let checkedIngredients = []; // Track which ingredients are checked off
let currentView = 'recipes';
let currentRecipe = null;

// ===== DOM ELEMENTS =====
const recipesView = document.getElementById('recipes-view');
const favoritesView = document.getElementById('favorites-view');
const shoppingView = document.getElementById('shopping-view');
const detailView = document.getElementById('detail-view');
const recipesList = document.getElementById('recipes-list');
const favoritesList = document.getElementById('favorites-list');
const shoppingListEl = document.getElementById('shopping-list');
const tabBtns = document.querySelectorAll('.tab-btn');
const toast = document.getElementById('toast');
const header = document.querySelector('.header');
const tabBar = document.querySelector('.tab-bar');

// ===== INIT =====
function init() {
    loadFromStorage();
    renderRecipes();
    renderFavorites();
    setupEventListeners();
    registerServiceWorker();
}

// ===== STORAGE =====
function loadFromStorage() {
    try {
        const storedFavorites = localStorage.getItem('voedzame-favorites');
        const storedShoppingRecipes = localStorage.getItem('voedzame-shopping-recipes');
        const storedChecked = localStorage.getItem('voedzame-checked');
        if (storedFavorites) favorites = JSON.parse(storedFavorites);
        if (storedShoppingRecipes) shoppingRecipes = JSON.parse(storedShoppingRecipes);
        if (storedChecked) checkedIngredients = JSON.parse(storedChecked);
    } catch (e) {
        console.error('Error loading from storage:', e);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('voedzame-favorites', JSON.stringify(favorites));
        localStorage.setItem('voedzame-shopping-recipes', JSON.stringify(shoppingRecipes));
        localStorage.setItem('voedzame-checked', JSON.stringify(checkedIngredients));
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
}

// ===== NAVIGATION =====
function switchTab(tab) {
    currentView = tab;
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    [recipesView, favoritesView, shoppingView, detailView].forEach(v => {
        v.classList.remove('active');
    });
    header.style.display = '';
    tabBar.style.display = '';

    switch(tab) {
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

function openRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    currentRecipe = recipe;
    header.style.display = 'none';
    tabBar.style.display = 'none';
    [recipesView, favoritesView, shoppingView].forEach(v => {
        v.classList.remove('active');
    });
    detailView.classList.add('active');
    renderRecipeDetail(recipe);
    window.scrollTo(0, 0);
}

function closeDetail() {
    header.style.display = '';
    tabBar.style.display = '';
    detailView.classList.remove('active');
    switchTab(currentView);
}

// ===== RENDER FUNCTIONS =====
function renderRecipes() {
    recipesList.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
    addCardListeners(recipesList);
}

function renderFavorites() {
    const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));
    if (favoriteRecipes.length === 0) {
        favoritesList.innerHTML = `<div class="empty-message">Nog geen favorieten.<br>Tik op het hartje bij een recept.</div>`;
    } else {
        favoritesList.innerHTML = favoriteRecipes.map(recipe => createRecipeCard(recipe)).join('');
        addCardListeners(favoritesList);
    }
}

function createRecipeCard(recipe) {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-card-image ${recipe.gradient}">
                <span class="recipe-card-emoji">${recipe.emoji}</span>
                <h3 class="recipe-card-title">${recipe.name}</h3>
            </div>
            <div class="recipe-card-stats">
                <div class="recipe-stat">
                    <span class="recipe-stat-value">${recipe.kcal}</span>
                    <span class="recipe-stat-label">kcal</span>
                </div>
                <div class="recipe-stat">
                    <span class="recipe-stat-value">${recipe.protein}g</span>
                    <span class="recipe-stat-label">eiwit</span>
                </div>
            </div>
        </div>
    `;
}

function addCardListeners(container) {
    container.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            openRecipeDetail(parseInt(card.dataset.id));
        });
    });
}

function renderRecipeDetail(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    const inShopping = shoppingRecipes.find(r => r.recipeId === recipe.id);

    detailView.innerHTML = `
        <div class="detail-header ${recipe.gradient}">
            <button class="back-btn" onclick="closeDetail()">←</button>
            <span class="detail-emoji">${recipe.emoji}</span>
            <h1 class="detail-title">${recipe.name}</h1>
            <div class="detail-stats">
                <div class="detail-stat">
                    <div class="detail-stat-value">${recipe.kcal}</div>
                    <div class="detail-stat-label">calorieën</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value">${recipe.protein}g</div>
                    <div class="detail-stat-label">eiwit</div>
                </div>
            </div>
        </div>

        <div class="detail-content">
            <div class="detail-section-header">
                <h2 class="detail-section-title">Ingrediënten</h2>
                <button class="favorite-btn" data-id="${recipe.id}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>

            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing => `
                    <li class="ingredient-item">
                        <span class="ingredient-name">${ing.item}</span>
                        <span class="ingredient-amount">${ing.amount}</span>
                    </li>
                `).join('')}
            </ul>

            <div class="portion-selector">
                <label>Aantal porties:</label>
                <div class="portion-controls">
                    <button class="portion-btn" onclick="adjustPortionSelector(-1)">−</button>
                    <span id="portion-count">1</span>
                    <button class="portion-btn" onclick="adjustPortionSelector(1)">+</button>
                </div>
            </div>

            <button class="add-shopping-btn" data-id="${recipe.id}">
                🛒 Voeg toe aan boodschappen
            </button>
            ${inShopping ? `<p class="already-in-list">Al op lijst: ${inShopping.portions}x</p>` : ''}
        </div>
    `;

    detailView.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(recipe.id);
        renderRecipeDetail(recipe);
    });

    detailView.querySelector('.add-shopping-btn').addEventListener('click', () => {
        const portions = parseInt(document.getElementById('portion-count').textContent);
        addToShoppingList(recipe.id, portions);
    });
}

let selectedPortions = 1;

function adjustPortionSelector(delta) {
    const countEl = document.getElementById('portion-count');
    let count = parseInt(countEl.textContent) + delta;
    if (count < 1) count = 1;
    if (count > 10) count = 10;
    countEl.textContent = count;
}

// ===== FAVORITES =====
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
}

// ===== SMART SHOPPING LIST =====

// Parse amount string into value and unit
function parseAmount(amountStr) {
    const match = amountStr.match(/^([\d½¼¾]+(?:[\.,]\d+)?)\s*(.*)$/);
    if (!match) return { value: 1, unit: amountStr, original: amountStr };

    let value = match[1];
    // Handle fractions
    if (value === '½') value = 0.5;
    else if (value === '¼') value = 0.25;
    else if (value === '¾') value = 0.75;
    else value = parseFloat(value.replace(',', '.'));

    return { value, unit: match[2].trim(), original: amountStr };
}

// Format amount back to string
function formatAmount(value, unit) {
    // Round to 1 decimal if needed
    let displayValue = Math.round(value * 10) / 10;
    if (displayValue === Math.floor(displayValue)) {
        displayValue = Math.floor(displayValue);
    }
    return unit ? `${displayValue} ${unit}` : `${displayValue}`;
}

// Calculate combined ingredients from all shopping recipes
function calculateCombinedIngredients() {
    const combined = {};

    shoppingRecipes.forEach(sr => {
        const recipe = recipes.find(r => r.id === sr.recipeId);
        if (!recipe) return;

        recipe.ingredients.forEach(ing => {
            const key = ing.item.toLowerCase();
            const parsed = parseAmount(ing.amount);

            if (!combined[key]) {
                combined[key] = {
                    name: ing.item,
                    amounts: {},
                    sources: []
                };
            }

            // Add to amounts by unit
            const unitKey = parsed.unit || '_no_unit_';
            if (!combined[key].amounts[unitKey]) {
                combined[key].amounts[unitKey] = 0;
            }
            combined[key].amounts[unitKey] += parsed.value * sr.portions;

            // Track which recipe contributes
            const existingSource = combined[key].sources.find(s => s.recipeId === sr.recipeId);
            if (!existingSource) {
                combined[key].sources.push({
                    recipeId: sr.recipeId,
                    recipeName: recipe.name,
                    emoji: recipe.emoji
                });
            }
        });
    });

    return combined;
}

function addToShoppingList(recipeId, portions = 1) {
    const existing = shoppingRecipes.find(r => r.recipeId === recipeId);
    const recipe = recipes.find(r => r.id === recipeId);

    if (existing) {
        existing.portions += portions;
        showToast(`${recipe.name} nu ${existing.portions}x op lijst`);
    } else {
        shoppingRecipes.push({ recipeId, portions });
        showToast(`${portions}x ${recipe.name} toegevoegd`);
    }

    saveToStorage();
    renderRecipeDetail(recipe);
}

function adjustRecipePortions(recipeId, delta) {
    const existing = shoppingRecipes.find(r => r.recipeId === recipeId);
    if (!existing) return;

    existing.portions += delta;

    if (existing.portions <= 0) {
        removeRecipeFromShopping(recipeId);
    } else {
        saveToStorage();
        renderShoppingList();
    }
}

function removeRecipeFromShopping(recipeId) {
    const index = shoppingRecipes.findIndex(r => r.recipeId === recipeId);
    if (index !== -1) {
        const recipe = recipes.find(r => r.id === recipeId);
        shoppingRecipes.splice(index, 1);
        // Also remove checked ingredients that were only from this recipe
        saveToStorage();
        renderShoppingList();
        showToast(`${recipe.name} verwijderd`);
    }
}

function toggleIngredientCheck(ingredientName) {
    const key = ingredientName.toLowerCase();
    const index = checkedIngredients.indexOf(key);
    if (index === -1) {
        checkedIngredients.push(key);
    } else {
        checkedIngredients.splice(index, 1);
    }
    saveToStorage();
    renderShoppingList();
}

function renderShoppingList() {
    if (shoppingRecipes.length === 0) {
        shoppingListEl.innerHTML = `
            <div class="empty-message">
                Je boodschappenlijst is leeg.<br>
                Voeg shakes toe vanuit een recept.
            </div>
        `;
        document.getElementById('shopping-actions').style.display = 'none';
        return;
    }

    document.getElementById('shopping-actions').style.display = 'flex';

    const combined = calculateCombinedIngredients();
    const ingredientKeys = Object.keys(combined);

    // Sort: unchecked first
    ingredientKeys.sort((a, b) => {
        const aChecked = checkedIngredients.includes(a);
        const bChecked = checkedIngredients.includes(b);
        if (aChecked && !bChecked) return 1;
        if (!aChecked && bChecked) return -1;
        return 0;
    });

    // Build ingredients HTML
    let ingredientsHTML = ingredientKeys.map(key => {
        const ing = combined[key];
        const isChecked = checkedIngredients.includes(key);

        // Format amounts (might have multiple units)
        const amountParts = Object.entries(ing.amounts).map(([unit, value]) => {
            if (unit === '_no_unit_') return formatAmount(value, '');
            return formatAmount(value, unit);
        });
        const amountStr = amountParts.join(' + ');

        return `
            <div class="shopping-item ${isChecked ? 'checked' : ''}" data-ingredient="${key}">
                <div class="shopping-checkbox ${isChecked ? 'checked' : ''}"
                     onclick="toggleIngredientCheck('${key}')"></div>
                <span class="shopping-text">${ing.name}</span>
                <span class="shopping-amount">${amountStr}</span>
            </div>
        `;
    }).join('');

    // Build recipes section
    let recipesHTML = shoppingRecipes.map(sr => {
        const recipe = recipes.find(r => r.id === sr.recipeId);
        if (!recipe) return '';

        return `
            <div class="shopping-recipe">
                <span class="shopping-recipe-info">
                    <span class="shopping-recipe-emoji">${recipe.emoji}</span>
                    <span class="shopping-recipe-name">${recipe.name}</span>
                </span>
                <div class="shopping-recipe-controls">
                    ${sr.portions === 1
                        ? `<button class="portion-btn delete" onclick="removeRecipeFromShopping(${recipe.id})">✕</button>`
                        : `<button class="portion-btn" onclick="adjustRecipePortions(${recipe.id}, -1)">−</button>`
                    }
                    <span class="portion-count">${sr.portions}</span>
                    <button class="portion-btn" onclick="adjustRecipePortions(${recipe.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    shoppingListEl.innerHTML = `
        <div class="shopping-list">
            ${ingredientsHTML}
        </div>

        <div class="shopping-recipes-section">
            <h3 class="shopping-recipes-title">Shakes op deze lijst</h3>
            ${recipesHTML}
        </div>
    `;
}

function copyShoppingList() {
    const combined = calculateCombinedIngredients();
    const lines = Object.values(combined)
        .filter(ing => !checkedIngredients.includes(ing.name.toLowerCase()))
        .map(ing => {
            const amountParts = Object.entries(ing.amounts).map(([unit, value]) => {
                if (unit === '_no_unit_') return formatAmount(value, '');
                return formatAmount(value, unit);
            });
            return `• ${ing.name} - ${amountParts.join(' + ')}`;
        });

    // Add recipe summary
    lines.push('');
    lines.push('Shakes:');
    shoppingRecipes.forEach(sr => {
        const recipe = recipes.find(r => r.id === sr.recipeId);
        if (recipe) {
            lines.push(`${recipe.emoji} ${sr.portions}x ${recipe.name}`);
        }
    });

    const text = lines.join('\n');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Lijst gekopieerd!');
        }).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Lijst gekopieerd!');
}

function clearShoppingList() {
    if (confirm('Weet je zeker dat je de lijst wilt legen?')) {
        shoppingRecipes = [];
        checkedIngredients = [];
        saveToStorage();
        renderShoppingList();
        showToast('Lijst geleegd');
    }
}

// ===== TOAST =====
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== SERVICE WORKER =====
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('sw.js');
        } catch (e) {
            console.log('SW registration failed:', e);
        }
    }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
