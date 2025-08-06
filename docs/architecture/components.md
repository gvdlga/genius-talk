# Components

| Component | Responsibility | Technology Stack |
| :--- | :--- | :--- |
| **Web UI** | Renders all screens, handles user input, manages client-side state. | Next.js, React, shadcn/ui, Zustand |
| **API Server** | Handles all business logic, data persistence, and security. | Next.js API Routes, TypeScript |
| **Real-time Service** | Manages WebSockets and broadcasts real-time events via Redis Pub/Sub. | Node.js, ws, Redis |
| **Database** | Provides persistent storage for all application data. | MongoDB |
| **Cache & Pub/Sub** | Provides in-memory caching and the message broker for real-time events. | Redis |
