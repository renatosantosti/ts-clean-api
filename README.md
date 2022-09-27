# ts-clean-api
A simple boilerplate for api using Typescript and Clean Archicteture

## First of All:
 run npm install or yarn install

 next run husky to prepare stages:
  -   npx husky add .husky/pre-commit "yarn lint-staged"
  -   npx husky add .husky/pre-push "yarn test:push"
  -   npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"
  -   chmod ug+x .husky/pre-commit
  -   chmod ug+x .husky/pre-push
