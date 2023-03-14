const tmi = require("tmi.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// SETUP
const createClient = () => {
  const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
      reconnect: true,
      secure: true,
    },

    // Lack of the identity tags makes the bot anonymous and able to fetch messages from the channel
    // for reading, supervision, spying, or viewing purposes only
    channels: [`${process.env.TWITCH_CHANNEL}`],
    identity: {
      username: process.env.TWITCH_BOT_USERNAME,
      password: process.env.TWITCH_BOT_OAUTH,
    },
  });
  return client;
};

// CONNECTION
// Connect to the channel specified using the setings found in the configurations
const connectClient = () => {
  const client = createClient();
  try {
    client.connect();
    return client;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const sayNewSong = (client, song) => {
  client.say("#diaz1", `Dance ${song}`);
};

const sayRepeatSong = (client, song, count) => {
  client.say("#diaz1", `FeelsTiredMan Song ${count}/10`);
};

const sayOutroSong = (client) => {
  client.say("#diaz1", `peepoSadJam / sometimes peepo`);
};

module.exports = { connectClient, sayNewSong, sayRepeatSong, sayOutroSong };
