# NodeJS_GMP

NodeJS GMP tasks

#6  - module_6 branch

The task is a continuation of Homework5and should be done in the same repo.

TASK 6.1
Add authorization to the already existing REST service.
    • Add login(username, password)method which should return JWTtoken.
    • Add a middleware which will proxy all the requests (except login) and check that HTTPAuthorizationheader has the correct value of JWTtoken.
    • In case of the HTTPAuthorizationheader is absent in the request, themiddlewareshould stop further controller method execution and return HTTP401code (Unauthorized Error) and standard error message.
    • In case of HTTPAuthorization headerhasinvalid JWTtoken in the request, the middleware should return HTTPcode 403(Forbidden Error) and standard error message.

TASK 6.2
    Add CORS middleware to access service methods from WEB applications hosted on another domains (https://github.com/expressjs/cors).


## Getting started

To install all dependencies, (e.g. after cloning it from a Git repository) run

```
npm install
```

## Serve

```
npm start
```

## Notes

Route map
```
http://localhost:3000/users
http://localhost:3000/groups
http://localhost:3000/userGroups
```