# Online Betting Dashboard - Frontend

---

## Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Perchusha/gamdom-test-task.git
cd gamdom-test-task/apps/frontend
```

### 2️⃣ Install dependencies
```sh
yarn install
```

### 3️⃣ Create `.env` file
Create a `.env` file in the `apps/frontend` directory:
```sh
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Start the development server
```sh
yarn dev
```
Now the app should be available at **`http://localhost:5173`**.

---

## 🌜 Available Scripts
| Command | Description |
|---------|-------------|
| `yarn dev` | Start the development server |
| `yarn build` | Build the project for production |
| `yarn preview` | Preview the production build |
| `yarn lint` | Run ESLint to check for code issues |

---

## 🛠️ Deployment
To build the frontend for production, run:
```sh
yarn build
```
The build files will be available in the `dist/` folder.

---

## 📌 Notes
- Make sure you are using **node version 20**
- Make sure the **backend is running** at `http://localhost:5000`
- You need to be **logged in** to place bets
- Events and bets update in **real-time**
