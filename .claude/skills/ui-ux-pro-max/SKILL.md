# Skill: UI/UX Pro Max — Design Intelligence

**Version:** 2.5.0 | **Source:** nextlevelbuilder/ui-ux-pro-max-skill | **License:** MIT

AI-powered design intelligence. 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types across 16 stacks.

---

## Triggers (auto-activate)

**Must use for:**
- New page / component / UI design
- Design system decisions (colors, typography, spacing)
- UX audits, accessibility reviews
- Navigation, animation, responsive behavior
- "Build a landing page", "Create a dashboard", "Design a modal", etc.

**Skip for:** backend logic, APIs, databases, infrastructure, non-visual tasks.

---

## Workflow (4 steps)

### Step 1 — Analyze Requirements
Extract from user request:
- **Product type** (SaaS, e-commerce, healthcare, gaming…)
- **Target audience** (B2B, B2C, mobile-first…)
- **Style keywords** (minimal, vibrant, dark, corporate…)
- **Tech stack** (React, Next.js, Vue, Tailwind, Flutter…)

### Step 2 — Generate Design System
Apply the 161-rule reasoning engine (see UI Reasoning table below). Output:
- Pattern recommendation
- Color palette
- Typography pairing
- Key effects & animations
- Anti-patterns to avoid

### Step 3 — Implement
Apply stack-specific guidelines. Use the correct tokens, spacing rhythm (4/8dp), and component patterns.

### Step 4 — Pre-delivery Checklist
- [ ] Contrast ≥4.5:1 for body text, ≥3:1 for large text
- [ ] Touch targets ≥44×44px
- [ ] No emoji as UI icons (use Phosphor, Heroicons, Lucide)
- [ ] Mobile-first responsive
- [ ] Reduced-motion support (`@media (prefers-reduced-motion)`)
- [ ] Dark mode tokens defined
- [ ] No horizontal scroll on mobile
- [ ] Focus states visible
- [ ] Form labels visible (not just placeholder)
- [ ] Error messages below the field

---

## 161 UI Reasoning Rules (selection — key categories)

| Category | Pattern | Style | Colors | Typography | Anti-patterns |
|----------|---------|-------|--------|------------|---------------|
| SaaS (General) | Hero + Features + CTA | Glassmorphism + Flat | Trust blue + Accent | Professional + Hierarchy | Excessive animation |
| Micro SaaS | Hero-Centric + Trust | Motion-Driven + Vibrant | Bold primaries + Contrast | Modern + Energetic | Static + No video + Poor mobile |
| E-commerce | Product Grid + Filter | Clean + Card-based | Action orange + Trust green | Clear hierarchy | Cluttered layout |
| Healthcare App | Dashboard + Trust signals | Minimal + Clinical | Cyan #0891B2 + Green #059669 | Clean + Accessible | Playful fonts |
| Gaming Platform | Immersive + Dark | Neon + Glassmorphism | Purple #7C3AED + Rose #F43F5E | Bold + Display | Light mode default |
| AI/Chatbot | Conversational + Feature | Modern + Glassmorphism | Purple #7C3AED + Cyan #0891B2 | Mono accents + Sans | Overloaded UI |
| FinTech / Banking | Dashboard + Data-rich | Clean + Trust | Navy + Accent green | Tabular numerals | Decorative shadows |
| EdTech | Course layout + Progress | Friendly + Modern | Blue + Accent yellow | Readable + Warm | Dense information |
| Dashboard / Admin | Data grid + Sidebar | Compact + Dense | Neutral + Status colors | Mono + Sans | Card overload |
| Landing Page | Hero + Social proof + CTA | Conversion-focused | Brand primary + CTA contrast | Hierarchy H1→body | Too many CTAs |
| Mobile App (iOS) | Tab bar + Card | Native iOS patterns | System colors | SF Pro | Breaking HIG |
| Mobile App (Android) | Bottom nav + FAB | Material You MD3 | Dynamic color | Roboto / Google Sans | Breaking Material |
| Developer Tool | Code-focused + Dark | Dark + Minimal | #0F172A bg + Accent | JetBrains Mono + Sans | Light mode default |
| Marketplace | Browse + Filter + Card | Grid-based | Trust blue + CTA orange | Clear labels | Ambiguous actions |
| Social Media | Feed + Profile + Stories | Vibrant + Expressive | Brand accent + Neutral | Modern sans | Dense walls of text |
| Portfolio | Showcase + Hero | Elegant + Minimal | Monochromatic + Accent | Editorial serif | Too many projects |
| Web3 / DeFi | Dashboard + Wallet | Dark + Neon | Dark bg + Neon accent | Space Grotesk + Mono | Cluttered charts |
| Restaurant | Menu + Gallery | Warm + Inviting | Warm neutrals + Accent | Serif + Clean sans | Poor food photography |
| Real Estate | Property grid + Map | Clean + Professional | Navy + Warm white | Readable + Trust | Cluttered listings |
| 3D / Three.js | Immersive + Interactive | Futuristic + Dark | Dark space + Gold/Cyan | Clean overlay fonts | Heavy on low-end devices |

