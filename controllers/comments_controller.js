// const Comment = require('../models/comment');
// const Post = require('../models/post');
// //first add post and user id to the comments and second add comment to post schema
// module.exports.create = function(req,res){
//     //this is the name of the hidden input wich has name post and has value = post.id
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user: req.user._id,
//             },function(err,comment){
//                 //handle error 

//                 //if comment created then add comment to post
//                 //push to an array
//                 post.comments.push(comment);
//                 //whenever i am updating something i need to call save after it
//                 //save tells the db that this is the final version so block it
//                 post.save();
//                 return res.redirect('/');

//             });
//         }
//     });
// }
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}