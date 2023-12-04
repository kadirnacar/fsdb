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


## Create project story

```
# Crerate new workspace. Run and follow instructions. 
# - Workspace name.
# - Select stack. "None"
# - Select type. "Integrated Monorepo"
# - Using cache. "No"
npx create-nx-workspace@latest

# Install node and react
npm i --save-dev @nx/node @nx/react

# For production build. Check packages/web/vite.config.js
npm install --save-dev javascript-obfuscator

# Create server application. Run and follow instructions. 
# - Node app name. "server"
# - Select framework. "fastify"
# - Select type. "Derived"
nx g @nx/node:app --directory=packages

# Create web application. Run and follow instructions. 
# - Node app name. "web"
# - Select stylesheet. "SASS"
# - React router. "y"
# - Select E2E. "none"
# - Select bundler. "vite"
# - Select type. "Derived"
nx g @nx/react:app --directory=packages
```