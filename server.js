// server.js
// To launch server, enter 'node server.js' in terminal

/* Initialise Project Server Calls */
const http = require('http');
const express = require('express');
const date = require('date');
const app = express();
const fs = require('fs')

/* Initialise discord.js Calls */
const Discord = require('discord.js'); //Calling discord.js Package
const bot = new Discord.Client(); //Initialise discord bot instance
const embed = new Discord.RichEmbed()
    .setTitle("Find JeffBot on GitHub")
    .setAuthor("Created by seenaweena")
    .setColor(0x00AE86)
    //.setThumbnail("http://i.imgur.com/p2qNFag.png")
    .setDescription("To begin the work of JeffBot, type >start \nTo create Jeffinators, use >jeffinator- only Jeffinators can Jeff others \nHaving created Jeffinators, give users the role of Jeffinator with >jeffinate @user \nArmed with the role of Jeffinator, you may Jeff a user like so: >jefficate @user \nJeffinators may also unJeff Jeffed users, like so: >unjefficate @user \nRegular users may not Jeffinate themselves- please be patient and allow senior Jeffinators to Jeffinate you if they so please \nJeffed users may not unJeff themselves, and only Jeffinators may Jeff others \n")
    .addBlankField()
    .setTimestamp()
    .setURL("https://github.com/seenashafai/jeffbot-v3")
    .addField("How to use JeffBot", ">jefficate Jeff someone \n>unjefficate to unjeff someone \n>jeffinate to give someone the ability to jefficate others")
    .addBlankField()
    .addField("Basic Debugging", "if the bot is ignoring the Jeff/Jeffinator roles, test whether the bot has detected the Jeff roles in your server. To test this, use >findjeff and >findjeffinator")

    .addBlankField()
    .setFooter("Thank you for using Jeffbot. Have a Jefftastic time!");


//global variables
var jeffRole = '';
var jeffinatorRole = '';

//global constants
const prefix = ">";
const jeff = "jef"; //placeholder: remove and replace periodically to stop things from being deleted from inactivity?

