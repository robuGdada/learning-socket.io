import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server,{connectionStateRecovery:{}});
app.use(express.static("public"));
const port = 3001

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
