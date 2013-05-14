var request = require('request')


function HipChat(auth_token) {
  if( !(this instanceof HipChat) ) {  
    console.log("Createing object")
    return new HipChat(auth_token);
  }
  this.auth_token = auth_token
}

HipChat.prototype.sendMessage = function(room, message) {
  var payload = { notify:1, message_format:'text', format: 'json', auth_token: this.auth_token, room_id: room, from: "IX-BOT", message: message, color: 'red' }
  request.post('https://api.hipchat.com/v1/rooms/message', { form: payload }, function(err, respon, body) {
    if(err) console.log("Error" + err)  
    console.log("Body: " + body)
  })
}

module.exports = HipChat
