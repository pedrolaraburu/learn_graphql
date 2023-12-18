default: 
	@echo "Available commands:"
	@echo "make build           - Create containers and create .env file"
	@echo "make start           - Initialize containers DB and Apollo GraphQL Server"
	@echo "make stop            - Stop containers"
	@echo "make delete          - Delete containers"

build:
ifeq ("$(wildcard .env)","") 
	if [ -f .env.example ]; then \
		cp .env.example .env; \
	else \
		echo "#####____________________________________________________________________.env.example file not found"; \
		exit 1; \
	fi
	@echo "#####____________________________________________________________________New .env file created" 
endif
	docker-compose -f docker-compose.yml --env-file=.env up -d --build

start:
	docker-compose -f docker-compose.yml start

stop:
	docker-compose -f docker-compose.yml stop 

delete: 
	docker-compose -f docker-compose.yml down 