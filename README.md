# Article Dashboard App

A responsive Next.js dashboard application featuring:

- A sidebar with navigation and icons
- Paginated and searchable tables for articles and users
- Smooth loading states and active styling
- Built with ShadCN UI, TailwindCSS, and TypeScript

## 🧰 Tech Stack

- [Next.js 13+](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- TypeScript

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/assessment.git
cd assessment
```

### 2. Install dependencies

Make sure you have Node.js v18+ installed.

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

App will be running on [http://localhost:3000](http://localhost:3000)

---

## 📂 Folder Structure (Important Parts)

```
app/
├── page.tsx                 → redirects to /articles
├── articles/page.tsx       → main page with Article table
├── users/page.tsx          → page with User table
components/
├── AppSidebar.tsx          → sidebar layout with navigation
├── UserTable.tsx           → paginated and searchable user table
├── ArticleTable.tsx        → paginated and searchable article table
lib/
├── api.ts                  → functions for fetching articles/users
types/
├── index.ts                → TypeScript types for Article and User
```

---

## 🔍 Features

### ✅ Sidebar

- Contains links to "Articles" and "Users"
- Active route highlighting
- Icons (File for articles, User for users)
- Dark-themed with subtle outlines

### ✅ Articles Page (`/articles`)

- Table displays article `title` and `author`
- Cards clickable — redirect to actual article links
- Searchable and paginated
- Loading state shown while fetching data

### ✅ Users Page (`/users`)

- Table displays user `name`, `about`, `updated_at`
- Search, pagination, sorting by date supported


---

## 🧑‍💻 Author

Made by Darwin Reigh Calub

