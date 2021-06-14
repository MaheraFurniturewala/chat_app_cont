// const mongoose=require('mongoose');

// const postSchema= new mongoose.Schema({
//     //fields
//     //the post by the user
//     content:{
//         type:String,
//         required:true 
//     },
//     user:{
//         //whatever is the post is linked to a user so we need to make a reference to the user schema
//         //this is referring to an ObjectID(its a type)
//         type: mongoose.Schema.Types.ObjectId,
//         //refer to which schema
//         ref:  'User'


//     },
//     // include the array of the ids of all comments in this post schema itself
//     //here its an array because one post can have many comments
//     ///in user it was not an array since one post can have only one user
//     comments:[
//          {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'comment'
//     }
// ]
// },{
//     timestamps:true
// });

// const Post = mongoose.model('Post',postSchema);
// module.exports= Post;


const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;