# Template Creation

**Express Prisma Zod Template**
By @3rdyTeen

## Description

This are the step for creating this awesome backend template using **npm** as packageManager, **node**, **express**, **prisma**, **zod** and **mysql**. It includes **typescript**, **eslint**, **prettier** for code quality and linting.

## Prerequisites

- Install [node](https://nodejs.org/en) using [fnm](https://github.com/Schniz/fnm) for version controll
- Install [Docker](https://www.docker.com/) for database containerization. (Optional)

# Installations, Commands and Code used.

## Initial

- Create .gitignore file

```bash
touch .gitignore
```

Below is the inital content for .gitignore

```bash
node_modules/
dist/
coverage/
volumes/

*-lock.json
*.lock

.env
.env.*
.env-*
!**.example

.DS_Store
*.tsbuildinfo

```

- Node version file

```bash
node -v > .nvmrc
```

- Environment file

```bash
touch .env

touch .env.local
```

- initialize node using npm

```bash
npm init -y
```

## VsCode

- Create workspace settings

```bash
mkdir .vscode && touch .vscode/settings.json
```

Below is the initial content for .vscode/settings.json

```bash
{
    /* Editor */
    "editor.tabSize": 2,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.organizeImports": "explicit"
    },

    /* ESLint */
    "eslint.format.enable": true,
    "eslint.lintTask.enable": true,
    "eslint.workingDirectories": [{ "mode": "auto" }] /* For Monorepo */,

    /* Others */
    "[dockerfile]": {
      "editor.defaultFormatter": "ms-azuretools.vscode-docker"
    }
  }

```

## Typescript

- Install needed packages for typescript and initialize.

```bash
npm add -D typescript tsc-alias tsx @types/node

npx tsc --init
```

**Note**: You can modify typescript config on tsconfig.json

## Eslint

- Install VsCode extension "Eslint"

- Install eslint package and initialize."

```bash
npm add -D eslint

npx eslint --init
```

- Create .eslintignore file

```bash
touch .eslintignore
```

Below is the inital content for .eslintignore

```bash
node_modules/
dist/
coverage/
volumes/
cli/

*.config.js
*.config.ts
*.config.mjs
*.config.cjs

*-lock.json
*-lock.yaml
*.lock

.env
.env.*
.env-*

!**.example

```

## Prettier

- Install Prettier extension on VsCode

- Install prettier package

```bash
npm add -D prettier
```

- Create .prettierrc and .prettierignore file

```bash
touch .prettierrc

touch .prettierignore
```

Below is the initial content for

**.prettierrc**

```bash
{
    "singleQuote": true,
    "jsxSingleQuote": false,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100,
    "semi": true,
    "arrowParens": "avoid",
    "endOfLine": "auto"
  }

```

**.prettierignore**

```bash
node_modules/
dist/
coverage/
volumes/

*-lock.json
*-lock.yaml
*.lock

.env
.env.*
.env-*

```

- install package for eslint-prettier config and plugin

```bash
npm add -D eslint-config-prettier eslint-plugin-prettier
```

Update the eslint config based on your configurations.

- set script fro liniting and formattings

```bash
npm pkg set scripts.lint="eslint . --ext .ts"
npm pkg set scripts.lint:fix="npm lint --fix"
npm pkg set scripts.format="prettier --write '**/*.ts{,x}'"
```

## HUSKY (Optional)

- to be follow

## Docker (Optional)

- Create docker files

```bash
touch .dockerignore
touch DockerFile
touch docker-compose.yaml
```

to be continue

## Folder Structure and main files

```bash
mkdir src
    touch index.ts
    touch app.ts

mkdir src/constants
mkdir src/controllers
mkdir src/data
mkdir src/db
mkdir src/lib
mkdir src/middlewares
mkdir src/services
mkdir src/types
mkdir src/utils
```

## Prisma

- Install packages needed and initialize

```bash
npm add -D prisma
npm add @prisma/client

npx prisma init
```

- update prisma config and follow the documentation based on prefered database
