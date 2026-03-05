# React + Node.js Login Application

## Description

This project was built as part of a **Full-Stack Developer Technical Test**.
It is a simple login application using **React (frontend)** and **Node.js with Express (backend)**.

The application validates user credentials through an API and redirects the user to a Welcome page after successful login.

---

## Technologies Used

**Frontend**

- React (Vite)
- React Hooks
- Axios
- React Router

**Backend**

- Node.js
- Express.js
- CORS

---

## Features

- Login page with username and password
- Backend API for login validation
- Redirect to Welcome page on successful login
- Error message for invalid credentials
- Username remembered using localStorage

---

## Test Credentials

```
Username: admin
Password: admin
```

---

## Running the Project

### Start Backend

```
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:8000
```

---

### Start Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoint

```
POST /login
```

Response:

- **200** → Login successful
- **401** → Invalid credentials

---

## Submission

**GitHub Repository:**
[(Github Link)](https://github.com/musharraf10/OMNITAAS_ASSESSMENT)

**Screen Recording:**
(Add video link)
