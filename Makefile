build:
	npm run build
	cp robots.txt dist/robots.txt
	cp sitemap.xml dist/sitemap.xml
	cp _redirects dist/_redirects

ci:
	npm ci

dev:
	npm run dev