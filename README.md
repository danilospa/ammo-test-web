# AMMO Test Web

This project is the Web application for the AMMO tech test. It provides a single page for searching products using the API(https://github.com/danilospa/ammo-test-api).  
[Rematch](https://github.com/rematch/rematch) was used on this project in top of Redux. Rematch is a library that abstract Redux reducers and actions in a simpler way. You can read more about it in [this](https://hackernoon.com/redesigning-redux-b2baee8b8a38) post.

## Dependencies

- NodeJS 8.11.2
- AMMO Test API

## How to contribute

First of all, make sure you have the correct version of Node, then install [Yarn](https://yarnpkg.com/en/docs/install). After, install all the dependencies:
```bash
$ yarn install
```

Copy the configuration file and change it as needed:
```bash
$ cp .env.local.example .env.local
```

To start up the server:
```bash
$ yarn start
```

The server should be up and listening on port 3000.

To run the tests, execute:
```bash
$ yarn test
```

## How to deploy

Production deploy is made automatically by [CircleCI](https://circleci.com/gh/danilospa/ammo-test-web) when merging into master branch.  
The static files are send to a AWS S3 bucket. They are served through AWS CloudFront.
