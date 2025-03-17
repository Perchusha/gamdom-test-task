# Online Betting Dashboard - Frontend

---

## Installation

1. Install dependencies:
   ```sh
   yarn install
   ```

## Available Scripts

### Development Mode
```sh
yarn start
```
Runs the frontend in development mode using Vite.

### Build for Production
```sh
yarn build
```
Compiles the project and outputs the production-ready files in the `dist/` directory.

### Preview Production Build
```sh
yarn preview
```
Starts a local server to serve the built application on port 5173.

## Running in Docker
To build and run the frontend using Docker:
```sh
docker build -t frontend .
docker run -p 5173:5173 frontend
```

Ensure the backend is running separately to connect to the API.

---
