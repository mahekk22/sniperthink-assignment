# SniperThink – Interactive Strategy Flow Section

This project is the implementation of an interactive scroll-based strategy storytelling section built as part of the SniperThink assignment.

The goal was to create a production-ready, animated, and engaging UI section that explains how SniperThink works, while integrating backend functionality for user interaction.

---

## 🚀 Tech Stack

### Frontend
- React (Functional Components + Hooks)
- Vite
- Framer Motion
- Modern ES6+ JavaScript

### Backend
- Node.js
- Express
- REST API

---

## 🎯 Project Objective

Build an interactive strategy flow section that:

- Explains SniperThink’s 4-step methodology
- Uses scroll-based storytelling
- Includes smooth, engaging animations
- Dynamically renders steps from structured data
- Integrates with a backend API for user interest submission

---

##  Features

### 1️⃣ Interactive Strategy Flow
- Four dynamic strategy steps
- Scroll-triggered animations
- Unique animation per step
- Visual progress indicator
- Scroll-progress responsive interaction

### 2️⃣ Dynamic Rendering
- Steps rendered from structured data
- No hardcoded JSX content
- Scalable and maintainable architecture

### 3️⃣ Backend Integration
- `POST /api/interest`
- Sends:
  - Name
  - Email
  - Selected step
- Loading state handling
- Success & error feedback
- Proper async handling

### 4️⃣ Clean Architecture
- Reusable components
- Separated service layer for API calls
- Custom hooks for scroll progress
- Organized folder structure
- Environment-based configuration

---

## Folder Structure
sniperthink-assignment/
│
├── frontend/
│ ├── components/
│ ├── hooks/
│ ├── services/
│ ├── data/
│ └── styles/
│
├── backend/
│ ├── routes/
│ └── server.js
│
└── README.md
