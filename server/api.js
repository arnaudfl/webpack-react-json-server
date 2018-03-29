const { create, defaults, rewriter, router, bodyParser } = require('json-server');
const rewrites = require('./routes.json');
const database = require('./database');

const server = create();
const apiEndpoints = router(database());
const middlewares = defaults({ bodyParser: true });

server.use(rewriter(rewrites));
server.use(middlewares);

server.use(bodyParser); // important to use body returned with server response

// just an example to catch url when update status for an user
server.post('/users/:id/status', function (req, res) {
  const user = apiEndpoints.db
      .get('users')
      .find({ id: req.params.id })
      .assign({ active: req.body.newStatus })
      .write();
  if (user) {
    console.log(`updated status to ${req.body.newStatus} for client ID ${req.params.id}`);
    return res.jsonp({ message: 'Status updated successfully!' });
  }
  return res.status(404).jsonp({ message: `User ID #${req.params.id} not found` });
});

server.use(apiEndpoints);

module.exports = server;
