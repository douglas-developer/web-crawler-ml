const app = require('./app/main/app');
const port = app.get('port');
const http = require('http');
const server = http.createServer(app);

const log = 'Listening on:' + port;

server.listen(port);
console.log(log);

module.exports = server;
