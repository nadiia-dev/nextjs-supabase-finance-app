# 💸 Personal Finance Tracker

A full-stack personal finance application built with **Next.js 14**, **Supabase** and **Tailwind CSS**. This app allows users to manage their income and expenses efficiently, providing features like authentication, transaction management, and responsive design.

---

## 🚀 Features

- **User Authentication**: Secure sign-up and login functionality powered by Supabase Auth.
- **Transaction Management**: Create, edit, and delete income and expense records.
- **Responsive UI**: Clean and responsive design using Tailwind CSS.
- **Form Validation**: Robust form validation implemented with Zod.
- **Protected Routes**: Middleware ensures only authenticated users can access the dashboard.
- **Server Actions**: Utilizes Next.js server actions for efficient form handling.

---

## 🧰 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Backend as a Service**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Validation**: [Zod](https://zod.dev/)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [Supabase Account](https://supabase.com/)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/nadiia-dev/nextjs-supabase-finance-app.git
cd nextjs-supabase-finance-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a .env.local file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE=your-supabase-service-role
```

4. **Run the development server:**

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see the application.
