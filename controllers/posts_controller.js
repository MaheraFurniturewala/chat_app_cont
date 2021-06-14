const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) { console.log('error in creating a post'); return; }

        return res.redirect('back');
    });
}

module.exports.destroy = function (req, res) {
    //before deleting a post we must find whether it exists in the db or not 
    // the url would be like /posts/destroy/id(params)
    Post.findById(req.params.id, function (err, post) {
        //another person is not allowed to delete anyones post (authorization)
        //post.user == id of the user(model schema)
        //ideally it should have been req.user._id but when i am comparing id's of two objects i need to convert them into string therfeore mongoose tell us to write it as .id
        if (post.user == req.user.id) {
            // .id means converting the objecct id into string
            post.remove();
            //deleteMany deletes all the comments based on the query passed
            //here also string are being matched
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}