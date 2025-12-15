# Residential Dashboard

A modern, responsive dashboard designed to streamline management for residential communities. It serves as a central hub for **guards** to efficiency log entries and monitor security, and for **residents** to stay informed and manage their data.

## Features

-   **Role-Based Access**: Distinct interfaces for Guards, Residents, and Management.
-   **Visitor Management**: Log and track visitor entries and exits in real-time.
-   **Resident Database**: Manage resident profiles and information.
-   **Announcement Board**: Post and view updates for the community.
-   **Responsive Design**: Fully optimized for desktop and tablet usage.

## UI Showcase

> **Note**: Add screenshots of the dashboard here to showcase the UI.

![Dashboard Overview](https://placehold.co/600x400?text=Dashboard+Overview)

_Figure 1: Main Dashboard Overview_

## Project Structure

Here is an overview of the essential folders in the project:

-   **`src/routes/`**: Contains the file-based routing logic for TanStack Router. Each file or folder represents a route in the application (e.g., `_dashboard` is the main layout for dashboard pages).
-   **`src/components/`**: Holds all React components.
    -   **`layout/`**: Structural components like `Sidebar`, `Topbar`, and `DashboardShell`.
    -   **`ui/`**: Reusable primitive UI components (buttons, inputs, cards) often styled with Tailwind.
-   **`src/lib/`**: Utility functions, helpers, and configuration files (e.g., Firebase setup, common type definitions).
-   **`src/context/`**: React Context providers for global state management (e.g., `AuthContext` for user authentication).
-   **`src/assets/`**: Static assets such as images, fonts, and global SVGs.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root directory and add your Firebase configuration keys (see [Firebase Setup](#firebase-setup) below).

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## Firebase Setup

This project uses [Firebase](https://firebase.google.com/) for authentication and database.

1.  Create a project in the Firebase Console.
2.  Enable **Authentication** (Email/Password, Google, etc.).
3.  Create a **Firestore Database**.
4.  Copy your web app configuration options and placing them in `src/lib/firebase.ts` (or use environment variables as recommended).

### Firestore Rules (Security)

To ensure role-based security, add these rules to your Firestore setup:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Guards can read/write access logs
    match /access_logs/{log} {
      allow read, write: if request.auth != null && request.auth.token.role == 'guard';
    }
    // Residents can read their own data
    match /residents/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Authentication & Role Management

The application handles different user roles to cater to specific needs:

-   **Guards**: Access the logging system, visitor registration, and camera feeds.
-   **Residents**: Access personal profile, view announcements, and pre-register visitors.
-   **Admin**: Full access to manage users and system settings.

Routing is guarded by checking the user's role in the `AuthContext` and redirecting unauthorized users.

## Deployment

### Vercel
1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables from your `.env` file.
4.  Deploy!

### Firebase Hosting
1.  Install Firebase CLI: `npm install -g firebase-tools`
2.  Login: `firebase login`
3.  Initialize: `firebase init` (Select Hosting)
4.  Build: `npm run build`
5.  Deploy: `firebase deploy`

## Roadmap / Next Steps

-   [ ] **Visitor Pre-registration**: Allow residents to generate QR codes for visitors.
-   [ ] **Push Notifications**: Alert residents when a visitor arrives.
-   [ ] **Analytics Dashboard**: Visual charts for entry/exit traffic.
-   [ ] **Payment Integration**: For management fee collections.

## Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [TanStack Router](https://tanstack.com/router)
-   **Icons**: [Lucide React](https://lucide.dev/)
