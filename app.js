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
    if (JSON.parse(req.responseText) !== undefined) {
        result = JSON.parse(req.responseText);
        count = result.response.player_count;
    }
}

function setBotActivity() {
    getActiveUsers();
    client.user.setActivity(": " + count + " on Steam", { type: 'PLAYING'});
    setTimeout(setBotActivity, refreshTime);
}