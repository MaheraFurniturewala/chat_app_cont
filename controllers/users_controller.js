const User = require('../models/user');
//no asyync here since only one callback 


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
    
            title: 'User Profile',
            // cannot use user since it is already in locals so we need to use some other variable
            profile_user: user
        });

    });
}

module.exports.update = function(req,res){
    //first we need to check that the current signd in useer is same as user who is making update request . because nyone could make an id and change the id in the form and the profile would actually get updated
    if(req.user.id == req.params.id){
        // updating the body of the request i.e. the name and the mail OR we could do: {name:req.body.name, email: req.body.email}
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
// now if someone is fiddling with system: usig http status codes
    }else{
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}