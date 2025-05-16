```
inventory-optimizer/
│
├── client/                     # Frontend (Next.js)
│   ├── public/                 # Static files
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Routes (Next.js pages)
│   │   ├── index.tsx
│   │   ├── dashboard.tsx       # Visualization + Insights
│   │   ├── login.tsx
│   │   └── api/                # (Optional) Next.js API routes
│   ├── styles/                 # Global and module CSS
│   ├── utils/                  # Helper functions (e.g., API fetchers)
│   └── package.json
│
├── server/                     # Backend (Express.js)
│   ├── controllers/            # Route handlers
│   ├── routes/                 # Express routes
│   ├── middleware/             # JWT auth, validation, etc.
│   ├── services/               # Business logic, DB access
│   ├── db/                     # PostgreSQL setup (knex, sequelize, or raw SQL)
│   ├── cpp-engine/             # C++ optimization engine
│   │   ├── knapsack.cpp
│   │   └── knapsack.exe        # Built binary (used with exec)
│   ├── scripts/                # Scripts to run C++ engine, test data
│   ├── utils/                  # Utility scripts (arg formatters, logger)
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── docs/                       # Documentation
│   └── tech_stack.md
│
├── .gitignore
├── README.md


```
