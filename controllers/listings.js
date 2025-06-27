const Listing = require("../models/listing");

module.exports.index= async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        }
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing You Requested for does not exists");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs",{listing});
    }
    
};

module.exports.createListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(filename,"....",url);
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New Listing Created!");
    res.redirect('/listings');
};

module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    let originalImageURl = listing.image.url;
    originalImageURl = originalImageURl.replace("/upload","/upload/c_fill,h_200,w_200")
    if(!listing){
        req.flash("error","Listing You Requested for does not exists");
        res.redirect("/listings");
    }else{
        res.render("listings/edit.ejs",{listing,originalImageURl});
    } 
};

module.exports.updatListing = async (req,res)=>{
    let {id} = req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){     
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};