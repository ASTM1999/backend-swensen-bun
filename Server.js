console.log('Hello, world!');

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Bun!');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
