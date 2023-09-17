const WebSocket = require("ws")

const wss = new WebSocket.WebSocketServer({ host: '0.0.0.0', port: 9000 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    console.log(data.toString())
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString(), { binary: isBinary });
      }
    });
  });
});