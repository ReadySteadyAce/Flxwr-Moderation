const { Client, IntentsBitField, Events, ActivityType, Collection } = require('discord.js');
const con = require('./sql/database.js');
const { clientToken } = require('./config.json');

const client = new Client({
    intents: [ IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildBans, IntentsBitField.Flags.MessageContent ]
});

client.xpCooldown = new Collection();

function generateXP() {
    return Math.floor(Math.random() * 4);
}

client.on(Events.ClientReady, () => {
    console.log('Flxwer Moderation is ready.');
    con.query('SELECT * FROM xp', (err) => {
        if (err) throw err;
    
        console.log('Database connected.');
    });
    client.user.setActivity('Loading client.', { type: ActivityType.Playing });
    client.user.setStatus('idle');
    setTimeout(() => {
        client.user.setActivity('for commands.', { type: ActivityType.Watching });
        client.user.setStatus('online')
    }, 15000);
});

client.on(Events.MessageCreate, (msg) => {
    if (msg.author.bot) return;

    if (client.xpCooldown.has(msg.author.id)) return;
    con.query(`SELECT * FROM xp WHERE userId = '${msg.author.id}'`, (err, rows) => {
        let sql;

        if (rows.length == 0) {
            sql = `INSERT INTO xp(userId, xp) VALUES ('${msg.author.id}', '${generateXP()}')`;
        } else {
            sql = `UPDATE xp SET xp = '${rows[0].xp + generateXP()}' WHERE userId = '${msg.author.id}'`;
        }

        con.query(sql, (err) => {
            if (err) throw err;
        });

        client.xpCooldown.set(msg.author.id, '0')
        setTimeout(() => {
            client.xpCooldown.delete(msg.author.id);
        }, 8000);
    });
});

client.login(clientToken);