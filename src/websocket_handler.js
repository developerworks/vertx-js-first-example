exports.handler = function(websocket) {
  websocket.frameHandler(function (frame) {
    console.log("Frame received", frame)
  })
  websocket.textMessageHandler(function(text){
    console.log("Text received: %s", text)
  })
}