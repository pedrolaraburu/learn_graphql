default: 
	@echo "Available commands:"
	@echo "make build           - Create containers and create .env file"
	@echo "make start           - Initialize containers DB and Apollo GraphQL Server"
	@echo "make stop            - Stop containers"
	@echo "make delete          - Delete containers"

build:
ifeq ("$(wildcard .env)","") 
	@SECRET_KEY="$$(openssl rand -hex 32)"; \
	if [ -f .env.example ]; then \
		echo "\nSECRET_KEY = '$$SECRET_KEY'" >> .env.example; \
		echo "Secret key added to .env.example"; \
	fi
	cp .env.example .env
	@echo "#####____________________________________________________________________New .env file created" 
endif
	docker-compose -f docker-compose.yml --env-file=.env up -d --build
	@echo "🚀 Server started at http://localhost:4000/graphql"

start:
	docker-compose -f docker-compose.yml start
	@echo "🚀 Server started at http://localhost:4000/graphql"

stop:
	docker-compose -f docker-compose.yml stop 

delete: 
	docker-compose -f docker-compose.yml down 

# This command is used to start the project locally (I was commenting the node.js part of the docker-compose.yml file)
# Will only work if you just have the DB container on the docker-compose.yml file
start-local:
	docker-compose -f docker-compose.yml --env-file=.env up -d --build
	npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma
	yarn dev