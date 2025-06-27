const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;


    await newReview.save();
    await listing.save();
    req.flash("success","New Review Is Created!");
    console.log(newReview);
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,
        {$pull:{reviews:new mongoose.Types.ObjectId(reviewId)}});
    
    // Find the listing to check if the reviewId is gone
    const listing = await Listing.findById(id);
    console.log(listing.reviews); // should not contain the deleted reviewId
    req.flash("success","review Deleted!");
    res.redirect(`/listings/${id}`);
}