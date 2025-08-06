# Unified Project Structure

The project is a monorepo managed with npm workspaces.

```plaintext
genius-talk/
├── apps/
│   └── web/            # The Next.js application (UI & API)
├── packages/
│   ├── shared/         # Shared TypeScript types
│   └── config/         # Shared configurations (ESLint, etc.)
├── infrastructure/     # On-prem deployment artifacts (Docker Compose, Helm)
├── docs/               # Project documentation
└── package.json        # Root package.json
```
