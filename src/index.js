// import required essentials
const http = require('http');
const express = require('express');

// import `users` from `routes` folder 
const usersRouter = require('./routers/users');
// import `groups` from `routes` folder 
const groupsRouter = require('./routers/groups');

// create new app
const app = express();
app.use(express.json());

/* this '/users' URL will have two end-points:
→ localhost:3000/users/ (this returns array of objects)
→ localhost:3000/users/:id (this returns single object)
*/
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('Hello there! Please go to the /users to see the list of users.');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
