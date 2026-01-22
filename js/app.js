/**
 * Voedzame Recepten App
 * Modern, simple recipe app with smart shopping list
 * Supports shakes and soups with different detail views
 */

// ===== SF SYMBOL STYLE ICONS (SVG) =====
const icons = {
    // Header icons
    refresh: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
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
    "Speciaal": icons.star,
    "Groenten": icons.leaf
};

// ===== EMOJI MAPPING =====
const recipeEmojis = {
    "banana-peanut": "🍌",
    "chocolate-avocado": "🍫",
    "berry-boost": "🍇",
    "mango-coconut": "🥭",
    "apple-cinnamon": "🍎",
    "vanilla-walnut": "🌰",
    "strawberry-oat": "🍓",
    "pear-almond": "🍐",
    "green-keto": "🥬",
    "creamy-cacao": "🍫",
    // Soup emojis
    "tomato-soup": "🍅",
    "broccoli-soup": "🥦",
    "courgette-soup": "🥒",
    "carrot-soup": "🥕"
};

// ===== GRADIENT MAPPING =====
const recipeGradients = {
    "banana-peanut": "gradient-banana",
    "chocolate-avocado": "gradient-chocolate",
    "berry-boost": "gradient-berry",
    "mango-coconut": "gradient-mango",
    "apple-cinnamon": "gradient-apple",
    "vanilla-walnut": "gradient-vanilla",
    "strawberry-oat": "gradient-strawberry",
    "pear-almond": "gradient-pear",
    "green-keto": "gradient-green-keto",
    "creamy-cacao": "gradient-creamy-cacao",
    // Soup gradients
    "tomato-soup": "gradient-tomato-soup",
    "broccoli-soup": "gradient-broccoli-soup",
    "courgette-soup": "gradient-courgette-soup",
    "carrot-soup": "gradient-carrot-soup"
};

// ===== INGREDIENT DATABASE =====
// Gangpad volgorde zoals in supermarkt
const aisleOrder = ["Groenten", "Fruit", "Zuivel", "Ontbijt", "Noten", "Zoet", "Bakken", "Diepvries", "Speciaal"];

const ingredientDB = {
    // Fruit
    "banaan": { aisle: "Fruit", order: 1 },
    "aardbeien": { aisle: "Fruit", order: 2 },
    "mango": { aisle: "Fruit", order: 3 },
    "avocado": { aisle: "Fruit", order: 4 },
    "appel": { aisle: "Fruit", order: 5 },
    "peer": { aisle: "Fruit", order: 6 },

    // Groenten (for soups)
    "spinazie": { aisle: "Groenten", order: 1 },
    "komkommer": { aisle: "Groenten", order: 2 },
    "citroensap": { aisle: "Fruit", order: 9 },
    "gepelde tomaten (blik)": { aisle: "Speciaal", order: 10 },
    "ui": { aisle: "Groenten", order: 3 },
    "knoflook": { aisle: "Groenten", order: 4 },
    "broccoli roosjes": { aisle: "Groenten", order: 5 },
    "courgettes": { aisle: "Groenten", order: 6 },
    "prei (het witte deel)": { aisle: "Groenten", order: 7 },
    "wortels": { aisle: "Groenten", order: 8 },
    "verse gember": { aisle: "Groenten", order: 9 },

    // Zuivel
    "volle melk": { aisle: "Zuivel", order: 1 },
    "griekse yoghurt": { aisle: "Zuivel", order: 2 },
    "kwark": { aisle: "Zuivel", order: 3 },
    "kokosmelk": { aisle: "Zuivel", order: 4 },
    "amandelmelk": { aisle: "Zuivel", order: 5 },
    "slagroom": { aisle: "Zuivel", order: 6 },
    "crème fraîche": { aisle: "Zuivel", order: 7 },
    "boter": { aisle: "Zuivel", order: 8 },
    "oude kaas, geraspt": { aisle: "Zuivel", order: 9 },

    // Ontbijt
    "havermout": { aisle: "Ontbijt", order: 1 },

    // Noten
    "pindakaas": { aisle: "Noten", order: 1 },
    "amandelboter": { aisle: "Noten", order: 2 },
    "walnoten": { aisle: "Noten", order: 3 },
    "geraspte kokos": { aisle: "Noten", order: 4 },

    // Zoet
    "honing": { aisle: "Zoet", order: 1 },
    "suiker": { aisle: "Zoet", order: 2 },

    // Bakken
    "cacaopoeder": { aisle: "Bakken", order: 1 },
    "vanille-extract": { aisle: "Bakken", order: 2 },
    "kaneel": { aisle: "Bakken", order: 3 },
    "nootmuskaat": { aisle: "Bakken", order: 4 },
    "olijfolie": { aisle: "Bakken", order: 5 },

    // Diepvries
    "rode vruchten": { aisle: "Diepvries", order: 1 },

    // Speciaal
    "water": { aisle: "Speciaal", order: 1 },
    "zout": { aisle: "Speciaal", order: 2 },
    "stevia of zout": { aisle: "Speciaal", order: 3 },
    "groentebouillon": { aisle: "Speciaal", order: 4 },
    "zout en peper": { aisle: "Speciaal", order: 5 }
};

