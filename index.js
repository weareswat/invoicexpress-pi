var wiringPi = require('wiringPi');
var IX = require('./ix')
var config = require('./config.json');
var hipChat = require('./hipchat')(config.hipChatKey);

wiringPi.setup();
wiringPi.pinMode(0, wiringPi.modes.OUTPUT);

ix = new IX();
ix.poll();

ix.on("error", function(err){
  console.log("Error:" + err)
  hipChat.sendMessage(197737,"@all Guys, IX IS DOWN")
  wiringPi.digitalWrite(0,1)
}) 

ix.on("success", function() {
  wiringPi.digitalWrite(0,0)
})

process.on('SIGINT', function() {
  wiringPi.digitalWrite(0,0)
  process.exit(0);
});
