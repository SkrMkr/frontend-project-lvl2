lint: 
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npm test
install: 
	npm ci
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8