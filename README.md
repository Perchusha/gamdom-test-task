# Online Betting Dashboard

---

## Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Perchusha/gamdom-test-task.git
cd gamdom-test-task
```

### 2️⃣ Install dependencies (for all workspaces)
```sh
yarn install
```

### 3️⃣ Start the development environment
Run both frontend and backend concurrently:
```sh
yarn dev
```
This will start:
- **Frontend** at `http://localhost:5173`
- **Backend** at `http://localhost:5000`

---

## Project Structure
```
/
├── apps/
│   ├── backend/   # Backend (Express + TypeORM + PostgreSQL)
│   ├── frontend/  # Frontend (React + Vite + MobX + MUI)
├── package.json   # Monorepo config with Yarn workspaces
├── .prettierrc    # Code formatting rules
└── README.md      # This file
```

---

## 📌 Notes
- This project uses **Yarn workspaces** to manage dependencies efficiently.
- Backend and frontend can be developed separately or together.
- Uses **Prettier** for consistent code formatting (`yarn lint`).
- Ensure **Docker is installed** if running PostgreSQL via Docker.

