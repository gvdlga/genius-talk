# Deployment Architecture

*   **Artifact:** A single **Docker image** is built for all environments.
*   **Registry:** The image is pushed to the **GitHub Container Registry (GHCR)**.
*   **Cloud:** Deployed to a managed container service like **AWS Fargate**.
*   **On-Premise:** Deployed via **Docker Compose** or a **Helm chart**.
*   **CI/CD:** A GitHub Actions workflow automates building, testing, and deploying to the cloud or packaging for on-premise releases.
