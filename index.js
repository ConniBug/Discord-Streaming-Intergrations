const http    	  = require('http');
const Discord 	  = require("discord.js");
const client  	  = new Discord.Client({fetchAllMembers: true})

const port 	  = 250;
var   count  	  = 0;
var   token  	  = "";
var   statusText  = `Rawr!`;

http.createServer((req, res) => {
	let responseCode = 200;
	let content 	 = '';
	
	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	content = content + 
	`<script>setTimeout(function(){location.reload()},1000);</script><!DOCTYPE html><html><body><font face = "verdana"><h1 style="color:white;font-size:300px;font-weight: bold;">${count}</h1></font></body></html>`;

    res.write(content);
    res.end();
})
.listen(port);

client.on("guildMemberAdd", member => {
	count = count + 1;
});

client.on("ready", async () => {   
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);  
    client.user.setActivity(statusText);    
    count = client.users.cache.size;
});

client
  .on("reconnecting", () => {
    console.warn("reconnecting...");
  })
  .on("disconnect", () => {
    console.warn("Warning! disconnected!");
});

client.login(token);
