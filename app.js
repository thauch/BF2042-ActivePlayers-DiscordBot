const Discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client({ intents: 641 });

const botToken = "";
const refreshTime = 60000 // 60s

client.login(botToken);
client.on('ready', () => {
    setBotActivity();
	console.log(`Logged in as ${client.user.tag}!`);
});

function getActiveUsers() {
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=1517290&format=json", false);
    req.send(null);
    let result = JSON.parse(req.responseText);
    return result.response.player_count;
}

function setBotActivity() {
    client.user.setActivity(": " + getActiveUsers(), { type: 'PLAYING'});
    setTimeout(setBotActivity, refreshTime);
}