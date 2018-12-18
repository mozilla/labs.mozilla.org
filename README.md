# Mozilla Labs


## Init
```bash
git clone [repo]

cd [repo]

yarn install
```
## Required environment variables (contentful):
`process.env.SPACE_ID`
`process.env.SPACE_API_KEY`

## Cache
`process.env.CACHE`

## HTTPS redirect
`process.env.FORCE_HTTPS`


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

### Heroku settings
`heroku config:set NPM_CONFIG_PRODUCTION=false`
