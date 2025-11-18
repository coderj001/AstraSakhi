# GEMINI.md

## 🧠 Rules for Gemini

1. **Do not run** `npm start` or `npm run dev` — the development server is already running.
2. Always run **`npm run format`** after making code changes.
3. If Gemini makes **major changes**, it must **log them below** under the **Change Log** section.
   - Examples:
     - Renaming files, folders, or components
     - Adding or removing features
     - Updating architecture or design patterns

---

## 🚀 Project: AstroAI

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

### 1. Core Principles

- **Clarity:** Every element should have a clear purpose.
- **Consistency:** Similar components behave and look the same.
- **Simplicity:** Minimize clutter — highlight what’s essential.

---

### 2. Layout & Spacing

- Use a **12-column grid system**.
- Apply **8-point spacing scale** → (4, 8, 16, 24, 32px, etc.).
- Use **whitespace** generously to group or separate elements visually.

---

### 3. Typography

- Max **2 font families**:
  - Suggested: `Inter`, `Manrope`, or system UI font.
- Define **type scale** → (12, 14, 16, 20, 24, 32px).
- Maintain **line-height ≈ 1.5× font-size** for readability.
- Keep **line length between 50–75 characters**.

---

### 5. Components & Interaction States

- Design for all states:
  **default, hover, focus, active, disabled, loading, empty**.
- Provide **instant feedback** → loaders, toasts, validation states.
- Use **headless component libraries** like `shadcn/ui` or `Radix UI` for accessible, reusable components.

---

### 6. Responsiveness

- **Mobile-first** approach.
- Use **fluid units**: `%`, `vw`, `vh` for layouts.
- Define **breakpoints** (`sm`, `md`, `lg`, `xl`) where layout naturally breaks.
- Ensure **touch targets ≥ 44×44px** for mobile usability.

---

## ⚙️ TL;DR Summary

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

## 🧾 Change Log

> Gemini must append all major feature or architecture changes here.
> Use the following format:

```markdown
### [YYYY-MM-DD] <Summary>

- Description: <What was changed>
- Reason: <Why it was changed>
- Impact: <Files, components, or features affected>
```

### [2025-11-07] Added DivyaVaani AI Chat Feature

- Description: Renamed 'AstroMall' to 'DivyaVaani AI' and created a new page at `/divyavaani-ai-chat`. This page displays a list of divine entities that users can select to start a conversation.
- Reason: To implement the new "DivyaVaani AI" feature as requested by the user.
- Impact: `src/data/services.js`, `src/components/Services.jsx`, `src/pages/DivyaVaaniAIChat.jsx`, `src/App.jsx`

### [2025-11-18] Added Proxy Server for API Endpoints

- Description: Created a Node.js proxy server in a new `proxy-server` directory. The proxy server uses Express and CORS to handle API requests, forwarding them to the actual API endpoint and returning the response to the frontend.
- Reason: To provide a dedicated proxy server for API endpoints, enabling the frontend to fetch data from APIs through a controlled and centralized proxy, as requested by the user.
- Impact: `proxy-server/`, `proxy-server/package.json`, `proxy-server/server.js`, `package.json`, `src/pages/DivyaVaaniAIChat.jsx`

### [2025-11-18] Implemented Zodiac Compatibility Feature

- Description: Added a new feature to check zodiac sign compatibility. This involved creating a new proxy endpoint for the compatibility API, centralizing API calls into a dedicated service, and creating separate pages for user input (`Compatibility.jsx`) and results display (`CompatibilityResult.jsx`). The results page shows compatibility percentages and descriptive text.
- Reason: To add the user-requested zodiac compatibility feature, with a robust architecture using a separate results page and a centralized API service.
- Impact: `proxy-server/server.js`, `src/services/api.js`, `src/pages/Compatibility.jsx`, `src/pages/CompatibilityResult.jsx`