/* Listener Event: Message Received */
bot.on('message', async message => {


        /* Command-Argument separator */
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        /* Variables */
        let msg = message.content.toUpperCase(); //Converts entire message to upper case

        /* Checks for botception */
        if (message.author.bot) return;

        /* Ping Pong Function */
        if (msg === ">" + 'PING') //Checks for presence of prefix
        {
            const m = await message.channel.send("Ping?");
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
            var timenow = Date.now();
            fs.appendFile("public/log.log", timenow + " Pongged user " + message.author.username + '(' + message.author + ') on server '+ message.guild.name + '\n', function (err) {
                if (err) {
                    return console.log(err);
                }
            })
        };

        if (msg === ">" + 'HELP') 
        {
          message.channel.send({embed});
          var timenow = Date.now();
          fs.appendFile("public/log.log", timenow + " Helped user " + message.author.username + '(' + message.author +') on server '+ message.guild.name +  '\n', function (err) {
          if (err) {
            return console.log(err);
            }
          })
        };
       
        if (msg === ">" + 'START') 
        {
            message.guild.createRole({name: 'Jeff'});
            message.channel.send('It is done');
            jeffRole = message.guild.roles.find("name", "Jeff");
            message.channel.send('Please now use >jeffinate to begin the rise of the Jeffinators')
            var timenow = Date.now();
            fs.appendFile("public/log.log", timenow + " Initialized Jeff on server " + message.guild.name + '\n', function (err) {
            if (err) {
              return console.log(err);
            }
          })
        };
                          
        if (msg === ">" + 'JEFFINATOR') {
            message.guild.createRole({name: 'Jeffinator'});
            message.channel.send('It is done');
            jeffinatorRole = message.guild.roles.find("name", "Jeffinator")
        }


        if (msg === ">" + 'FINDJEFF') 
        {
            jeffRole = message.guild.roles.find("name", "Jeff");
            if (!jeffRole) {
                message.channel.send('JeffBot cannot find his Jeff role. Please delete any roles called Jeff and then run >start')
            }
            else {
                message.channel.send('Never fear, Jeff is indeed here')
            }
            var timenow = Date.now();
            fs.appendFile("public/log.log", timenow + " Jeff was searched for by user " + message.author.username + '(' + message.author + ') on server '+ message.guild.name + '\n', function (err) {
            if (err) {
                return console.log(err);
            }
          })
        };
          
        if (msg === ">" + 'FINDJEFFINATOR') {
            jeffinatorRole = message.guild.roles.find("name", "Jeffinator");
            if (!jeffRole) {
                message.channel.send('JeffBot cannot find his Jeffinator role. Please delete any roles called Jeffinator and then run >jeffinate')
            }
            else {
                message.channel.send('Never fear, Jeffinator is indeed here')
            }
            var timenow = Date.now();
            fs.appendFile("public/log.log", timenow + " Jeffinator was serached for by user " + message.author.username + '(' + message.author +') on server '+ message.guild.name +  '\n', function (err) {
            if (err) {
              return console.log(err);
            }
          })
        };
  
        if (msg === ">" + 'PURGEJEFF') 
        {
            console.log('purgejeff');
            message.channel.send('Execute order Jeffty-Jeff');
            message.guild.roles.get(jeffRole.id).delete();
            message.channel.send('It is done my lord');
            var timenow = Date.now();
            fs.appendFile("public/log.log", timenow + " Jeff was purged by user " + message.author.username + '(' + message.author + ') on server '+ message.guild.name + '\n', function (err) {
            if (err) {
              return console.log(err);
            }
          })
        };
  
        if (command === 'jefficate')
        {
            jeffinatorRole = message.guild.roles.find("name", "Jeffinator");
            if (message.member.roles.has(jeffinatorRole.id)) {
                jeffRole = message.guild.roles.find("name", "Jeff");
                let member = message.mentions.members.first() || message.guild.members.get(args[0]);
                if (!member) {
                    message.reply("Please mention a valid member of this server");
                }
                member.addRole(jeffRole).catch(console.error);
                message.channel.send(member.user.username, 'jefficated');
                console.log(member.user.username, 'jefficated');
            }
            else {
                message.channel.send("You do not have permission to use this command")
            }
        }


        if (command === 'unjefficate') 
        {
            jeffRole = message.guild.roles.find("name", "Jeff");
            if (message.member.roles.has(jeffRole.id)) {
                //Checks for role (Jeff), Role ID hardcoded and prevents self-unjeffication
                console.log(message.member.user.username, 'tried to unjefficate themself...');
                message.channel.send(message.member.user.username, 'tried to unjefficate themself...');
                message.author.send("Resistance is futile")
            }
            else {
                jeffRole = message.guild.roles.find("name", "Jeff");
                let member = message.mentions.members.first() || message.guild.members.get(args[0]);
                if (!member)
                    return message.reply("Please mention a valid member of this server");
                member.removeRole(jeffRole).catch(console.error);
                message.channel.send(` ${message.channel.send} unjefficated`);
                console.log(member.user.username, 'unjefficated');
            }
        }

        if (command === 'jeffinate') 
        {
            jeffinatorRole = message.guild.roles.find("name", "Jeffinator");
            if (message.member.roles.has(jeffinatorRole.id)) {
                let member = message.mentions.members.first() || message.guild.members.get(args[0]);
                if (!member) {
                    message.reply("Please mention a valid member of this server");
                }
                member.addRole(jeffinatorRole).catch(console.error);
                console.log(message.member.username, 'was jeffinated');
                message.channel.send(message.member.username, "has become a Jeffinator")
            }
            else {
                message.channel.send("You must be a Jeffinator to use this command")
            }
        }


        /* Delete message and replace with Jeffs */

        if (!jeffRole) return;
        if (message.member.roles.has(jeffRole.id)) //Checks for roleID of role 'Jeff' initialised on >Start
        {
            /*  Handling original user message */
            message.delete(); //Delete the user's message from the chat channel
            let splitStringArray = message.content.split(" "); //Split message into words, create array of words
            let msgWordCount = splitStringArray.length; //Check how many words in the original message

            /*  For Loop to create array of 'jeff' */
            var i; //Declare loop variable
            let jeffArray = []; //Declare empty array
            jeffArray.push('Jeff');
            if (msgWordCount > 1) {
                for (i = 0; i < msgWordCount - 1; i++) { //Loop through for number of words in message
                    jeffArray.push('jeff') //Push 'jeff' to jeffArray
                }
            }

            /* Outputting jeffArray */
            let jeffString = jeffArray.join(" "); //Turn array into string separated with spaces
            message.channel.send(jeffString); //Send jeffString into chat channel
            message.author.send('You just got Jeffed! Tag your friends to Jeff them also!') //PM author of original message
        }
    
        if(msg.content.toLowerCase().match(/[aeiou]/)) {
        msg.channel.send(msg.content
            .replace(/[aeiou]/ig,'oob')
          
        )}
});



/* Event: Bot startup & successful login*/
bot.on("ready", () => {

    //Output basic statistics of bot to console
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds, oobing activated.`);
    //logger.info(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`)
    bot.user.setActivity(`${bot.users.size} Jeffs in ${bot.guilds.size} Guilds`, {type: "WATCHING"}) //Set Activity
    //bot.user.setActivity(`Performing Maintenance - May be unresponsive`) //Set Maintenence Activity

});

/* Login */
//bot.login(process.env.TOKEN); //Bot login with token defined in config.js

if(!process.env["discord_key"]) console.log("no key found")
bot.login(process.env["discord_key"])

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
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
