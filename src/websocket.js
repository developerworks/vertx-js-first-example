var Buffer = require("vertx-js/buffer");
var WebSocketFrame = require("vertx-js/web_socket_frame")
var WebsocketHander = require("./websocket_handler")

var options = {
  "logActivity": true,
  "maxWebsocketFrameSize": 1024 * 1024 * 1024 // 1G
}
var server = vertx.createHttpServer(options)
// 直接Websocket
server.websocketHandler(function (websocket) {
  var connection_info = {
    client: websocket.remoteAddress().host() + ':' + websocket.remoteAddress().port(),
    headers: websocket.headers(),
    path: websocket.path(),
    query: websocket.query(),
    uri: websocket.uri()
  }
  console.log('Connection info: %s', JSON.stringify(connection_info))
  var message = "hello";
  websocket.writeTextMessage(JSON.stringify(options));
  WebsocketHander.handler(websocket)
})

// 通过HTTP升级的方式
server.requestHandler(function (req) {
  if (req.path() == "/") {
    var websocket = req.upgrade();
  } else {
    req.response().setStatusCode(400).end();
  }
})
server.listen(8080, 'localhost', function (res, err) {
  if (err == null) {
    console.log('Websocket is listen on http://localhost:8080')
  } else {
    console.log('Failed to bind 8080.')
  }
})
