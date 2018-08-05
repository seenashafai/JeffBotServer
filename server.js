// server.js
// where your node app starts

// init project
const http = require('http');
const express = require('express');
const app = express();

/* Calls */
const Discord = require('discord.js'); //Calling discord.js Package
const bot = new Discord.Client(); //Initialise discord bot instance

/* Listener Event: Message Received */
bot.on('message', message =>  {

  /* Variables */
  var sender = message.author;
  var msg = message.content.toUpperCase(); //Converts entire message to upper case

  /* Checks for botception */
  if (message.author.bot) return;

  /* Ping Pong Function */
  if (msg === ">" + 'PING') //Checks for presence of prefix
  {
    message.channel.send('Pong!') //Send 'Pong' in chat channel
  }

  /* Delete message and replace with Jeffs */
  if (message.member.roles.has('475333748620001280')) //Checks for role (Jeff), Role ID hardcoded
  {
    /*  Handling original user message */
    var msgcontent = message.content
    console.log(msgcontent) //Output the message from the user to the console
    message.delete() //Delete the user's message from the chat channel
    var splitStringArray = msgcontent.split(" ") //Split message into words, create array of words
    var msgWordCount = splitStringArray.length //Check how many words in the original message
    console.log(msgWordCount) //Output number of words in original message to console

    /*  For Loop to create array of 'jeff' */
    var i; //Declare loop variable
    var jeffArray = []; //Declare empty array
    for (i = 0; i < msgWordCount; i++) { //Loop through for number of words in message
        jeffArray.push('jeff') //Push 'jeff' to jeffArray
    }

    /* Outputting jeffArray */
    var jeffString = jeffArray.join(" "); //Turn array into string separated with spaces
    message.channel.send(jeffString); //Send jeffString into chat channel
    message.author.send('You just got Jeffed! Tag your friends to Jeff them also!') //PM author of original message
  }
});


/* Event: Bot startup & successful login*/
bot.on("ready", () => {

  //Output basic statistics of bot to console
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);

  /* Set Bot Activity */
  if (bot.guilds.size > 1) //If bot is serving more than 1 guild
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`) //Set Activity
  }
  else //If bot is serving less than 2 guilds
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guild`); //Set Activity
  }
});

/* Login */
bot.login(process.env.TOKEN); //Bot login with token defined in congfig.js


/* Uptime pinger (Now using UptimeRobot)*/
/*
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
*/
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

