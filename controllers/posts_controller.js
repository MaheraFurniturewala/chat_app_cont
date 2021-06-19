const Post = require('../models/post');
const Comment = require('../models/comment');

//in this function it is not really needed sinnce it is just one level of callback
module.exports.create = async function (req, res) {

    try{
        let posts = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    
        return res.redirect('back');
    }
    catch(err){
        console.log("Error", err);
        return;
    }
   
}

//    // this function is good in async await because first post found then comment found so morelevels of call backs
// module.exports.destroy = function (req, res) {
//     //before deleting a post we must find whether it exists in the db or not 
//     // the url would be like /posts/destroy/id(params)
//     Post.findById(req.params.id, function (err, post) {
//         //another person is not allowed to delete anyones post (authorization)
//         //post.user == id of the user(model schema)
//         //ideally it should have been req.user._id but when i am comparing id's of two objects i need to convert them into string therfeore mongoose tell us to write it as .id
//         if (post.user == req.user.id) {
//             // .id means converting the objecct id into string
//             post.remove();
//             //deleteMany deletes all the comments based on the query passed
//             //here also string are being matched
//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });
//         }
//         else {
//             return res.redirect('back');
//         }
//     });
// }
module.exports.destroy = async function (req, res) {
    try{
        let post = Post.findById(req.params.id);
        //if this query is successful the response of that call back function which had post in, that post will be assigned to post varibale
    
        if (post.user == req.user.id) {
                
            post.remove();
      
            let comment = await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error", err);
        return;
    }
    
   
}