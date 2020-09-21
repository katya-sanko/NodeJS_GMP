# NodeJS_GMP

NodeJS GMP tasks

#4  - module_4 branch

The task is a continuation of Homework3 and done in the same repo. REST service with PostgreSQL


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

To see Users and Groups tables:
```
http://localhost:3000/users
http://localhost:3000/groups
```

To see the N-N table:
```
http://localhost:3000/userGroups
```
If group will be deleted with the Postman, also records containing it's id would be deleted from UserGroups table.