// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Log collections

    // const AirPorts = mongoose.connection.collection("AirPorts");
    // AirPorts.indexes().then((indexes) => {
    //   console.log("Indexes for AirPorts collection:", indexes);
    // });

    // AirPorts.findOne().then((doc) => {
    //   console.log("First document in AirPorts:", doc);
    // });
    // const collections = await mongoose.connection.db
    //   .listCollections()
    //   .toArray();
    // console.log(
    //   "Available collections:",
    //   collections.map((c) => c.name)
    // );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
