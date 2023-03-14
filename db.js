const { query } = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoAtlasUri = process.env.MONGO_DB;

const connectToDB = () => {
  mongoose
    .connect(mongoAtlasUri, {
      dbName: "musicDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(" Mongoose is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

// SCHEMAS
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const songSchema = new Schema({
  name: String,
  dailyCount: Number,
  totalCount: Number,
});

// MODELS
const Song = mongoose.model("Song", songSchema);

// FUNCTIONS
const listSongs = () => {
  Song.find({}, function (error, docs) {
    console.log(docs);
  });
};

const findSong = (songName) => {
  Song.find({ songName }, function (error, docs) {
    console.log(docs);
  });
};

const searchSong = async (songName) => {
  try {
    const res = await Song.findOneAndUpdate(
      { name: songName },
      { $inc: { dailyCount: 1 } },
      { new: true }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

const clearSongs = () => {
  console.log("CLEARING ALL SONGS");
  Song.updateMany({}, [
    {
      $set: {
        totalCount: {
          $add: ["$totalCount", "$dailyCount"],
        },
      },
      $set: {
        dailyCount: 0,
      },
    },
  ]).then((res) => {
    console.log(res);
  });

  // Song.aggregate()
  //   .addFields({
  //     count: { $add: ["$count", "$dailyCount"] },
  //   })

  // .then((res) => {
  //   console.log(res);
  // });
};

module.exports = {
  connectToDB,
  listSongs,
  findSong,
  searchSong,
  clearSongs,
};
