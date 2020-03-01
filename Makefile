install: install-deps

run:
	npx babel-node 'src/bin/interface.js' __fixtures__/after.json __fixtures__/before.json

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
