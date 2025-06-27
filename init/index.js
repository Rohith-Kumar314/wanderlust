const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("./../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
    console.log("Connected to DB throu index.js in int");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"6847d1495d68c6f9ac057689",
    }));///this init line adds a single user to every listing. it spreads , and adds new object to it
    await Listing.insertMany(initData.data);
    console.log("Data Was Initialised");
}

initDB();