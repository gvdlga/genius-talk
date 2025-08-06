# Frontend Architecture

*   **Component Organization:** Components are organized by feature in `src/components`.
*   **State Management:** Global state is managed with **Zustand**, organized into slices (e.g., `sessionSlice`, `channelSlice`).
*   **Routing:** Next.js file-system routing is used, with route groups for organization and a layout-based guard for protected routes.
*   **Services Layer:** A services layer (`src/services`) abstracts all API communication, providing a clean interface for UI components.
