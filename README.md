# Fullstack Developer Assessment: Mini Webshop

## Overview

Mini Webshop is a small fullstack webshop application with a React frontend and a Spring Boot Java backend exposing a REST API.
This project follows the instructions and implementation requirements described in `TASK.md`.

## Task Breakdown and Secondary Criteria (Bonus)

### Task Breakdown

1. ✅ Create a new public GitHub repository and set up the project structure.
2. ✅ Build a product listing page that fetches and renders products from the backend.
3. ✅ Implement a shopping basket that allows users to add and remove products.
4. ✅ Implement the ability to purchase the items in your basket, this should be done by submitting the purchase to the backend (Logging a line for the purchase in the backend is sufficient).

### Secondary Criteria (Bonus)

1. ✅ **Search or filter** — filter the product list by name or category (filtering logic on the backend).
2. ✅ **Responsive design** — the webshop works well on both desktop and mobile.
3. ✅ **Advanced CSS** — Flexbox, Grid, CSS variables, or a preprocessor like Sass.
4. ✅ **Error handling** — graceful handling of API errors on the frontend.
5. ✅ **Testing** — unit or integration tests on either the backend (JUnit) or frontend (Jest / React Testing Library).

## Architecture

```
mini-webshop/
├── backend/                        # Spring Boot REST API (Java 21)
│   └── src/main/java/nl/webcompany/webshop/
│       ├── config/                 # CORS configuration (WebConfig)
│       ├── controller/             # REST controllers
│       ├── model/                  # Domain models
│       │   └── dto/                # DTOs
│       └── service/                # Business logic
└── frontend/                       # React 19 SPA (TypeScript, Vite)
    └── src/
        ├── api/                    # Fetch wrappers
        ├── components/             # Shared UI components
        ├── hooks/                  # Shared hooks (useDebounce, useAbortableAsync)
        ├── interfaces/             # TypeScript interfaces
        ├── storage/                # localStorage helpers
        └── pages/
            └── ShopPage/           # Page folder
                ├── components/     # Page-specific components
                ├── context/        # Basket state
                └── hooks/          # Page-specific hooks
```

**Backend** - stateless Spring Boot service. Products are loaded from an in-memory `products.json` at startup. Filtering and search run in the service layer. Purchases are validated (very minimally) and logged. They are not persisted.

**Frontend** - single-page React app. Basket state is managed with Context API + `useReducer` and persisted to `localStorage`. 

**Styling** — SCSS Modules for component-level scoping, with a global CSS variable theme (`index.scss`).

## Running locally

### Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 22+ and npm

### 1. Start the backend

```bash
cd backend && ./mvnw spring-boot:run
```

The API will be available at `http://localhost:8090`.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/products` | List all products, supports `?search=` and `?category=` query params |
| `GET` | `/api/products/categories` | List all available product categories |
| `POST` | `/api/purchases` | Submit a purchase order (body: list of `{ productId, quantity }`); returns 201 |

### 2. Start the frontend

```bash
cd frontend && npm install   # first time only
cd frontend && npm run dev
```

The app will be available at `http://localhost:5190`.

## Execute tests

### 1. Backend

```bash
cd backend && ./mvnw test
```

### 2. Frontend

```bash
cd frontend && npm test
```

## Trade-offs and shortcuts

- **No purchase persistence** — purchases are only logged. There is no extensive purchase item validation and no database.
- **ProductCard rendering** - performance could be improved further. See `ProductCard.tsx`
- **Limited test coverage** - backend service/controller tests, Jest unit test for `basketReducer.ts` and component test for `ProductCard.tsx`. There are no end-to-end tests with Playwright or Cypress.


## Challenges

- **Broad scope** - the task has a broad scope: covering architecture, backend APIs, frontend state management, responsive UI, testing, and more.

- **React Context re-rendering** - opening and closing the basket originally caused unnecessary re-rendering. Check commit `perf(frontend): prevent re-renders on basket open/close (62187a0)`

- **ProductCard rendering** - all cards are re-rendered when any basket entry changes. This could be optimized, but the current approach keeps the state model simple and readable.



