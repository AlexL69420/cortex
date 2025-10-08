const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

// Custom output with nested relationships
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.created_at = new Date().toISOString();
  }
  next();
});

// Use default router
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /variants`);
  console.log(`  GET /exercises`);
  console.log(`  GET /answers`);
  console.log(`  GET /variants/:id/exercises (nested)`);
  console.log(`  GET /exercises/:id/answers (nested)`);
});