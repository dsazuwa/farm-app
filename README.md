# Farm Desk

A farm management application built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

Authentication uses Supabase Auth. A Spring Boot backend is planned for farm operations, with Supabase PostgreSQL as the database.

## Getting started

### Prerequisites

- A Node.js version supported by the project's Vite version
- npm
- A Supabase project

### Install dependencies

From the project root:

```bash
npm install
```

### Configure Supabase

1. Create a project at https://supabase.com/dashboard.
2. Open the project's **Connect** dialog.
3. Copy the **Project URL** and **publishable key**.
4. Copy the environment template:

```bash
cp .env.local.sample .env.local
```

5. Populate `.env.local`:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use the publishable key for the frontend. Never put a Supabase secret key, service-role key, or database password in a `VITE_` environment variable: those variables are exposed to the browser.

The `.env.local.sample` file is tracked as a configuration template. Keep `.env.local` excluded from Git.

### Authentication configuration

In the Supabase dashboard:

- Enable the Email authentication provider.
- Enable email confirmation for new accounts.
- Configure the **Site URL** to match your local frontend URL.
- Add the redirect URLs used by email confirmation and password recovery.

For Vite's default development address, the Site URL is:

```text
http://localhost:5173
```

The password recovery redirect is:

```text
http://localhost:5173/reset
```

Use the actual port shown by Vite if it differs. Redirect URLs must match those used by the authentication service.

The Data API is not required when using Supabase only for authentication and accessing application data through Spring Boot.

### Start development

```bash
npm run dev
```

Open the URL printed in the terminal.

Restart the development server after changing environment variables.

## Supabase client

The shared client is defined in:

```text
src/lib/supabase.ts
```

Authentication requests should go through an auth service rather than calling Supabase directly from page components.

## Production build

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

For deployment, configure the environment variables on the hosting platform before building. Add your production authentication redirect URLs in Supabase.
