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

module.exports.create = async function(req, res){
try{
    let post = await Post.findById(req.body.post);
    if (post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();

        req.flash('success',"Comment published");

        res.redirect('/');
    }
}catch(err){
    req.flash('error',err);
    return res.redirect('back');
}

   
}

//before removing the comment object from the comment collection we first need to store the id of the post of that comment from the comment schema in a variable and then delete the comment object and then using the variable we can find the post and in the comment array using req.params.id we can delete the comment of that id. if we do not do this and first directly delete the comment object in the comment schema then we will not be able to access the post in which we have that comment in the array

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            //before we can just delete the comment we also need to fetch the post id of that comment because we need to go inside that post and find the comment and delete it
            let postId = comment.post;
            comment.remove();
            //we need to remove and update the collection, pull:id which i need to pull out from connects(close to native mongodb syntax )
            let post = await Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});

            req.flash('success',"Comment deleted");

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}