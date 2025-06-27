const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");



const validateReview =((req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el)=>el.message).join(",");
        console.log(errorMsg);
        throw new ExpressError(400,errorMsg);
    }else{
        next();
    }
});


const isLoggedin=((req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect url save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create Listing");
        return res.redirect("/login");
    }
    next();
});

const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = (async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You Dont Have permission to Edit this");
        return res.redirect(`/listings/${id}`);
    }
    next();
});

const isReviewAuthor = (async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You did not created this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
})

const validateListing = (req, res, next) => {
    // Transform listing.image (string) to listing.image.url (object)
    if (req.body.listing && typeof req.body.listing.image === "string") {
        req.body.listing.image = { url: req.body.listing.image, filename: null };
    }
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
};

module.exports = {
  isLoggedin,
  saveRedirectUrl,
  isOwner,
  validateListing,
  validateReview,
  isReviewAuthor
};
