
## Description

Project Management App 

## Prerequisites
- Node.js
- PostgreSQl
- Git

## Installation
# Local Setup
```bash
- Clone the repository:
$ git clone
- Run the command below to install the dependencies:
$ npm install
```

# Database Setup
```bash
- Create a postgres database on your local machine and update the .env file with DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD and DB_NAME variables
- Run the migration named: SetupMigrations:
$ npm run migration:run
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

Access the API documentation on the api endpoint:

```bash
url:port/api
```


