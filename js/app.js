/**
 * Voedzame Shakes App
 * Modern, simple recipe app
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
let shoppingList = [];
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
        const storedShopping = localStorage.getItem('voedzame-shopping');
        if (storedFavorites) favorites = JSON.parse(storedFavorites);
        if (storedShopping) shoppingList = JSON.parse(storedShopping);
    } catch (e) {
        console.error('Error loading from storage:', e);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('voedzame-favorites', JSON.stringify(favorites));
        localStorage.setItem('voedzame-shopping', JSON.stringify(shoppingList));
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

    // Update tabs
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Hide all views
    [recipesView, favoritesView, shoppingView, detailView].forEach(v => {
        v.classList.remove('active');
    });

    // Show header and tabs
    header.style.display = '';
    tabBar.style.display = '';

    // Show selected view
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

    // Hide header and tabs
    header.style.display = 'none';
    tabBar.style.display = 'none';

    // Hide other views
    [recipesView, favoritesView, shoppingView].forEach(v => {
        v.classList.remove('active');
    });

    // Show detail view
    detailView.classList.add('active');
    renderRecipeDetail(recipe);

    // Scroll to top
    window.scrollTo(0, 0);
}

function closeDetail() {
    header.style.display = '';
    tabBar.style.display = '';
    detailView.classList.remove('active');

    // Return to previous view
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
        favoritesList.innerHTML = `
            <div class="empty-message">
                Nog geen favorieten.<br>
                Tik op het hartje bij een recept.
            </div>
        `;
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

            <button class="add-shopping-btn" data-id="${recipe.id}">
                🛒 Voeg toe aan boodschappen
            </button>
        </div>
    `;

    // Add event listeners
    detailView.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(recipe.id);
        renderRecipeDetail(recipe); // Re-render to update heart
    });

    detailView.querySelector('.add-shopping-btn').addEventListener('click', () => {
        addToShoppingList(recipe);
    });
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

// ===== SHOPPING LIST =====
function addToShoppingList(recipe) {
    let addedCount = 0;

    recipe.ingredients.forEach(ingredient => {
        const exists = shoppingList.find(
            item => item.name.toLowerCase() === ingredient.item.toLowerCase()
        );

        if (!exists) {
            shoppingList.push({
                id: Date.now() + Math.random(),
                name: ingredient.item,
                amount: ingredient.amount,
                checked: false
            });
            addedCount++;
        }
    });

    saveToStorage();

    if (addedCount > 0) {
        showToast(`${addedCount} ingrediënten toegevoegd`);
    } else {
        showToast('Alle ingrediënten staan al op je lijst');
    }
}

function renderShoppingList() {
    if (shoppingList.length === 0) {
        shoppingListEl.innerHTML = `
            <div class="empty-message">
                Je boodschappenlijst is leeg.<br>
                Voeg ingrediënten toe vanuit een recept.
            </div>
        `;
        document.getElementById('shopping-actions').style.display = 'none';
    } else {
        document.getElementById('shopping-actions').style.display = 'flex';

        const sorted = [...shoppingList].sort((a, b) => a.checked - b.checked);

        shoppingListEl.innerHTML = `
            <div class="shopping-list">
                ${sorted.map(item => `
                    <div class="shopping-item ${item.checked ? 'checked' : ''}" data-id="${item.id}">
                        <div class="shopping-checkbox ${item.checked ? 'checked' : ''}" data-id="${item.id}"></div>
                        <span class="shopping-text">${item.name}</span>
                        <span class="shopping-amount">${item.amount}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Add checkbox listeners
        shoppingListEl.querySelectorAll('.shopping-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                toggleShoppingItem(checkbox.dataset.id);
            });
        });
    }
}

function toggleShoppingItem(itemId) {
    const item = shoppingList.find(i => i.id.toString() === itemId.toString());
    if (item) {
        item.checked = !item.checked;
        saveToStorage();
        renderShoppingList();
    }
}

function copyShoppingList() {
    const unchecked = shoppingList.filter(item => !item.checked);
    const text = unchecked.map(item => `• ${item.name} - ${item.amount}`).join('\n');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Lijst gekopieerd!');
        }).catch(() => {
            fallbackCopy(text);
        });
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
        shoppingList = [];
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
