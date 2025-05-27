# Inventory Optimizer 🚀

An advanced inventory management system integrated with a dynamic programming-based optimization engine (0/1 and fractional knapsack) for academic and practical use.

Built with **Next.js** for the frontend and **Express.js + C++** for the backend optimization logic, this project helps simulate and visualize item selection under constraints like weight, volume, priority, and fragility.

---

## 🗂️ File Structure

```

inventory-optimizer/
│
├── client/                     # Frontend (Next.js)
│   ├── public/                 # Static files (avatars, report, etc.)
│   ├── app/                    # App router (Next.js 13+)
│   │   ├── about               # About the project
│   │   │   └── About.jsx
│   │   │   └── AnimatedTooltip.jsx
│   │   ├── dashboard/          # Main Dashboard view
│   │   │   └── Dashboard.jsx
│   │   └── page.jsx            # Landing page "/"
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── styles/                 # Global CSS
│   ├── utils/                  # Helpers (API, formatters)
│   └── package.json
│
├── server/                     # Backend (Express.js)
│   ├── controllers/            # Route handlers
│   ├── routes/
│   │   └── optimisation.js     # API routes for optimization
│   ├── middleware/             # JWT, validation
│   ├── services/               # Business logic, DB access
│   ├── db/                     # SQLite files
│   ├── engine/             # C++ optimization logic
│   │   ├── zeroOneKnapsack.cpp
│   │   ├── fractionalKnapsack.cpp
│   │   ├── zeroOneKnapsack.exe
│   │   └── fractionalKnapsack.exe
│   ├── scripts/                # Helper scripts to run/compile
│   ├── utils/                  # Logging, data processing
│   ├── .env                    # Environment variables
│   ├── server.js
│   └── package.json
│
├── docs/                       # Documentation
│   └── tech\_stack.md
│
├── .gitignore
└── README.md

```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-org/inventory-optimizer.git
cd inventory-optimizer
```

---

### 2️⃣ Setup the client (frontend)

```bash
cd client
npm install
npm run dev
```

-   Starts the app at `http://localhost:3000`
-   Built using Next.js 13+ App Router
-   Pages: `/` (Landing), `/about`, `/dashboard`

---

### 3️⃣ Setup the server (backend)

```bash
cd ../server
npm install
node server.js
```

-   Runs the Express backend at `http://localhost:5000`
-   Optimization logic will run the C++ compiled binaries
-   Ensure `.env` file is configured if needed

---

### 4️⃣ Compile the C++ engine

Go to `server/engine`:

#### On **Linux/macOS**:

```bash
g++ zeroOneKnapsack.cpp -o zeroOneKnapsack
g++ fractionalKnapsack.cpp -o fractionalKnapsack
```

#### On **Windows (MinGW)**:

```bash
g++ zeroOneKnapsack.cpp -o zeroOneKnapsack.exe
g++ fractionalKnapsack.cpp -o fractionalKnapsack.exe
```

> ⚠️ Ensure that the output binary names match what the Node.js backend calls using `child_process.exec`.

---

### 5️⃣ Run full stack

With both frontend and backend running:

-   Visit `http://localhost:3000`
-   Go to `/dashboard` to run optimizations
-   Visit `/about` for project background & download report

---

## 📚 Project Features

-   ✨ Dynamic UI with dark gradients and tooltips
-   🧠 Intelligent inventory decisions with fractional or 0/1 knapsack logic
-   📈 Visualized insights and data
-   🔐 Secure backend routing (planned: JWT)
-   📄 Downloadable project report

---

## 📎 Resources

-   GitHub Repo: [Inventory Optimizer](https://github.com/GitShivamNauriyal/Smart-Inventory-Management-System)
-   Tech stack: React, Next.js, TailwindCSS, Express.js, C++, SQLite

---

## 👨‍💻 Author

**Shivam Nauriyal**

📧 Contact: [shivamnauriyal1224@gmail.com](mailto:shivamnauriyal1224@gmail.com)

---

> This project was built as part of a DAA course curriculum (Design and Analysis of Algorithms) with a strong focus on practical application of DP.

```

```