// ===== RECIPES DATA (loaded from JSON) =====
let recipes = [];

// ===== STATE =====
let favorites = [];
let shoppingRecipes = [];
let checkedIngredients = [];
let currentView = 'recipes';
let currentRecipe = null;
let currentFilter = 'all';

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
async function init() {
    initIcons();
    await loadRecipes();
    loadFromStorage();
    renderRecipes();
    renderFavorites();
    setupEventListeners();
    setupFilterPills();
    registerServiceWorker();
    updateBadges();
}

// ===== LOAD RECIPES FROM JSON =====
async function loadRecipes() {
    try {
        const response = await fetch('recipes.json');
        const data = await response.json();
        recipes = data.recipes.map(r => ({
            id: r.id,
            name: r.name,
            description: r.description,
            emoji: recipeEmojis[r.image] || "🍽️",
            gradient: recipeGradients[r.image] || "gradient-banana",
            kcal: r.calories,
            protein: r.protein,
            category: r.category || "shake",
            ingredients: r.ingredients.map(ing => ({
                ingredient: ing.item.toLowerCase(),
                display: ing.item,
                amount: ing.amount
            })),
            steps: r.steps || null
        }));
    } catch (e) {
        console.error('Error loading recipes:', e);
    }
}

// ===== BADGE UPDATES =====
function updateBadges() {
    // Favorites badge
    const favBadge = document.getElementById('favorites-badge');
    if (favBadge) {
        if (favorites.length > 0) {
            favBadge.textContent = favorites.length;
            favBadge.style.display = 'flex';
        } else {
            favBadge.style.display = 'none';
        }
    }
    
    // Shopping badge
    const shopBadge = document.getElementById('shopping-badge');
    if (shopBadge) {
        if (shoppingRecipes.length > 0) {
            shopBadge.textContent = shoppingRecipes.length;
            shopBadge.style.display = 'flex';
        } else {
            shopBadge.style.display = 'none';
        }
    }
}

function initIcons() {
    // Update button icon
    const updateBtn = document.getElementById('update-btn');
    if (updateBtn) updateBtn.innerHTML = icons.refresh;
    
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

// ===== STEP CHECKBOX STATE =====
function getCheckedSteps(recipeId) {
    try {
        const stored = localStorage.getItem(`voedzame-steps-${recipeId}`);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveCheckedSteps(recipeId, checkedSteps) {
    try {
        localStorage.setItem(`voedzame-steps-${recipeId}`, JSON.stringify(checkedSteps));
    } catch (e) {
        console.error('Error saving step state:', e);
    }
}

function toggleStepCheck(recipeId, stepIndex) {
    const checkedSteps = getCheckedSteps(recipeId);
    const index = checkedSteps.indexOf(stepIndex);
    
    if (index === -1) {
        checkedSteps.push(stepIndex);
    } else {
        checkedSteps.splice(index, 1);
    }
    
    saveCheckedSteps(recipeId, checkedSteps);
    
    // Update the UI for the specific step
    const stepItem = document.querySelector(`.step-item[data-step="${stepIndex}"]`);
    if (stepItem) {
        stepItem.classList.toggle('checked', checkedSteps.includes(stepIndex));
    }
}

function resetAllSteps(recipeId) {
    saveCheckedSteps(recipeId, []);
    // Re-render the detail view
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
        renderRecipeDetail(recipe);
    }
    showToast('Alle stappen gereset');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
}

// ===== FILTER PILLS =====
function setupFilterPills() {
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.dataset.filter;
            renderRecipes();
        });
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
    let filteredRecipes = recipes;
    
    if (currentFilter !== 'all') {
        filteredRecipes = recipes.filter(r => r.category === currentFilter);
    }
    
    recipesList.innerHTML = filteredRecipes.map(recipe => createRecipeCard(recipe)).join('');
    addCardListeners(recipesList);
}

