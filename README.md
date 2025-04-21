# RestCountries Frontend

React application (bootstrapped with Create React App) for consuming the RestCountries backend.  
Supports user authentication (JWT), per‑user API key management, admin views, and country lookups.

---

## Features

- **Authentication**
    - Register / Login / Logout
    - JWT stored in `localStorage` and attached to all API calls
- **Dashboard (User)**
    - View your profile
    - Generate / list / activate / delete your API keys
    - Select one API key for country lookups
- **Admin Dashboard** (role `admin`)
    - View / change / delete all users
    - View / activate / delete all API keys
    - See usage counts & last‑used timestamps
- **Country Lookup**
    - Browse all countries (flag, name, capital)
    - Search by name
    - View detailed country info (currencies, languages, flag)
    - All `/countries` calls require a valid `x‑api‑key` header
- **Theming**
    - Material‑UI (MUI) with a custom dark‑blue primary theme
    - Global CSS reset via `<CssBaseline />`

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)

---

## Prerequisites

- Node.js 14+
- npm or yarn
- (optional) Docker & Docker Compose

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/w1867422-Advanced-Server-Side/w1867422-rest-countries-frontend.git
   cd w1867422-rest-countries-frontend
   
2. **Install Dependencies**
    ```bash
   npm install
   
3. **Run in Development**
    ```bash
   npm start

  Opens at http://localhost:5000.

