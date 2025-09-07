const express = require("express");
const router = express.Router({ mergeParams: true });//if we dont use mergeParams:true , id is not fetched from the parent , those params are not merged in parent(app.js) and child(review.js) 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { route } = require("./listing");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login", 
        failureFlash:true}),
    userController.login//didnt wrote log in logic here . it is already written , and we are using it  from passport 
);

router.route("/signup")
.get(userController.renderSignUpForm)//get sign up form
.post(wrapAsync(userController.signUp))//post signup details to db

router.get("/logout",userController.logout);
module.exports = router;