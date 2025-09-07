
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing, saveRedirectUrl } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index))//show all listings
    .post(isLoggedin,
        upload.single('listing[image]'), validateListing,wrapAsync(listingController.createListing));//save new route
    

//render form to add new 
router.get("/new", isLoggedin, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))//show Route
    .put(isLoggedin, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updatListing))//update listing route
    .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));//delete listing route

//rendering form for edit route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;