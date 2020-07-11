const http = require('http');
const app = require('./index');

// setup port
const port = 3000;
const server=http.createServer(app);
//process.env.port ||

// listen for the port request
server.listen(port, () => console.log('server running on port 3000!'));
