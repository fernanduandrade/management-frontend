.PHONY: build run clean

build:
	@docker-compose up --build --no-start

run:
	@docker-compose up -d web

clear:
	@docker-compose down
