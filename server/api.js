const { create, defaults, rewriter, router, bodyParser } = require('json-server');
const rewrites = require('./routes.json');
const database = require('./database');

const server = create();
const apiEndpoints = router(database());
const middlewares = defaults({ bodyParser: true });

server.use(rewriter(rewrites));
server.use(middlewares);

server.use(bodyParser); // important to use body returned with server response

// just an example to catch url when update date for an user
server.patch('/users/:id/date', function (req, res) {
  // Call next() if you want to let JSON Server router handle the rest
  //
  // If needed, you can access database using router.db
  // It's a lowdb instance, you can find documentation here:
  // https://github.com/typicode/lowdb

  // just testing status 500 on user ID 1
  if ('1' === req.params.id) {
    return res.status(500).jsonp({ message: 'error_occurred' });
  }
});

server.use(apiEndpoints);

module.exports = server;
