# GraphQL Challenge
This repository is a training ground for learning and implementing GraphQL with Apollo, Prisma ORM, Docker, and Jest. It's designed to provide hands-on experience with CRUD operations in a GraphQL environment.

# Challenge Objectives
- Implement CRUD operations using Apollo GraphQL.
- Utilize Prisma as an ORM.
- Containerize the application using Docker.
- Write unit tests with Jest (Work In Progress).
- Implement authentication and authorization.

# Prerequisites
- **Node.js**: v18.17.1+
- **Docker**:  v24.0.6+

# Setup 

```bash
# Clone this repository
git clone https://github.com/pedrolaraburu/learn_graphql
# Navigate to the project repository
cd learn_graphql
# Build your containers and start them
make build
```

## Generating a secret key

```bash
# When first executing `make build` a secret key will be added to your .env file
# But in case you want to generate it manually please execute the command below
openssl rand -hex 32
# Don't forget to paste it into your .env file
```
## Environment Variables
```bash
DATABASE_URL="postgres://user:password@localhost:5432/dbname?schema=public"
SECRET_KEY = "" # Paste your generated secret key here
```

## Extra

```bash
# Show available makefile commands
make 
```


