//FILENAME : db.js

const mongoose = require("mongoose");

const MONGOURI = "mongodb://admin:secret@mongodb:27017/Emporio";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;