# Online Betting Dashboard

---

## **Requirements**
- Docker & Docker Compose installed
- Node.js (v20) and Yarn (v1.22.22) for local development

---

## **Running with Docker (Recommended)**
This will start the backend, frontend, and PostgreSQL database.

1. **Clone the repository**
   ```sh
   git clone https://github.com/Perchusha/gamdom-test-task.git
   cd gamdom-test-task
   ```

2. **Start all services**
   ```sh
   docker-compose up --build -d
   ```
   This will build and start:
    - Backend (`http://localhost:5000`)
    - Frontend (`http://localhost:5173`)
    - PostgreSQL (`localhost:5432`)

3. **Check running containers**
   ```sh
   docker ps
   ```

4. **Run database seed (optional)**
   ```sh
   docker exec -it betting_backend yarn seed
   ```

5. **Stop all containers**
   ```sh
   docker-compose down
   ```

---

## **Running Locally (Without Docker)**
This requires a running PostgreSQL instance.

1. **Install dependencies**
   ```sh
   yarn install
   ```

2. **Start the backend**
   ```sh
   yarn workspace @gamdom/backend dev
   ```

3. **Start the frontend**
   ```sh
   yarn workspace @gamdom/frontend start
   ```

4. **Run database seed**
   ```sh
   yarn workspace @gamdom/backend seed
   ```

5. **Stop services**  
   Press `Ctrl + C` in each terminal.

---

## **Logs & Debugging**
- View logs of a running container:
  ```sh
  docker logs -f betting_backend
  ```
- Check running processes:
  ```sh
  docker ps
  ```

