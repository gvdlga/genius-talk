# Tech Stack

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | latest | Language for UI development | Provides type safety and better developer experience for large applications. |
| **Frontend Framework** | Next.js | latest | UI framework and rendering engine | Specified in PRD. Enables React-based development with server-side rendering and static site generation. |
| **UI Component Library**| shadcn/ui | latest | Pre-built, accessible UI components | Specified in UI/UX Spec. Accelerates development with customizable and accessible components. |
| **State Management** | Zustand | latest | Global state management for React | A lightweight, unopinionated state management solution that is easy to use with Next.js. |
| **Backend Language** | TypeScript | latest | Language for API development | Consistent language across the stack simplifies development and code sharing. |
| **Backend Framework** | Next.js API Routes | latest | Backend API framework | Specified in PRD. Co-locates backend logic with the frontend, simplifying the monorepo structure. |
| **API Style** | REST | N/A | API design paradigm | A well-understood, standard approach for building APIs. Aligns with API-first goal. |
| **Database** | MongoDB | 5.0+ | Primary data storage | Specified in PRD. A flexible NoSQL database that works well with JavaScript-based applications. |
| **Cache** | Redis | 7.0+ | Caching and real-time messaging | Specified in PRD. Used for caching frequently accessed data and as a pub/sub broker for WebSockets. |
| **File Storage** | N/A | N/A | Storing user-uploaded files | Out of scope for MVP. Future implementation would use a service like AWS S3 or MinIO for on-premise. |
| **Authentication** | BetterAuth | latest | Centralized User and Agent Authentication | External service providing robust authentication flows and token validation. Integrated via server-side library.
| **Frontend Testing** | Jest & React Testing Library | latest | Unit and component testing | Industry standard for testing React applications, ensuring component correctness. |
| **Backend Testing** | Jest & Supertest | latest | API endpoint testing | Allows for testing API routes without needing a running server, ideal for CI environments. |
| **E2E Testing** | Playwright | latest | End-to-end browser testing | A modern, reliable E2E testing framework that supports all major browsers. |
| **Build Tool** | Docker | latest | Containerization | Packages the application and its dependencies into a portable image for both cloud and on-premise deployments. |
| **Bundler** | SWC (via Next.js) | latest | JavaScript/TypeScript bundler | The default, high-performance bundler included with Next.js. |
| **IaC Tool** | Docker Compose & Helm | latest | Infrastructure as Code | Docker Compose for simple on-prem setups, Helm for Kubernetes-based deployments (both on-prem and cloud). |
| **CI/CD** | GitHub Actions | N/A | Continuous Integration/Deployment | Specified in PRD. Automates the build, test, and deployment pipeline. |
| **Monitoring** | Prometheus & Grafana | latest | On-premise monitoring | A standard open-source stack for metrics and visualization, suitable for self-hosted deployments. |
| **Logging** | Console (stdout) | N/A | Application logging | Directing logs to stdout is a container best practice, allowing flexible log collection by different platforms. |
| **CSS Framework** | Tailwind CSS | latest | Utility-first CSS framework | Specified in UI/UX Spec. Enables rapid UI development with a consistent design system. |
