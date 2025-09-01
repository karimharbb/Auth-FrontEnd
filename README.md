# React Authentication Demo

This is a small authentication demo I built as part of an interview task.  
The idea is simple: **sign up, sign in, and access a protected page** only if you’re logged in.

---

## What it does

- Let’s you **create an account** (sign up).
- You can **log in** with your account.
- If login is successful, a **JWT access token** is stored in `localStorage`.
- That token is used to check if you’re allowed to see protected pages.
- If you’re not logged in, you get redirected back to the signin page.

Basically—it mimics the core of how most modern apps handle authentication.

---

## Project Structure (at a glance)

# React Authentication Demo

Hey 👋 This is a small authentication demo I built as part of an interview task.  
The idea is simple: **sign up, sign in, and access a protected page** only if you’re logged in.

---

## What it does

- Let’s you **create an account** (sign up).
- You can **log in** with your account.
- If login is successful, a **JWT access token** is stored in `localStorage`.
- That token is used to check if you’re allowed to see protected pages.
- If you’re not logged in, you get redirected back to the signin page.

Basically—it mimics the core of how most modern apps handle authentication.

---

## Tech Choices

I kept it lightweight and modern:

- **React + Vite + TypeScript** → fast, clean setup.
- **React Router v6** → for private/public routes.
- **CSS (Glassmorphism + Man Utd inspired theme)** → just to make it look nice.
- **JWT Authentication** → token-based auth like you’d see in real apps.

---

## Project Structure

src/
├── pages/
│ ├── signup.tsx → Signup page
│ ├── login.tsx → Signin page
│ └── home.tsx → Protected Home page
├── App.tsx → Routing + PrivateRoute logic
├── App.css → Styling
└── main.tsx → Entry point

---

## How to run it

1. Clone this repo:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Install dependencies:

   ```npm install

   ```

3. Start the app:

   ```npm run dev


   ```

4. Visit :

```
http://localhost:5173

```
