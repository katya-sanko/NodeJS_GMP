# NodeJS_GMP

NodeJS GMP tasks

#5  - module_5 branch

The task is a continuation of Homework4 and done in the same repo. LOGGING & ERROR HANDLING


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

## 5.1
Created simple customLogger.js which uses winston logger with info/error levels under the hood. So substituted all console.log() with this logger.

## 5.2
Added middleware which logs unhandled errors and return a standard message with HTTPcode 500(Internal Server Error). Added error handling to process.on(‘uncaughtException’,...). Added Unhandled promise rejection listener to log errors.

## 5.3
Added draft of error logging 
