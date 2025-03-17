# Online Betting Dashboard

This is a full-stack online betting application with a **React** frontend, **NestJS (Express)** backend, and **PostgreSQL** database. The project is containerized using **Docker** for easy deployment and local development.

---

## **Prerequisites**
Before running the project, ensure you have the following installed:
- **Docker & Docker Compose**
- **Node.js v20+** and **Yarn v1.22.22** (for local development without Docker)

---

## **Running with Docker (Recommended)**
Using Docker is the easiest way to set up the project.

### **1. Clone the Repository**
```sh
git clone https://github.com/Perchusha/gamdom-test-task.git
cd gamdom-test-task
```

### **2. Start All Services**
```sh
docker-compose up --build -d
```
This will start:
- **Backend** (`http://localhost:5000`)
- **Frontend** (`http://localhost:5173`)
- **PostgreSQL Database** (`localhost:5432`)

### **3. Check Running Containers**
```sh
docker ps
```

### **4. Run Database Seed (Optional)**
```sh
docker exec -it betting_backend yarn seed
```

### **5. Stop All Containers**
```sh
docker-compose down
```

---

## **Running Locally (Without Docker)**
If you prefer to run the project manually, follow these steps:

### **1. Install Dependencies**
```sh
yarn install
```

### **2. Start Backend**
```sh
yarn workspace @gamdom/backend dev
```

### **3. Start Frontend**
```sh
yarn workspace @gamdom/frontend start
```

### **4. Run Database Seed**
```sh
yarn workspace @gamdom/backend seed
```

### **5. Stop Services**
Press `Ctrl + C` in each terminal to stop the running services.

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

## Postman Collection
A **Postman collection** is included for easy API testing.

- **Import Collection**:  
  Open **Postman**, go to **File → Import**, and select [`postman_collection.json`](postman/postman_collection.json).

- **Setup Environment**:  
  Use the [`postman_environment.json`](postman/postman_environment.json) file or manually configure environment variables inside Postman.

- **Run Requests**:  
  Once imported, you can test endpoints directly from Postman.
