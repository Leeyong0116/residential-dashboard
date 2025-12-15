# Residential Dashboard

A modern, responsive dashboard for managing residential data, including users, visitors, and residents.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [TanStack Router](https://tanstack.com/router)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

Here is an overview of the essential folders in the project:

-   **`src/routes/`**: Contains the file-based routing logic for TanStack Router. Each file or folder represents a route in the application (e.g., `_dashboard` is the main layout for dashboard pages).
-   **`src/components/`**: Holds all React components.
    -   **`layout/`**: Structural components like `Sidebar`, `Topbar`, and `DashboardShell`.
    -   **`ui/`**: Reusable primitive UI components (buttons, inputs, cards) often styled with Tailwind.
-   **`src/lib/`**: Utility functions, helpers, and configuration files (e.g., Firebase setup, common type definitions).
-   **`src/context/`**: React Context providers for global state management (e.g., `AuthContext` for user authentication).
-   **`src/assets/`**: Static assets such as images, fonts, and global SVGs.