*For all 161 categories: apply the closest matching pattern + adapt colors to brand.*

---

## Color Palettes — Key Mappings

### By Product Type
```
SaaS General:      Primary #2563EB  | Accent #EA580C  | Bg #FFFFFF
E-commerce:        Primary #059669  | Accent #F97316  | Bg #FAFAFA
Healthcare:        Primary #0891B2  | Accent #059669  | Bg #F0FDFA
Gaming:            Primary #7C3AED  | Accent #F43F5E  | Bg #0F0F1A
AI Platform:       Primary #7C3AED  | Accent #0891B2  | Bg #F8F9FF
FinTech:           Primary #1E3A5F  | Accent #10B981  | Bg #F8FAFC
Social:            Primary #E11D48  | Accent #EC4899  | Bg #FFFFFF
Developer Tool:    Primary #6366F1  | Accent #06B6D4  | Bg #020617
Web3/DeFi:         Primary #7C3AED  | Accent #F59E0B  | Bg #030712
Dashboard:         Primary #3B82F6  | Accent #8B5CF6  | Bg #F1F5F9
EdTech:            Primary #2563EB  | Accent #F59E0B  | Bg #FEFCE8
```

### Color Rules
- Trust → Blue (#2563EB, #1E40AF)
- Action → Orange (#EA580C, #F97316)
- Health → Green (#059669, #10B981)
- Creative → Purple (#7C3AED, #6366F1)
- Finance → Navy + Green accent
- Dark mode bg: #020617, #0F172A, #09090B
- Always check WCAG: foreground/background ≥4.5:1

---

## Font Pairings — 57 Curated (selection)

| # | Name | Heading | Body | Best For |
|---|------|---------|------|----------|
| 1 | Classic Professional | Playfair Display | Source Sans 3 | Corporate, editorial |
| 2 | Modern SaaS | Inter | Inter | SaaS, dashboards |
| 3 | Tech Dark | Space Grotesk | JetBrains Mono | Dev tools, Web3 |
| 4 | Friendly App | Nunito | DM Sans | EdTech, consumer app |
| 5 | Editorial Luxury | Cormorant Garamond | Lato | Portfolio, luxury brand |
| 6 | Healthcare Trust | Lato | Open Sans | Medical, clinic |
| 7 | Gaming Bold | Orbitron | Rajdhani | Gaming, esports |
| 8 | Fintech Precise | IBM Plex Sans | IBM Plex Mono | Finance, data |
| 9 | Restaurant Warm | Playfair Display | Lato | Food, hospitality |
| 10 | Material You | Google Sans | Roboto | Android apps |
| 11 | iOS Native | SF Pro Display | SF Pro Text | iOS apps |
| 12 | Minimal Mono | Geist | Geist Mono | Developer, minimal |

**CSS Import pattern:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```
**Tailwind config:**
```js
fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
```

---

## 99 UX Guidelines — Priority Rules

### CRITICAL (Always apply)
```
✅ Color contrast ≥4.5:1 body, ≥3:1 large text (WCAG AA)
✅ Touch targets ≥44×44px (iOS HIG) / ≥48×48dp (Material)
✅ Keyboard navigation fully functional
✅ Focus states visible (outline or box-shadow)
✅ Alt text on all meaningful images
✅ No color as the ONLY differentiator
✅ Form errors below the field, not just color
✅ Loading states for async actions (>100ms)
✅ Empty states designed (not just blank)
```

### HIGH (Strong recommendation)
```
⚡ Mobile-first responsive (320px minimum)
⚡ No horizontal scroll on mobile
⚡ Bottom nav ≤5 items
⚡ Deep linking support
⚡ Respect system gestures (iOS back swipe)
⚡ Image optimization (WebP, lazy load)
⚡ Layout stability (reserve space for async content)
⚡ Reduce motion: @media (prefers-reduced-motion: reduce)
⚡ Progressive disclosure (don't show everything at once)
⚡ Consistent spacing rhythm: 4/8dp increments
```

### MEDIUM (Apply when relevant)
```
💡 Animation duration 150–300ms (easeOut for appear, easeIn for dismiss)
💡 Type scale: 12/14/16/18/24/32/48px
💡 Line-height: 1.4–1.6 for body, 1.1–1.2 for headings
💡 Semantic color tokens (not raw hex in components)
💡 Visible labels (placeholders ≠ labels)
💡 Skeleton screens > spinner for known content
💡 Infinite scroll: provide scroll position restoration
💡 Dark mode: use CSS variables, not duplicate classes
```

---

## Stack Implementation Guidelines

### React / Next.js
```
- Tailwind CSS: spacing-4 = 1rem, use rem not px
- shadcn/ui: prefer Radix-based components for accessibility
- State: useState for local UI, Zustand/Jotai for global
- Images: next/image for automatic optimization
- Fonts: next/font for zero layout shift
- Icons: lucide-react (not emoji)
```

### Vue / Nuxt
```
- Tailwind or UnoCSS
- Headless UI or Radix Vue for accessible components
- Pinia for state
- VueUse for composables (useMediaQuery for responsive)
```

### Flutter
```
- ThemeData + ColorScheme.fromSeed()
- Material 3 (useMaterial3: true)
- Minimum touch target: 48×48dp (use InkWell with constraints)
- Use adaptive_theme for dark mode
```

### SwiftUI
```
- SF Symbols (not emoji, not custom icons)
- .safeAreaInset for bottom content
- @Environment(\.colorScheme) for dark mode
- GeometryReader sparingly (causes layout issues)
```

### Three.js (EducXP Campus)
```
- Dark background: #04060C
- Gold accent: #F59E0B with emissive glow
- Cyan accent: #18D4F0
- GLSL shaders: time uniform for animation
- AdditiveBlending for glow/particle effects
- Spring physics for camera (not direct lerp)
- GPU budget: <500k triangles per scene
```

---

## 25 Chart Types — Selection Guide

| Chart | Best For | Avoid When |
|-------|----------|------------|
| Bar (vertical) | Comparison across categories | >12 categories |
| Bar (horizontal) | Long category names | Time series |
| Line | Time series, trends | Non-continuous data |
| Area | Volume over time | Multiple overlapping series |
| Pie / Donut | Part-of-whole (≤6 items) | Many slices |
| Scatter | Correlation, distributions | Casual audience |
| Heatmap | Density, calendar data | Single metric |
| Funnel | Conversion steps | Non-sequential data |
| Gauge | Single KPI vs target | Multiple metrics |
| Sparkline | Trend at a glance (in tables) | Detailed analysis |

**Chart rules:**
- Always include axis labels and units
- Colorblind-safe palettes (avoid red+green as only diff)
- Legends: position right or top, not bottom if space-critical
- Tooltips on hover (not always-visible labels for dense data)
- Responsive: recharts/victory for React, Chart.js for vanilla

---

## Design System Output Template

When generating a design system, output this structure:

```markdown
## Design System — [Project Name]

### Pattern
[Recommended layout pattern and why]

### Colors
Primary: #XXXXXX
Secondary: #XXXXXX
Accent: #XXXXXX
Background: #XXXXXX
Foreground: #XXXXXX
Muted: #XXXXXX
Border: #XXXXXX
Destructive: #XXXXXX

### Typography
Heading: [Font] — [weights]
Body: [Font] — [weights]
Mono: [Font] (if needed)
Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48

### Effects
[Hover, shadows, animations with specific values]

### Anti-patterns (avoid)
[Specific things NOT to do for this product type]

### Stack Config
[CSS variables, Tailwind theme, or framework-specific tokens]
```

---

## Professional Rules (Non-negotiable)

```
❌ NEVER use emoji as UI controls or icons → use Phosphor, Lucide, Heroicons
❌ NEVER hardcode colors in components → use CSS variables or design tokens
❌ NEVER use px for font-size at root level → use rem
❌ NEVER skip the empty state
❌ NEVER use placeholder as the only label
❌ NEVER animate opacity+transform together without will-change
❌ NEVER put 5+ items in bottom navigation
❌ NEVER use horizontal scroll on mobile (except carousels)
```
