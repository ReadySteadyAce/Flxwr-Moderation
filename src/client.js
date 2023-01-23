const { Client, IntentsBitField, Events, ActivityType, Status } = require('discord.js');
const { clientToken } = require('./config.json');

const client = new Client({
    intents: [ IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildBans, IntentsBitField.Flags.MessageContent ]
});

client.on(Events.ClientReady, () => {
    console.log('Flxwer Moderation is ready.');

    client.user.setActivity('Loading client.', { type: ActivityType.Playing });
    client.user.setStatus('idle');
    setTimeout(() => {
        client.user.setActivity('for commands.', { type: ActivityType.Watching });
        client.user.setStatus('online')
    }, 60000);
})

client.login(clientToken);