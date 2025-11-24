# GEMINI.md

## 🧠 Rules for Gemini

1. **Do not run** `npm start` or `npm run dev` or `npm run proxy-server`- — the development server is already running.
2. Always run **`npm run format`** after making code changes.
3. If Gemini makes **major changes**, it must **log them below** under the **Change Log** section.
   - Examples:
     - Renaming files, folders, or components
     - Adding or removing features
     - Updating architecture or design patterns

---

## 🚀 Project: AstroAI

### File / Folder Conventions

1. `src/pages/\*` — top-level routes / page components (PascalCase).
2. `src/components/\*` — reusable components (PascalCase).
3. `src/hooks/\*` — custom hooks (useCamelCase.js).
4. `src/services/api.js` — centralized client calling proxy endpoints.
5. `proxy-server/server.js` — express proxy endpoints; keep logic simple.

### 🧩 Frontend Architecture

**Framework Stack:**
`Vite + React + TailwindCSS + React Router + React Intl + React Query`

**Purpose:**
Used for **feature-rich, fast, and modular web applications** — ideal for dashboards, internal tools, or complex public web UIs.

**Key Principles:**

- Lightweight and modular structure.
- Component-driven development.
- API data handled via React Query.
- Globalization handled with React Intl.
- Fast builds and HMR (Hot Module Reloading) powered by Vite.

---

## 🎨 Aesthetic & Responsive UI/UX Design Guidelines (Simplified)

- **Clarity:** Every element should have a clear purpose.
- **Consistency:** Similar components behave and look the same.
- **Simplicity:** Minimize clutter — highlight what’s essential.

## ⚙ TL;DR Summary

| Category        | Rule Summary                             |
| --------------- | ---------------------------------------- |
| Layout          | 12-col grid, 8pt spacing                 |
| Typography      | Inter/Manrope, 2 fonts max               |
| Colors          | Primary, Secondary, Neutrals, Semantic   |
| Accessibility   | WCAG AA contrast                         |
| Components      | Define all states + feedback             |
| Responsive      | Mobile-first + fluid units               |
| Change Tracking | Log all major Gemini modifications below |

---

### ️️️Proxy Endpoint Pattern

1. **Endpoint file**: proxy-server/server.js (group endpoints logically with comments).
2. **Keep proxy thin**: validate params → call upstream API → return JSON.
3. Do not embed heavy business logic in proxy.

**Example**:

```
// GET /api/autocomplete?q=kolkata
app.get('/api/autocomplete', async (req, res) => {
const { q } = req.query;
if (!q) return res.status(400).json({ error: 'q required' });
// forward to external API, sanitize and return
});
```

---

## 🧾 Change Log

> Gemini must append all major feature or architecture changes here.
> Use the following format:

```markdown
### [YYYY-MM-DD] <Summary>

- Description: <What was changed>
- Reason: <Why it was changed>
- Impact: <Files, components, or features affected>
```

### 2025-11-07: Added DivyaVaani AI Chat Feature (new page + services + UI)

### 2025-11-18: Added Proxy Server for API Endpoints (new proxy-server dir)

### 2025-11-18: Implemented Zodiac Compatibility Feature (pages + service)

### 2025-11-19: Implemented Autocomplete for Birth Place (hook + component + proxy)

### 2025-11-24: Enhanced Free Kundli Feature (input fix + new endpoints + report section)

- Description: Fixed issue with input fields not accepting input in `FreeKundli.jsx`. Added new Kundli API endpoints (dasha, report, general, yogini-dasha, find-combination) to `proxy-server/server.js` and `src/services/api.js`. Implemented descriptive names for divisional charts and added a 'Free Report' section to `src/pages/FreeKundli.jsx`.
- Reason: To resolve input issues, expand the available astrological data, provide more descriptive information for divisional charts, and offer a dedicated section for detailed Kundli reports.
- Impact: `src/pages/FreeKundli.jsx`, `proxy-server/server.js`, `src/services/api.js`
