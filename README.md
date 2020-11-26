# NodeJS_GMP

NodeJS GMP tasks

#7  - module_7 branch

Tests & dotenv
The task is a continuation of Homework6 and should be done in the same repo

## Getting started

To install all dependencies, (e.g. after cloning it from a Git repository) run

```
npm install
```

## Serve

```
npm start
```

## Test

```
npm run test
```

## Notes

```
new POST
http://localhost:3000/login
{
    "login": "Doppio",
    "password": "doppio1"
}
```

*// To check auth: get the token via POST req and add to GET req 'Authorisation' header*

```
main GET
http://localhost:3000/users
http://localhost:3000/groups
http://localhost:3000/userGroups
```