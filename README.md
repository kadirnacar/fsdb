# Project

Used [Sakai React Template](https://github.com/primefaces/sakai-react) for application template.  

"fastify": "~4.24.3"  
"react": "18.2.0"  
"react-dom": "18.2.0"  
"nx": "17.1.3"  
"typescript": "~5.3.2"  
"vite": "~4.3.9"  
"node": "v18.18.2"  
"primereact": "^10.2.1"     



## Init notes

1. Change name from package.json

## Running tasks

Serve

```
# Run fastfy server and react web application with vite dev server
npm run start 

# Only web with vite dev server
npm run web 
```

Build

```
npm run build
```


## Create nx workspace

```
npx create-nx-workspace@latest
npm i --save-dev @nx/node
npm i --save-dev @nx/react
npm install --save-dev javascript-obfuscator
nx g @nx/node:app --directory=packages
nx g @nx/react:app --directory=packages
```