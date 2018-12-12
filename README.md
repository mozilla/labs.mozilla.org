# Mozilla Labs


## Init
```bash
git clone [repo]

cd [repo]

yarn install
```
## Required environment variables (contentful):
`SPACE_ID`
`SPACE_API_KEY`


### Development
```
yarn start

// example
SPACE_ID=12345 SPACE_API_KEY=12345 yarn start
```


### Production
```
yarn build --release
yarn serve --release
```