function renderFavorites() {
    const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));
    if (favoriteRecipes.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-message">
                <div class="empty-icon">❤️</div>
                <h3>Nog geen favorieten</h3>
                <p>Tik op het hartje bij een recept om het hier op te slaan.</p>
            </div>
        `;
    } else {
        favoritesList.innerHTML = favoriteRecipes.map(recipe => createRecipeCard(recipe)).join('');
        addCardListeners(favoritesList);
    }
    updateBadges();
}

function createRecipeCard(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-card-image ${recipe.gradient}">
                <span class="recipe-card-emoji">${recipe.emoji}</span>
                <button class="favorite-btn-card ${isFavorite ? 'active' : ''}" 
                        data-id="${recipe.id}" 
                        onclick="event.stopPropagation(); toggleFavorite(${recipe.id})"
                        aria-label="${isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}">
                    ${isFavorite ? icons.heartFill : icons.heart}
                </button>
            </div>
            <div class="recipe-card-content">
                <h3 class="recipe-card-title">${recipe.name}</h3>
                <div class="recipe-card-stats">
                    <div class="recipe-stat protein">
                        <span class="recipe-stat-value">${recipe.protein}g</span>
                        <span class="recipe-stat-label">eiwit</span>
                    </div>
                    <div class="recipe-stat calories">
                        <span class="recipe-stat-value">${recipe.kcal}</span>
                        <span class="recipe-stat-label">kcal</span>
                    </div>
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

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format step text with quantities highlighted
function formatStepText(stepText) {
    // Match text in parentheses like (2 el), (400g), (1 kleine)
    return stepText.replace(/\(([^)]+)\)/g, '<span class="step-quantity">($1)</span>');
}

function renderRecipeDetail(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    const inShopping = shoppingRecipes.find(r => r.recipeId === recipe.id);
    const isSoup = recipe.category === 'soep';
    const checkedSteps = isSoup ? getCheckedSteps(recipe.id) : [];

    let stepsSection = '';
    if (isSoup && recipe.steps) {
        stepsSection = `
            <div class="detail-section">
                <div class="detail-section-header">
                    <h2 class="detail-section-title">Bereiding</h2>
                    <button class="reset-steps-btn" onclick="resetAllSteps(${recipe.id})">
                        Reset stappen
                    </button>
                </div>
                <div class="steps-list">
                    ${recipe.steps.map((step, index) => `
                        <div class="step-item ${checkedSteps.includes(index) ? 'checked' : ''}" 
                             data-step="${index}"
                             onclick="toggleStepCheck(${recipe.id}, ${index})">
                            <div class="step-checkbox ${checkedSteps.includes(index) ? 'checked' : ''}">
                                ${checkedSteps.includes(index) ? '✓' : ''}
                            </div>
                            <span class="step-number">${index + 1}</span>
                            <span class="step-text">${formatStepText(step)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    detailView.innerHTML = `
        <div class="detail-mini-header">
            <button class="back-btn-mini" onclick="closeDetail()">${icons.chevronLeft}</button>
            <span class="mini-header-emoji">${recipe.emoji}</span>
            <span class="mini-header-title">${recipe.name}</span>
        </div>

        <div class="detail-header ${recipe.gradient}">
            <button class="back-btn" onclick="closeDetail()">${icons.chevronLeft}</button>
            <span class="detail-emoji">${recipe.emoji}</span>
        </div>

        <div class="detail-content">
            <h1 class="detail-title">${recipe.name}</h1>
            
            <div class="detail-stats">
                <div class="detail-stat protein">
                    <div class="detail-stat-icon">${icons.leaf}</div>
                    <div class="detail-stat-value">${recipe.protein}g</div>
                    <div class="detail-stat-label">eiwit</div>
                </div>
                <div class="detail-stat calories">
                    <div class="detail-stat-icon">${icons.sunrise}</div>
                    <div class="detail-stat-value">${recipe.kcal}</div>
                    <div class="detail-stat-label">kcal</div>
                </div>
            </div>

            <div class="detail-section">
                <div class="detail-section-header">
                    <h2 class="detail-section-title">Ingrediënten</h2>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                        ${isFavorite ? icons.heartFill : icons.heart}
                    </button>
                </div>

                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ing => `
                        <li class="ingredient-item">
                            <span class="ingredient-bullet"></span>
                            <span class="ingredient-name">${ing.display}</span>
                            <span class="ingredient-amount">${ing.amount}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            ${stepsSection}

            <div class="portion-selector">
                <label>Aantal porties:</label>
                <div class="portion-controls">
                    <button class="portion-btn" onclick="adjustPortionSelector(-1)">−</button>
                    <span id="portion-count">1</span>
                    <button class="portion-btn" onclick="adjustPortionSelector(1)">+</button>
                </div>
            </div>

            <button class="add-shopping-btn" data-id="${recipe.id}">
                ${icons.cart} Voeg toe aan boodschappenlijst
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
        showToast(`Toegevoegd aan favorieten`);
    } else {
        favorites.splice(index, 1);
        showToast(`Verwijderd uit favorieten`);
    }
    saveToStorage();
    renderRecipes();
    updateBadges();
}

// ===== SMART SHOPPING LIST =====

// Format amount for display
function formatAmount(ingredient) {
    return ingredient.amount;
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
                    display: ing.display,
                    amounts: [],
                    sources: []
                };
            }

            // Add amount (multiplied by portions)
            for (let i = 0; i < sr.portions; i++) {
                combined[key].amounts.push(ing.amount);
            }

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
    updateBadges();
    
    if (shoppingRecipes.length === 0) {
        shoppingListEl.innerHTML = `
            <div class="empty-message">
                <div class="empty-icon">🛒</div>
                <h3>Geen boodschappen</h3>
                <p>Voeg ingrediënten toe vanuit een recept om hier je boodschappenlijst te zien.</p>
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

            // Format amounts - combine same amounts
            const amountCounts = {};
            ing.amounts.forEach(amt => {
                amountCounts[amt] = (amountCounts[amt] || 0) + 1;
            });
            const amountStr = Object.entries(amountCounts).map(([amt, count]) => {
                return count > 1 ? `${count}x ${amt}` : amt;
            }).join(' + ');

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
            <h3 class="shopping-recipes-title">Recepten op deze lijst</h3>
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

            const amountCounts = {};
            ing.amounts.forEach(amt => {
                amountCounts[amt] = (amountCounts[amt] || 0) + 1;
            });
            const amountStr = Object.entries(amountCounts).map(([amt, count]) => {
                return count > 1 ? `${count}x ${amt}` : amt;
            }).join(' + ');

            lines.push(`• ${ing.display} - ${amountStr}`);
        });
    });

    // Add recipe summary
    lines.push('\n🍽️ Recepten:');
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

// ===== UPDATE MECHANISM =====
async function checkForUpdates() {
    const btn = document.getElementById('update-btn');
    if (btn) {
        btn.classList.add('spinning');
    }
    
    try {
        // 1. Update service worker
        if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.ready;
            await reg.update();
            console.log('Service Worker update gecontroleerd');
        }
        
        // 2. Clear all caches
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log('Caches geleegd:', cacheNames);
        }
        
        showToast('App wordt bijgewerkt...');
        
        // 3. Hard reload after short delay
        setTimeout(() => {
            window.location.reload(true);
        }, 1000);
        
    } catch (error) {
        console.error('Update mislukt:', error);
        showToast('Update mislukt, probeer opnieuw');
        if (btn) {
            btn.classList.remove('spinning');
        }
    }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
