# Storefront Backend Project 

This repo is a code-along with the second project in the [Udacity Advanced Full-Stack Web Development Nanodegree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044?utm_campaign=12908932988_c_individuals_30off&utm_campaign=12908932988_c_individuals&utm_keyword=udacity%20web%20developer_e&utm_keyword=udacity%20web%20developer_e&utm_medium=ads_r&utm_medium=ads_r&utm_source=gsem_brand&utm_source=gsem_brand&utm_term=124509199111&utm_term=124509199111). \
commits in this repository corresponds to videos in the program.

## Project Setup

**Install packages**\
 npm install

**Run eslint**\
npm run lint

**Run eslint and fix styling with prettier**\
npm run lint:f

**Run unit test in fresh database**\
npm run test

**Run the server**\
npm run dev

## Environment variables

You should add the following:

- DB_HOST   [database address]
- TEST_DB_NAME [test database name]
- DB_NAME   [database name]
- DB_USERNAME [database username]
- DB_PASSWORD [database password]
- PEPPER
- SALT_ROUNDS
- JWT_SECRET
- ENV [environment: dev/test]

## Database

- Port: 5432
- Host: 127.0.0.1
- driver: postgres
  - create database storefront_db for the project
  - create database storefront_test_db for the tests
  - run the migration script to create the tables\
   \**npx db-migrate up**