var options = {
  "logActivity": true,
  "maxWebsocketFrameSize": 1024 * 1024 * 1024 // 1 G
}
var server = vertx.createHttpServer(options)
server.requestHandler(function (req) {
  console.log(JSON.stringify(req.params))
  req.response()
    .putHeader('Content-Type', 'text/plain')
    .end('Hello from Vert.x!')
})
server.listen(8080, 'localhost', function (res, err) {
  if (err == null) {
    console.log('Server is listen on http://localhost:8080')
  } else {
    console.log('Failed to bind 8080.')
  }
})
