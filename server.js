// Dependenciesclie
const twitch = require("./client");
const tmi = require("tmi.js");
const mongo = require("./db");

// Server
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

// Startup set up
// const client = twitch.connectClient();
const db = mongo.connectToDB();

app.listen(port, () => {
  // Connection to DB & Twitch client
  console.log(`App listening at http://localhost:${port}`);
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// List all songs
app.get("/song/list", async (req, res) => {
  try {
    const songName = req.query.name;
    mongo.listSongs(songName);
  } catch (err) {
    console.log(err);
  }
});

// Increment dailycount for a song
app.get("/song", async (req, res) => {
  try {
    const songName = req.query.name;
    mongo.updateSong(songName);
    // twitch.say(client, songName);
    // console.log("Song is:", songName);
  } catch (err) {
    console.log(err);
  }
});

// Clear dailycount of songs
app.get("/song/clear", async (req, res) => {
  try {
    mongo.clearSongs();
  } catch (err) {
    console.log(err);
  }
});
