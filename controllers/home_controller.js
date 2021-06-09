const Post = require('../models/post');


module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    //this query will return all the posts
    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // })
    //post.find.populate is the query and the exec has the callback
    //here the syntax changes
    //whenever you are making the query longer you write down the whole  query and then callback
    //you are finding all the posts and populating user of each pos
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts : posts
        });
    });
}
    



// post.user is an id since it is type ObjectID

// module.exports.actionName = function(req, res){

