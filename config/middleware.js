module.exports.setFlash = function(req,res,next){
    //we will find the flassh from the req and set it up in the locals of the response(where it will be accessed in the templates)
    //but the reason to use connect-flash was since it stores it in the session and lets it go the next time

    //this is an object
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error') //not being used
    }
    next();
}

