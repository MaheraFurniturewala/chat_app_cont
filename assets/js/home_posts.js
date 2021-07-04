{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault(); //wont allow to submit the form again

            //now submit the form using AJAX
            $.ajax({
                type:"post",
                url:"/posts/create",
                //the data we are sending to create the post
                //serialize  converts the form data into JSON
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                },
                error: function(error){
                    //in error it is responseText, data will already be a JSON data
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM using



    createPost();
}
