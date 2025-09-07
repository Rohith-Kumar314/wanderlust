const express = require("express");
const router = express.Router({ mergeParams: true });//if we dont use mergeParams:true , id is not fetched from the parent , those params are not merged in parent(app.js) and child(review.js) 
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const mongoose = require("mongoose");
const reviewController = require("../controllers/reviews.js")
const {
  isLoggedin,
  validateReview,
  isReviewAuthor
} = require("../middleware.js");


//post review route
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports = router;