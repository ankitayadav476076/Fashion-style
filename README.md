# MaisonAI — AI-Powered Fashion Concierge & Atelier

MaisonAI is a luxury personal styling web application powered by AI. It analyzes clothing images, offers customized occasion styling recommendations, and hosts a digital wardrobe closet for users.

## Features

1. **Vision Analysis**: Upload outfit photos and receive premium critiques based on undertones, colors, mood, occasion, and weather.
2. **AI Stylist Concierge**: Chat dynamically with an AI stylist to request recommendations, color combinations, and wardrobe advice.
3. **Digital Wardrobe**: Categorize and save outfits (Tops, Bottoms, Shoes, Accessories, Jackets) securely in a MongoDB cloud/local database.
4. **Secure Authentication**: Traditional Sign Up/Login with hashed passwords (bcryptjs), secure session tokens (JWT), and Google OAuth integration.

---

## Tech Stack

- **Frontend**: React (v19), React Router (v7), Vite, TailwindCSS (v4), React Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Passport.js (Google OAuth), JWT, bcryptjs, OpenAI Node SDK.

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

### 2. Environment Variables

Create environment configuration files for both frontend and backend.

#### Frontend configuration
In the root directory, create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

#### Backend configuration
In the `backend/` directory, create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/maisonai
SESSION_SECRET=supersecretkeyformaisonai
OPENAI_API_KEY=your_openai_api_key  # Optional: app runs in demo/mock mode if left empty
GOOGLE_CLIENT_ID=your_google_client_id  # Optional: for Google login
GOOGLE_CLIENT_SECRET=your_google_client_secret  # Optional: for Google login
CLIENT_URL=http://localhost:5173
```

---

## Running the Application

### Start the Backend Server
In the `backend` directory, run:
```bash
npm install
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000).

### Start the Frontend Dev Server
In the root directory, run:
```bash
npm install
npm run dev
```
The client will start on [http://localhost:5173](http://localhost:5173).
