# Rickuniverse server

Rickuniverse app API to check Rick and morty series data.

## Installation

Install

```bash
npm install
```

Run tests

```bash
npm test
```

Run dev

```bash
npm run dev
```

Run prod

```bash
npm start
```

## Libraries

This project was built mainly with `express`, but also uses:

- `bcrypt`: to hash and check user passwords
- `jsonwebtoken`: to protect the api with jwt
- `mongoose`: to model application data
- `mongoose`: to model application data
- `eslint`, `husky`, `lint-staged`, `prettier`: to format and lint for code quality
- `jest`, `mongodb-memory-server`, `nock`, `supertest`: utilities for writing and running tests
- `nodemon`: to make development easier by restarting server on changes

## Production

Deployed with heroku at https://rickuniverse-server.herokuapp.com/
