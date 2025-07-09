# Migrated Web Client

This project is a migration of the web client from a monorepo structure to a standalone Next.js application.

## Migration Details

The migration includes:

- Latest Next.js version with App Router
- TypeScript integration
- Tailwind CSS for styling
- Shadcn UI component library
- Firebase authentication
- Axios API layer from the original core package
- Models from the original core package

## Prerequisites

- Node.js version >= 18.17.0
- npm or yarn package manager

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.local.example` with your Firebase configuration
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features Implemented

- Authentication (sign-in and sign-up)
- Welcome page
- Firebase integration
- Authentication-based routing
- Core models and API layer

## Next Steps

The following features will be implemented in future iterations:

- Chat functionality
- Reports section
- Sources management
- Settings
- Getting Started guide
- Workspace management

## Project Structure

```
src/
  ├── app/               # App router pages
  │   ├── welcome/       # Welcome and sign-in pages
  │   └── page.tsx       # Home page (authenticated)
  ├── components/        # UI components
  │   └── ui/            # Shadcn UI components
  ├── hooks/             # React hooks
  │   └── axios/         # Axios API layer from core
  ├── lib/               # Utility libraries
  │   └── firebase.ts    # Firebase configuration
  ├── models/            # Type definitions from core
  └── providers/         # Context providers
      └── AuthProvider.tsx # Authentication provider
```

## Notes on Migration

This project has been migrated from a monorepo structure. The original structure had:

- `core` package with shared models and API utilities
- `webclient` with the Next.js application

The migration involved:

1. Creating a new Next.js app with the latest version
2. Copying the necessary models and API layer from the core package
3. Implementing authentication using Firebase directly instead of through core
4. Setting up the welcome screen and sign-in/sign-up functionality
