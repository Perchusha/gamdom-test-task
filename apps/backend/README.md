# Online Betting Dashboard - Backend

---

## Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Perchusha/gamdom-test-task.git
cd gamdom-test-task/apps/backend
```

### 2️⃣ Install dependencies
```sh
yarn install
```

### 3️⃣ Create `.env` file
Create a `.env` file in `apps/backend`:
```sh
PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=betting_db
JWT_SECRET=supersecretkey
```

### 4️⃣ Run with Docker
The backend is configured to run with **Docker Compose**.
```sh
docker-compose up --build -d
```
This will start **PostgreSQL + backend server**.

---

## 🌜 Available Scripts
| Command | Description |
|---------|-------------|
| `yarn dev` | Start the server with `nodemon` |
| `yarn start` | Start the production server |
| `yarn seed` | Seed the database with test data |

---

## 🛠️ Deployment
To deploy in production:
```sh
yarn build
```
The compiled files will be available in `dist/`.

For production with Docker:
```sh
docker-compose -f docker-compose.prod.yml up --build -d
```

---

## 📌 Notes
- Make sure you are using **node version 20**
- Ensure **PostgreSQL** is running before starting the backend.
- API requires authentication for most routes (`Authorization: Bearer <token>`).
- Events and bets update in **real-time** via `Socket.io`.


