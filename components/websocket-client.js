// const WebSocket = require('ws');


// Replace this URL with the WebSocket server you want to connect to
const WS_URL = '' // 'wss://2ms2ts.dev/api/ws';

function connectWebSocket() {
  const ws = new WebSocket(WS_URL);

  ws.on('open', function open() {
    console.log('Connected to WebSocket server');
    
    // You can send a message to the server after connection is established
    ws.send('Hello from the webapp!');
  });

  ws.on('message', function incoming(data) {
    console.log('Received message from WebSocket server:', data.toString());
    
    // Handle the incoming message here
    // For example, you might want to parse JSON data:
    // const parsedData = JSON.parse(data);
    // processData(parsedData);
  });

  ws.on('close', function close() {
    console.log('Disconnected from WebSocket server');
    
    // You might want to implement reconnection logic here
    setTimeout(connectWebSocket, 5000);
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
    
    // Close the connection on error
    ws.close();
  });

  return ws;
}

// Start the WebSocket connection
// const wsClient = connectWebSocket();

// You can export the wsClient if you need to use it in other parts of your application
//module.exports = wsClient;
