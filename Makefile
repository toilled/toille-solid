build:
	npm run build

ci:
	npm ci

dev:
	npm run dev

preview:
	$(MAKE) build
	npm run serve

lint:
	npx eslint .