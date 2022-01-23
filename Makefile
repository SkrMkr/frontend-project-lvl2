lint: 
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npm test
install: 
	npm ci