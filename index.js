var IX = require('./ix')
var config = require('./config.json');
var hipChat = require('./hipchat')(config.hipChatKey);

ix = new IX();
ix.poll();

ix.on("error", function(err){
  console.log("Error:" + err)
  hipChat.sendMessage(197737,"IX Unresponsive!")
}) 

ix.on("success", function() {
	
})

process.on('SIGINT', function() {
  process.exit(0);
});
