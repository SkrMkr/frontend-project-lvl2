make lint: 
	npx eslint .
make test:
	NODE_OPTIONS=--experimental-vm-modules npm test