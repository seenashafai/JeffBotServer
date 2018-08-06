// server.js
// where your node app starts

// init project
const http = require('http');
const express = require('express');
const app = express();

//global variables
var jeffRole = ''
var modRole = ''
var modArray = []

//global constants
var prefix = ">"

/* Calls */
const Discord = require('discord.js'); //Calling discord.js Package
const bot = new Discord.Client(); //Initialise discord bot instance



/* Listener Event: Message Received */
bot.on('message', message =>  {
  
  /* Command-Argument separator */
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  /* Variables */
  var sender = message.author;
  var msg = message.content.toUpperCase(); //Converts entire message to upper case

  /* Checks for botception */
  if (message.author.bot) return;
  

  /* Ping Pong Function */
  if (msg === ">" + 'PING') //Checks for presence of prefix
  {
    message.channel.send('Pongo!') //Send 'Pong' in chat channel
  }
  
  if (msg === ">" + 'START')
  {
      message.guild.createRole({name:'Jeff'})
      message.channel.send('It is done')
      jeffRole = message.guild.roles.find("name", "Jeff")

  }
  
    if (msg === ">" + 'FINDJEFF')
  {
      console.log(jeffRole.name)
      console.log(jeffRole.id)
      message.channel.send(jeffRole.name)
  }
  
    if (command === 'jefficate')
  {
      jeffRole = message.guild.roles.find("name", "Jeff")
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
      member.addRole(jeffRole).catch(console.error);


      console.log(member.username,'jefficated')
      console.log(jeffRole.id)
      
  }
  
   if (command === 'unjefficate')
  {
    if (message.member.roles.has(jeffRole.id)) return //Checks for role (Jeff), Role ID hardcoded and prevents self-unjeffication
      console.log('Someone tried to unjefficate themeselves...')
      jeffRole = message.guild.roles.find("name", "Jeff")
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      console.log(member)
      if(!member)
        return message.reply("Please mention a valid member of this server");
      member.removeRole(jeffRole).catch(console.error);

      
      console.log(member,'unjefficated')
      console.log(jeffRole.id) 
 }
  
  if (command === 'setmod')
  {
    console.log(message.guild.members.get(args[0]))
    modRole = message.guild.roles.find("name", message.mentions.members.first())
    if (!modRole)
    {
      return message.reply("Please enter a valid role")
    }
    modArray.push(modRole)
    console.log(modArray)
    var modString = modArray.join(" "); //Turn array into string separated with spaces
    message.channel.send('Current mod roles:', modString)
  }
  
  /* Delete message and replace with Jeffs */
  
  if (!jeffRole) return
    if (message.member.roles.has(jeffRole.id)) //Checks for role (Jeff), Role ID hardcoded
    {
      /*  Handling original user message */
      var msgcontent = message.content
      message.delete() //Delete the user's message from the chat channel
      var splitStringArray = msgcontent.split(" ") //Split message into words, create array of words
      var msgWordCount = splitStringArray.length //Check how many words in the original message

      /*  For Loop to create array of 'jeff' */
      var i; //Declare loop variable
      var jeffArray = []; //Declare empty array
      jeffArray.push('Jeff')
      if (msgWordCount > 1) 
      {
        for (i = 0; i < msgWordCount-1; i++) { //Loop through for number of words in message
          jeffArray.push('jeff') //Push 'jeff' to jeffArray
        }
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
  bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`) //Set Activity


  /* OLD - Activity selection
  if (bot.guilds.size > 1) //If bot is serving more than 1 guild
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`) //Set Activity
  }
  else //If bot is serving less than 2 guilds
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guild`); //Set Activity
  }
  */
  
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

