if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
} 

// console.log(process.env.CLOUD_API_SECRET);

const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { parseArgs } = require("util");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const multer = require("multer");


const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));





const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,//these are added in milliseconds
        maxAge:7*24*60*60*1000,
        httpOnly:true,//to preventfrom cros scripting attacks.
    }
};


// app.get("/",(req,res)=>{
//     res.send("Hello, I am root")
// });

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//these above two middlewares should be used before 2 routes written below

app.use("/listings",listingsRouter);//all listing related routes can be accessed from here
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.use((req, res, next) => {
  const message = `Page not found`;
  res.status(404).render("error.ejs", { message });
});


app.use((err,req,res,next)=>{
    let {status=500,message="Something Went wrong"} = err;
    res.status(status).render("error.ejs",{message});
});


app.listen(8080,()=>{
    console.log("Server is Started");
})


const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";

// const dbUrl = process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(MONGO_URL);
}


main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})