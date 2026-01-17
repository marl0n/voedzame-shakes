/**
 * Voedzame Shakes App
 * Modern, simple recipe app with smart shopping list
 */

// ===== SF SYMBOL STYLE ICONS (SVG) =====
const icons = {
    // Tab bar icons
    book: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    heart: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    heartFill: `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    cart: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    chevronLeft: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    copy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    trash: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    // Aisle icons
    leaf: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
    drop: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
    sunrise: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>`,
    grid: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="7.5" r="3.5"></circle><circle cx="16.5" cy="7.5" r="3.5"></circle><circle cx="7.5" cy="16.5" r="3.5"></circle><circle cx="16.5" cy="16.5" r="3.5"></circle></svg>`,
    dropFill: `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
    stack: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="6" rx="1"></rect><rect x="4" y="14" width="16" height="6" rx="1"></rect></svg>`,
    snowflake: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M20 16l-4-4 4-4"></path><path d="M4 8l4 4-4 4"></path><path d="M16 4l-4 4-4-4"></path><path d="M8 20l4-4 4 4"></path></svg>`,
    star: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
};

// Aisle icons mapping
const aisleIcons = {
    "Fruit": icons.leaf,
    "Zuivel": icons.drop,
    "Ontbijt": icons.sunrise,
    "Noten": icons.grid,
    "Zoet": icons.dropFill,
    "Bakken": icons.stack,
    "Diepvries": icons.snowflake,
    "Speciaal": icons.star
};

// ===== INGREDIENT DATABASE =====
// Gangpad volgorde zoals in supermarkt
const aisleOrder = ["Fruit", "Zuivel", "Ontbijt", "Noten", "Zoet", "Bakken", "Diepvries", "Speciaal"];

const ingredientDB = {
    // Fruit
    "banaan": { aisle: "Fruit", order: 1 },
    "aardbeien": { aisle: "Fruit", order: 2 },
    "mango": { aisle: "Fruit", order: 3 },
    "avocado": { aisle: "Fruit", order: 4 },
    "appel": { aisle: "Fruit", order: 5 },
    "peer": { aisle: "Fruit", order: 6 },

    // Zuivel
    "volle melk": { aisle: "Zuivel", order: 1 },
    "griekse yoghurt": { aisle: "Zuivel", order: 2 },
    "kwark": { aisle: "Zuivel", order: 3 },
    "kokosmelk": { aisle: "Zuivel", order: 4 },
    "amandelmelk": { aisle: "Zuivel", order: 5 },

    // Ontbijt
    "havermout": { aisle: "Ontbijt", order: 1 },

    // Noten
    "pindakaas": { aisle: "Noten", order: 1 },
    "amandelboter": { aisle: "Noten", order: 2 },
    "walnoten": { aisle: "Noten", order: 3 },
    "geraspte kokos": { aisle: "Noten", order: 4 },

    // Zoet
    "honing": { aisle: "Zoet", order: 1 },

    // Bakken
    "cacaopoeder": { aisle: "Bakken", order: 1 },
    "vanille-extract": { aisle: "Bakken", order: 2 },
    "kaneel": { aisle: "Bakken", order: 3 },

    // Diepvries
    "rode vruchten": { aisle: "Diepvries", order: 1 }
};

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
            { ingredient: "volle melk", amount: 300, unit: "ml" },
            { ingredient: "banaan", display: "Rijpe banaan", amount: 1, unit: "stuk" },
            { ingredient: "pindakaas", amount: 2, unit: "el" },
            { ingredient: "griekse yoghurt", amount: 100, unit: "g" },
            { ingredient: "honing", amount: 1, unit: "el" },
            { ingredient: "havermout", amount: 30, unit: "g" }
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
            { ingredient: "volle melk", amount: 250, unit: "ml" },
            { ingredient: "avocado", display: "Rijpe avocado", amount: 0.5, unit: "stuk" },
            { ingredient: "cacaopoeder", amount: 2, unit: "el" },
            { ingredient: "kwark", amount: 100, unit: "g" },
            { ingredient: "honing", amount: 2, unit: "el" },
            { ingredient: "vanille-extract", amount: 1, unit: "tl" }
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
            { ingredient: "volle melk", amount: 250, unit: "ml" },
            { ingredient: "rode vruchten", display: "Diepvries rode vruchten", amount: 150, unit: "g" },
            { ingredient: "griekse yoghurt", amount: 150, unit: "g" },
            { ingredient: "honing", amount: 2, unit: "el" },
            { ingredient: "amandelboter", amount: 1, unit: "el" }
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
            { ingredient: "kokosmelk", amount: 200, unit: "ml" },
            { ingredient: "volle melk", amount: 100, unit: "ml" },
            { ingredient: "mango", display: "Mango (vers of diepvries)", amount: 150, unit: "g" },
            { ingredient: "griekse yoghurt", amount: 100, unit: "g" },
            { ingredient: "honing", amount: 1, unit: "el" },
            { ingredient: "geraspte kokos", amount: 2, unit: "el" }
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
            { ingredient: "volle melk", amount: 300, unit: "ml" },
            { ingredient: "appel", display: "Appel (geschild)", amount: 1, unit: "stuk" },
            { ingredient: "kwark", amount: 100, unit: "g" },
            { ingredient: "havermout", amount: 40, unit: "g" },
            { ingredient: "kaneel", amount: 1, unit: "tl" },
            { ingredient: "honing", amount: 2, unit: "el" }
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
            { ingredient: "volle melk", amount: 300, unit: "ml" },
            { ingredient: "walnoten", amount: 30, unit: "g" },
            { ingredient: "griekse yoghurt", amount: 100, unit: "g" },
            { ingredient: "vanille-extract", amount: 1, unit: "tl" },
            { ingredient: "honing", amount: 2, unit: "el" },
            { ingredient: "banaan", amount: 0.5, unit: "stuk" }
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
            { ingredient: "volle melk", amount: 300, unit: "ml" },
            { ingredient: "aardbeien", amount: 150, unit: "g" },
            { ingredient: "havermout", amount: 50, unit: "g" },
            { ingredient: "griekse yoghurt", amount: 100, unit: "g" },
            { ingredient: "honing", amount: 1, unit: "el" }
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
            { ingredient: "volle melk", amount: 250, unit: "ml" },
            { ingredient: "peer", display: "Rijpe peer", amount: 1, unit: "stuk" },
            { ingredient: "amandelboter", amount: 2, unit: "el" },
            { ingredient: "kwark", amount: 100, unit: "g" },
            { ingredient: "honing", amount: 1, unit: "el" },
            { ingredient: "amandelmelk", amount: 50, unit: "ml" }
        ]
    }
];

