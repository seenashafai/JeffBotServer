# jeffbot-v3

A Discord bot named Jeff

_Uses_:

Best used as a mute function: assign the user in question with the Role, then add the Role ID to the relevant section in ```app.js``` and watch as the user is unable to send any messages. Instead, for every message they send, JeffBot will post a message with every word replaced with Jeff. The user will also receive a DM from JeffBot announcing to them that they have been Jeffed.

_Development Files_:  

	app.js: Contains the code executed by the bot after being activated

	config.js: Contains confidential information about the bot


_Config.js Setup_:

As the ``` config.js ``` file contains confidential information, you need to construct the file yourself if you want to use this code. Set up the file as such:

```
{
  "token": "YOUR-TOKEN-HERE", //Token retrieved from your discord developer portal
  "prefix": ">" //Prefix for bot commands- can be set to anything
}
```

_Additional Notes_:

The message must be deleted and reposted, rather than edited as Discord's Terms of Service do not allow editing of other users' messages for obvious reasons
