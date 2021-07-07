//this script is included in home.ejs

{
    //method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $("#new-post-form");

        newPostForm.submit(function (e) {
            e.preventDefault(); //wont allow to submit the form again

            //now submit the form using AJAX
            $.ajax({
                type: "post",
                url: "/posts/create",
                //the data we are sending to create the post
                //serialize  converts the form data into JSON(actually URL encoded which can be used in query string )
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost=newPostDom(data.data.post);
                    //prepend-putting it at the first position
                    //so whatever new post is added it is added at the first position
                    $('#posts-list-container>ul').prepend(newPost);
                    //adding the delete function on every post that is created
                    //has to be inside of the new post
                    //there is a space
                    deletePost($(' .delete-post-button',newPost)); //returns object to class in the newPost object
                },
                error: function (error) {
                    //in error it is responseText, data will already be a JSON data
                    console.log(error.responseText);
                },
            });
        });
    }; 

    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
            <p>
            <!-- comparing as strings -->
            
                <small>
                    <!-- delete button -->
                    <a class="delete-post-button" href="posts/destroy/${post._id}">X</a>
                    <!-- same as ._id since it  is going to be converted to a string -->
                </small>
                
                    ${post.content}
                        <br>
                        <small>
                           ${ post.user.name }
                        </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..."
                        required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
    
              
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">
                            
                        </ul>
    
                    </div>
        </div>
    
    </li>`);
    }

    //method to delete a post from the DOM
    //in deleteLink the 'a' tag will be passed on 
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            //prevent natural behaviour of clicking on a link and going somewhere
            e.preventDefault;

            $.ajax({
                type: 'get',
                //this is how the value of the href in a tag is got
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }

            })
        })
    }

    createPost();
    //this will only create a new post the older posts are going to be displayed through the _post.js file only
}