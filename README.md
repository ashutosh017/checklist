# ⚡️ Checklist: The Developer's Habit Architect

A high-performance, minimalist habit tracking application designed specifically for developers. Build precision routines for **Dev**, **CS**, and **DSA** with a focus on consistency and speed.

![Checklist Dashboard](https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2000)

## 🚀 What is Checklist?

Checklist is more than a simple to-do app; it's a **Protocol Architect**. It allows you to:
- **Design Habit Protocols**: Create custom 4-column templates (initially Days, Dev, CS, and DSA) with full flexibility to add/remove nodes.
- **Track with Precision**: Log your daily progress across multiple categories in a sleek, IDE-inspired grid.
- **Time-Based Scheduling**: Select a deployment (start) date, and the system automatically maps out your entire routine with real dates.
- **Public Share Nodes**: Generate "Notion-style" public, read-only links to share your consistency with the community.
- **Multi-Auth Support**: Securely sign in via **GitHub** or **Google** with automatic account linking.

## 🛠 Tech Stack

Built with a modern, high-performance stack for a seamless developer experience:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Runtime**: [Bun](https://bun.sh/) (The ultra-fast JS runtime)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Authentication**: [Auth.js (NextAuth)](https://next-auth.js.org/) with Prisma Adapter
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Theme Engine**: [Next-Themes](https://github.com/pacocoursey/next-themes) (Custom "True Black" & "Soft Light" modes)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🎨 Aesthetic: "The Dark Room"

The UI is designed for focus, utilizing a **True Black (#000000)** foundation in dark mode.
- **Glassmorphism**: Subtle `backdrop-blur` effects on navbars and headers.
- **Zinc Palette**: Professional Zinc-based grays for structured depth.
- **Indigo Glow**: High-saturation accents for interactive feedback and primary actions.

## 🏁 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed locally.
- A running [PostgreSQL](https://www.postgresql.org/) instance.
- GitHub/Google OAuth credentials.

### 1. Initialize the Lab
```bash
# Install dependencies
bun install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and provide your credentials:
```bash
cp .env.example .env
```

### 3. Deploy the Schema
```bash
# Push the Prisma schema to your DB
bunx prisma db push
```

### 4. Ignite
```bash
# Start the development server
bun dev
```

## 🏗 Project Structure

```text
src/
├── app/                  # Next.js App Router
│   ├── api/              # Auth & Template API Routes
│   ├── auth/             # Custom "True Black" Sign-in Page
│   ├── dashboard/        # Private Protocol Management
│   ├── t/[token]/        # Public Share Nodes
│   └── templates/        # Protocol Architect (New/Edit)
├── components/           # Atomic UI Components
└── lib/                  # Shared Utilities (Prisma Client, etc.)
prisma/
└── schema.prisma         # Core Data Models
```

## 📜 License
Built for builders. (ISC License)
