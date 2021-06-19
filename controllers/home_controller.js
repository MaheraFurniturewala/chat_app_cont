const Post = require('../models/post');
const User = require('../models/user');


// module.exports.home = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);
//     //this query will return all the posts
//     // Post.find({},function(err,posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts: posts
//     //     });
//     // })
//     //post.find.populate is the query and the exec has the callback
//     //here the syntax changes
//     //whenever you are making the query longer you write down the whole  query and then callback
//     //you are finding all the posts and populating user of each pos
//     Post.find({})
//     //we are populating multiple models-->1)the comment and  the user of that comment
//     //nested prepopulating
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec(function(err,posts){

//           User.find({},function(err,users){

//             return res.render('home',{
//                 title: "Codeial | Home",
//                 posts : posts,
//                 all_users: users
//             });
//           })

        
//     });
// }
    


// 3 ways in which this can be executed 1)normal as shown above using exec  2)Promises  3)Async-Await
// post.user is an id since it is type ObjectID

// module.exports.actionName = function(req, res){


// using then (promises) in above code it was given by exec function
//Post.find({})'.populate('comments).then(function());


//let posts = Post.find({})'.populate('comments).exec();

// posts.then()

// Async await tells your server that this function contains some asynchronous statements and you need to wait with each asynchronous statement(which has been marked as asynchronous) and once it gets executed then move on to the next statement.


// SO first we need to tell server that home is an asynchronous function and you need to first await for posts and then await for  user(2 awaits) and only then return the function. 



//async declares that this function contans some async statemnets

module.exports.home = async function(req, res){
    try{
        //success response will be stored in posts variable i.e. the list of all the post objects
        let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    //all the users being found will be stored in users variable
    let users = await User.find({});
        
    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users: users
    });

    }catch(err){
        console.log("Error", err);
        return;

    }

    
}


// module.exports.actionName = function(req, res){}