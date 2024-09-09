# Restaurant Microservices pnpm mono-repo

## Description

This is a mono-rejson repository for a restaurant microservices project. The project is divided into multiple services, each with its own responsibility. The services are:

- **auth-service**: Handles user authentication and authorization.
- **order-service**: Handles order creation and management.
- **restaurant-service**: Handles restaurant creation and management.
- **user-service**: Handles user creation and management.

## Docker compose

The project uses Docker Compose to run the services. To run the services, run the following command in the root of the project:

```bash
docker-compose up
```

## Installation

To install the project, run the following command in the root of the project:

```bash
pnpm install
```

To setup the database, run the following command in the root of the project:

```bash
pnpm auth:drizzle:migrate
```

## Running the project

To run the project, run the following command in the root of the project:

```bash
pnpm dev
```