// ===== STATE =====
let favorites = [];
let shoppingRecipes = [];
let checkedIngredients = [];
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
    initIcons();
    loadFromStorage();
    renderRecipes();
    renderFavorites();
    setupEventListeners();
    registerServiceWorker();
}

function initIcons() {
    // Tab bar icons
    document.getElementById('tab-icon-recipes').innerHTML = icons.book;
    document.getElementById('tab-icon-favorites').innerHTML = icons.heart;
    document.getElementById('tab-icon-shopping').innerHTML = icons.cart;

    // Shopping action buttons
    const copyIcon = document.getElementById('copy-icon');
    const trashIcon = document.getElementById('trash-icon');
    if (copyIcon) copyIcon.innerHTML = icons.copy;
    if (trashIcon) trashIcon.innerHTML = icons.trash;
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

// Format ingredient for display in recipe detail
function formatIngredientDisplay(ing) {
    const name = ing.display || capitalizeFirst(ing.ingredient);
    return `${name} - ${formatAmount(ing.amount, ing.unit)}`;
}

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderRecipeDetail(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    const inShopping = shoppingRecipes.find(r => r.recipeId === recipe.id);

    detailView.innerHTML = `
        <div class="detail-mini-header">
            <button class="back-btn-mini" onclick="closeDetail()">${icons.chevronLeft}</button>
            <span class="mini-header-emoji">${recipe.emoji}</span>
            <span class="mini-header-title">${recipe.name}</span>
        </div>

        <div class="detail-header ${recipe.gradient}">
            <button class="back-btn" onclick="closeDetail()">${icons.chevronLeft}</button>
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
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                    ${isFavorite ? icons.heartFill : icons.heart}
                </button>
            </div>

            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing => `
                    <li class="ingredient-item">
                        <span class="ingredient-name">${ing.display || capitalizeFirst(ing.ingredient)}</span>
                        <span class="ingredient-amount">${formatAmount(ing.amount, ing.unit)}</span>
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
                <span class="btn-icon">${icons.cart}</span> Voeg toe aan boodschappen
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

    setupDetailScroll();
}

let detailScrollHandler = null;

function setupDetailScroll() {
    if (detailScrollHandler) {
        window.removeEventListener('scroll', detailScrollHandler);
    }

    const miniHeader = document.querySelector('.detail-mini-header');
    const mainHeader = document.querySelector('.detail-header');

    if (!miniHeader || !mainHeader) return;

    detailScrollHandler = () => {
        const scrollY = window.scrollY;
        const threshold = 200;

        if (scrollY > threshold) {
            miniHeader.classList.add('visible');
        } else {
            miniHeader.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', detailScrollHandler);
}

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

// Format amount with smart unit conversion
function formatAmount(value, unit) {
    // Convert ml to liters for large amounts
    if (unit === 'ml' && value >= 750) {
        const liters = value / 1000;
        const roundedLiters = Math.round(liters * 2) / 2;
        return `${roundedLiters} L`;
    }

    // Convert grams to kg for very large amounts
    if (unit === 'g' && value >= 1000) {
        const kg = value / 1000;
        const roundedKg = Math.round(kg * 10) / 10;
        return `${roundedKg} kg`;
    }

    // Round to 1 decimal if needed
    let displayValue = Math.round(value * 10) / 10;
    if (displayValue === Math.floor(displayValue)) {
        displayValue = Math.floor(displayValue);
    }

    return `${displayValue} ${unit}`;
}

// Calculate combined ingredients grouped by aisle
function calculateCombinedIngredients() {
    const combined = {};

    shoppingRecipes.forEach(sr => {
        const recipe = recipes.find(r => r.id === sr.recipeId);
        if (!recipe) return;

        recipe.ingredients.forEach(ing => {
            const key = ing.ingredient.toLowerCase();

            if (!combined[key]) {
                combined[key] = {
                    ingredient: ing.ingredient,
                    display: ing.display || capitalizeFirst(ing.ingredient),
                    amounts: {},
                    sources: []
                };
            }

            // Add to amounts by unit
            const unitKey = ing.unit;
            if (!combined[key].amounts[unitKey]) {
                combined[key].amounts[unitKey] = 0;
            }
            combined[key].amounts[unitKey] += ing.amount * sr.portions;

            // Track sources
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

// Group ingredients by aisle and sort
function groupIngredientsByAisle(combined) {
    const grouped = {};

    Object.entries(combined).forEach(([key, ing]) => {
        const dbEntry = ingredientDB[key] || { aisle: "Speciaal", order: 99 };
        const aisle = dbEntry.aisle;

        if (!grouped[aisle]) {
            grouped[aisle] = [];
        }

        grouped[aisle].push({
            key,
            ...ing,
            order: dbEntry.order
        });
    });

    // Sort within each aisle
    Object.values(grouped).forEach(items => {
        items.sort((a, b) => a.order - b.order);
    });

    return grouped;
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
        saveToStorage();
        renderShoppingList();
        showToast(`${recipe.name} verwijderd`);
    }
}

function toggleIngredientCheck(ingredientKey) {
    const index = checkedIngredients.indexOf(ingredientKey);
    if (index === -1) {
        checkedIngredients.push(ingredientKey);
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
    const grouped = groupIngredientsByAisle(combined);

    // Build ingredients HTML grouped by aisle
    let ingredientsHTML = '';

    aisleOrder.forEach(aisle => {
        if (!grouped[aisle] || grouped[aisle].length === 0) return;

        const icon = aisleIcons[aisle] || icons.star;

        ingredientsHTML += `<div class="aisle-header"><span class="aisle-icon">${icon}</span>${aisle}</div>`;

        grouped[aisle].forEach(ing => {
            const isChecked = checkedIngredients.includes(ing.key);

            // Format amounts
            const amountParts = Object.entries(ing.amounts).map(([unit, value]) => {
                return formatAmount(value, unit);
            });
            const amountStr = amountParts.join(' + ');

            ingredientsHTML += `
                <div class="shopping-item ${isChecked ? 'checked' : ''}" data-ingredient="${ing.key}">
                    <div class="shopping-checkbox ${isChecked ? 'checked' : ''}"
                         onclick="toggleIngredientCheck('${ing.key}')"></div>
                    <span class="shopping-text">${ing.display}</span>
                    <span class="shopping-amount">${amountStr}</span>
                </div>
            `;
        });
    });

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
    const grouped = groupIngredientsByAisle(combined);

    const lines = [];

    aisleOrder.forEach(aisle => {
        if (!grouped[aisle] || grouped[aisle].length === 0) return;

        // Use simple text markers for clipboard
        lines.push(`\n--- ${aisle} ---`);

        grouped[aisle].forEach(ing => {
            if (checkedIngredients.includes(ing.key)) return;

            const amountParts = Object.entries(ing.amounts).map(([unit, value]) => {
                return formatAmount(value, unit);
            });
            lines.push(`• ${ing.display} - ${amountParts.join(' + ')}`);
        });
    });

    // Add recipe summary
    lines.push('\n🥤 Shakes:');
    shoppingRecipes.forEach(sr => {
        const recipe = recipes.find(r => r.id === sr.recipeId);
        if (recipe) {
            lines.push(`${recipe.emoji} ${sr.portions}x ${recipe.name}`);
        }
    });

    const text = lines.join('\n').trim();

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
