# Cursor Task: Redesign + Fix Caching

## Overview
Two tasks in one:
1. **Apply new design** from Figma Make
2. **Fix recipe caching** for iOS Safari

## Figma Connection
Cursor is connected to Figma. The design source is:
**Figma Make: "Nutritious Shakes App Design"**

Use the Figma design as the source of truth for:
- Color palette (green gradient header, coral/green stat boxes)
- Typography and spacing
- Card layout with large food images
- Bottom navigation styling
- Recipe detail view
- All component styling

## Important: Keep Vanilla JS
The Figma code is React/TypeScript. Our app is **vanilla HTML/CSS/JS**.
**Do NOT convert to React.** Instead:
- Extract the CSS/styling from Figma's theme.css and components
- Adapt the visual design to our existing vanilla structure
- Keep our current app.js logic, just update the styling

---

## Current File Structure
```
/voedzame-shakes
├── index.html          # Single page, 3 views
├── css/style.css       # All styles (~700 lines)
├── js/app.js           # All logic (~400 lines)
├── recipes.json        # 8 recipes
├── sw.js               # Service Worker
└── manifest.json       # PWA manifest
```

---

## Task 1: Apply Figma Design

### From Figma, extract and apply:

**Colors (from theme.css):**
- Header gradient (green tones)
- Stat box colors: green for protein, coral/salmon for calories
- Card backgrounds
- Navigation active/inactive states
- Text colors

**Typography:**
- Font sizes (keep large for accessibility - 18px+ base)
- Font weights
- Line heights

**Components to restyle:**

1. **Header** (`<header class="header">`)
   - Green gradient background
   - Update button (🔄) in top-right
   - Logo styling

2. **Recipe Cards** (`.recipe-card`)
   - Large image area at top (we'll use colored backgrounds + emoji for now, no real photos)
   - Heart/favorite button overlay on image
   - Title and description below
   - Two stat boxes: protein (green) + calories (coral)
   - Remove prep time display

3. **Bottom Navigation** (`.nav`)
   - Sticky bottom bar
   - Three tabs with icons + labels
   - Active state styling (filled background)

4. **Recipe Detail Modal**
   - Match Figma's RecipeDetail component styling
   - Large stat display
   - Ingredient list styling
   - Instructions section

5. **Shopping List**
   - Checkbox styling
   - Item layout

### Data Changes:
- **Remove prepTime** from recipe card display (keep in data, just don't show)
- **Reorder stats**: Protein (eiwit) FIRST, then Calories (kcal)
- Stats should be prominent boxes, not inline text

---

## Task 2: Fix Recipe Caching

### Problem:
iOS Safari + PWA aggressively caches. Recipe updates don't appear.

### Solution:

**sw.js changes:**
1. Bump cache version to `v3`
2. Network-first strategy for `recipes.json`
3. Cache-first for static assets (HTML/CSS/JS)

**js/app.js changes:**
1. Add cache-busting to recipe fetch: `recipes.json?v=${Date.now()}`
2. Add `checkForUpdates()` function that:
   - Clears caches
   - Updates service worker
   - Reloads recipes
   - Shows toast confirmation
3. Add `renderUpdateButton()` to inject 🔄 button in header
4. Call `renderUpdateButton()` in `init()`

---

## Recipe Data Display Rules

For each recipe card, show:
```
┌─────────────────────────────┐
│  [Colored bg + Emoji]    ♡  │
│                             │
├─────────────────────────────┤
│  Recipe Name                │
│  Short description          │
│                             │
│  ┌─────────┐  ┌─────────┐  │
│  │   18g   │  │   520   │  │
│  │  eiwit  │  │   kcal  │  │
│  └─────────┘  └─────────┘  │
└─────────────────────────────┘
```

- Protein box: green/teal background
- Calories box: coral/salmon background
- NO prep time shown

---

## Files to Modify

| File | Changes |
|------|---------|
| `css/style.css` | Complete visual redesign based on Figma |
| `js/app.js` | Update card HTML, add update button, fix caching |
| `sw.js` | Network-first for recipes, bump version |
| `index.html` | Minor structure changes if needed |

---

## Testing Checklist

After implementation:
- [ ] Visual design matches Figma
- [ ] Protein shows before calories on cards
- [ ] No prep time visible
- [ ] Update button (🔄) in header works
- [ ] Console shows "Recipes loaded" on refresh
- [ ] Offline mode still works
- [ ] Bottom nav switches views correctly
- [ ] Favorites still work
- [ ] Shopping list still works

---

## Accessibility Requirements (KEEP THESE)

- Minimum 48px touch targets
- Font size minimum 18px body text
- High contrast ratios
- Clear focus states
- Screen reader friendly (aria-labels)
