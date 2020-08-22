const Discord     = require("discord.js");
const client      = new Discord.Client({fetchAllMembers: true})

const http 	  = require('http');
const url  	  = require('url');
const cron        = require("node-cron");

var statusText         = `Rawr!`;
const token            = "";
const portDiscordCount = 250;
const portTimer        = 251;
var count              = 0;
var timer              = 0;
var starting           = 600; // in seconds

//Evry second
cron.schedule('* * * * * *', () => {
	if(timer === 0)
	{
		timer = starting;
	}
	timer = timer - 1;
	console.log("oifhsiohfo");
});

http.createServer((req, res) => {
	let responseCode = 200;
	let content = '';
	
	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	const urlObj = url.parse(req.url, true);

    	if(urlObj.pathname === '/discordmembers')
	{
		content = content + 
		`<script>setTimeout(function(){location.reload()},10);</script><!DOCTYPE html><html><body><font face="verdana"><h1 style="color:white;font-size:300px;font-weight: bold;">${count}</h1></font></body></html>`;

	}
	else if (urlObj.pathname === "/timer10min")
	{
		var tmp = timer % 60;
		if (tmp < 10)
		{
			tmp = `0${tmp}`;
		}
		content = content + 
		`<script>setTimeout(function(){location.reload()},10);</script><!DOCTYPE html><html><body><font face="verdana"><h1 style="color:white;font-size:300px;font-weight: bold;">${( timer - (timer % 60) ) / 60}:${tmp}</h1></font></body></html>`;
	}
	else
	{
		content = "invalid path!";
	}

    res.write(content);
    res.end();
})
.listen(portDiscordCount);

client.on("ready", async () => {   
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);  
	count = client.users.cache.size;
});

client.on("guildMemberAdd", async member => {
	count = count + 1;
});

client
  .on("reconnecting", () => {
    console.warn("reconnecting...");
  })
  .on("disconnect", () => {
    console.warn("Warning! disconnected!");
});

client.login(token);
