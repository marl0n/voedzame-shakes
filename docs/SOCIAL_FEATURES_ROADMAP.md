# Voedzame Recepten - Social Features Roadmap

## Vision
Transform the app from a personal recipe viewer into a social platform where family and friends (especially older users like mom and her friends) can share recipes, cook together, and stay connected through food.

---

## Research: Existing Social Recipe Apps

| App | Strengths | Weaknesses |
|-----|-----------|------------|
| **Pepper** | Fun social features, collab folders, 1M+ users | Young audience, gamification overkill |
| **Samsung Food** | Mature platform, communities, shared grocery lists | Complex, overwhelming for older users |
| **Mealie** | Self-hosted, full control, open source | Requires technical setup |
| **Recipe Keeper** | Simple, cross-platform sync | No real social features |

**Key insight:** None of these are designed for older users who want simple social cooking with close friends/family.

---

## Proposed Features

### Phase 1: Basic Social (MVP)

#### User Profiles
- Simple login (name + optional photo, no password hassle)
- Or: magic link via email
- Profile shows: name, photo, recipes created, favorites

#### Create Own Recipes
- Add recipe with:
  - 📸 Photo (from camera or gallery)
  - 📝 Title & description
  - 🥗 Ingredients list
  - 👨‍🍳 Steps (optional for shakes)
  - 🏷️ Category (shake/soep/groente)
- Auto-calculate nutrition (API or manual input)
- Save as draft or publish

#### Share & Discover
- See recipes from people in your circle
- Simple feed: "Nieuwste recepten"
- Filter by person or category

#### Interact
- ❤️ Like/heart a recipe
- 💬 Leave a comment/tip
- 📸 "Ik heb dit gemaakt" - upload result photo

---

### Phase 2: Groups & Activity

#### Private Groups (Circles)
- Create a group: "Kookclub Truus"
- Invite via link or email
- Only group members see group recipes
- Group shopping list (collaborative)

#### Activity Feed
- "Truus heeft Tomatensoep toegevoegd"
- "Annie gaf ⭐⭐⭐⭐⭐ aan Broccolisoep"
- "Marie heeft Banaan Shake gemaakt" + photo

#### Recipe Variations
- "Ik maakte dit met..." 
- Track variations as linked recipes
- See what others changed

---

### Phase 3: Smart Features

#### AI Recipe Suggestions
- Based on favorites
- Based on available ingredients
- Based on nutritional goals

#### Meal Planning
- Weekly menu (drag & drop)
- Share meal plan with family
- Auto-generate shopping list

#### Nutrition Tracking
- Daily/weekly protein intake
- Calorie goals
- Visual progress

---

## Technical Considerations

### Backend Options

| Option | Pros | Cons |
|--------|------|------|
| **Supabase** | Free tier, auth built-in, realtime | Vendor lock-in |
| **Firebase** | Mature, good for mobile | Google dependency |
| **PocketBase** | Self-hosted, simple | Need to host yourself |
| **Appwrite** | Open source, self-hosted option | Less mature |

**Recommendation:** Supabase for MVP - free tier sufficient, easy auth, realtime updates for social features.

### Data Model (Draft)

```
users
  - id
  - name
  - avatar_url
  - created_at

recipes
  - id
  - user_id (creator)
  - title
  - description
  - image_url
  - category (shake/soep/groente)
  - ingredients (json)
  - steps (json)
  - calories
  - protein
  - is_public
  - created_at

circles (groups)
  - id
  - name
  - created_by
  - invite_code

circle_members
  - circle_id
  - user_id
  - role (admin/member)

likes
  - user_id
  - recipe_id

comments
  - id
  - user_id
  - recipe_id
  - text
  - image_url (optional "I made this" photo)
  - created_at

activity_feed
  - id
  - user_id
  - action_type (created_recipe, liked, commented, made_recipe)
  - recipe_id
  - created_at
```

### Image Storage
- Supabase Storage or Cloudflare R2
- Compress on upload (client-side)
- Thumbnail generation

---

## UX Considerations for Older Users

### Must Have
- ✅ Large buttons (min 48px touch targets)
- ✅ High contrast text
- ✅ Simple navigation (max 2 taps to any feature)
- ✅ Clear feedback (loading states, success messages)
- ✅ No complex gestures (swipe, long-press)

### Login Flow
- Magic link via email (no password to remember)
- Or: stay logged in forever on device
- Or: simple PIN code

### Onboarding
- "Welkom [naam]!"
- Quick tour: "Hier zie je recepten" → "Hier maak je een recept"
- Skip option

---

## MVP Scope (First Release)

**Include:**
- [ ] User profiles (name + photo)
- [ ] Create own recipes
- [ ] View all recipes (yours + shared)
- [ ] Like recipes
- [ ] Comment on recipes

**Exclude (for now):**
- Groups/circles
- Activity feed
- Meal planning
- AI features
- Nutrition tracking

---

## Timeline Estimate

| Phase | Scope | Time |
|-------|-------|------|
| Phase 1 MVP | Profiles, create recipes, like/comment | 2-3 weeks |
| Phase 2 | Groups, activity feed, variations | 2-3 weeks |
| Phase 3 | AI, meal planning, tracking | 4+ weeks |

---

## Open Questions

1. **Authentication:** Magic link vs. simple name entry vs. PIN?
2. **Privacy:** Default public or private recipes?
3. **Moderation:** Needed for small friend groups?
4. **Offline:** How to handle offline recipe creation?
5. **Migration:** How to move current static recipes to database?

---

## Next Steps

1. Validate MVP scope with mom and potential users
2. Set up Supabase project
3. Design database schema
4. Build auth flow
5. Add "create recipe" form
6. Add social features (like, comment)

---

*Last updated: January 2025*
