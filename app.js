const Discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client({ intents: 641 });

client.login(``);

client.on('ready', () => {
    client.user.setActivity(": " + getActiveUsers() + " active", { type: 'PLAYING'})
	console.log(`Logged in as ${client.user.tag}!`);
});

function getActiveUsers() {
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=1517290&format=json", false);
    req.send(null);
    let result = JSON.parse(req.responseText);
    setTimeout(getActiveUsers, 300000)
    return result.response.player_count;
}
