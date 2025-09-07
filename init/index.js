if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: __dirname + "/../.env" });

}


const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("./../models/listing.js");
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"68bd3350dd357f7ea7b6935a",
    }));///this init line adds a single user to every listing. it spreads , and adds new object to it
    await Listing.insertMany(initData.data);
    console.log("Data Was Initialised");
}

initDB();

// init db function erases all previous data which exists in the db . and adds data from data.js