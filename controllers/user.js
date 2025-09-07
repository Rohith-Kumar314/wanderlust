const User = require("../models/user");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerdUser = await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }else{
                req.flash("success","Welcome to Wanderlus");
                res.redirect("/listings");
            }
        })
       
    }catch(e){
        req.flash("error","A User with given name is registered")
        res.redirect("/signup")
    }
};


module.exports.login = async(req,res)=>{
        req.flash("success" ,"welcome back to wanderlust");
        let redirectUrl= res.locals.redirectUrl || "/listings"; 
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        } 
        req.flash("success","you logged out");
        res.redirect("/listings");
    })
}

// ==============Users related =====================