# Proje

    "fastify": "~4.13.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "nx": "17.1.3",
    "typescript": "~5.2.2",
    "vite": "~4.3.9",
    "node": "v18.18.2"


## Init

1. Change name from package.json

```
npx create-nx-workspace@latest
npm i --save-dev @nx/node
npm i --save-dev @nx/react
npm install --save-dev javascript-obfuscator
nx g @nx/node:app --directory=packages
nx g @nx/react:app --directory=packages
```

## Running tasks

Serve

```
npm run start
```

Build

```
npm run build
```

