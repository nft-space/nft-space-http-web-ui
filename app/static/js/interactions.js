let interactionMethods= {
    init: function(){
    },
    ajaxPostCall: function (path, data){
        return $.ajax(
            {url: path, type: "POST", dataType: "json", data:data}
        );
    },
    toggleHeart: function(heartId){
        authenticationMethods.isLoggedIn().then(
            (isLoggedInBool)=>{
                 let isLoggedInVal=JSON.parse(isLoggedInBool);
                 if (isLoggedInVal == true){
                    // Element ID is used - assigning value to a div is tedious
                    let heartIdSplitList = heartId.split('-')
                    let $clickedHeart = $(`#${heartId}`)
        
                    // Update activation status class for CSS render
                    $clickedHeart.toggleClass("is-active");

                    this.submitLike(heartId)
        
                    // Print heart activation status alongside corresponding image ID
                    console.log('Heart activation status + image ID:', $clickedHeart.is('.is-active'), heartId )
                }
                else{
                    authenticationMethods.getSignature()
                }
                 },
            (error)=>{console.log(error);}
        )
    },
    toggleBookmark: function(bookmarkId){
        authenticationMethods.isLoggedIn().then(
            (isLoggedInBool)=>{
                 let isLoggedInVal=JSON.parse(isLoggedInBool);
                 if (isLoggedInVal == true){
                    this.submitBookmark(bookmarkId)
                }
                else{
                    let $clickedBookmark = $(`#${bookmarkId}`)
                    $clickedBookmark.prop('checked', false);
                    authenticationMethods.getSignature()
                }
                 },
            (error)=>{console.log(error);}
        )
    },
    toggleFollowButton: function(followButtonId){
        authenticationMethods.isLoggedIn().then(
            (isLoggedInBool)=>{
                 let isLoggedInVal=JSON.parse(isLoggedInBool);
                 if (isLoggedInVal == true){
                    this.submitFollow(followButtonId)
                }
                else{
                    let $clickedFollowButton = $(`#${followButtonId}`)
                    $clickedFollowButton.prop('checked', false);
                    authenticationMethods.getSignature()
                }
                 },
            (error)=>{console.log(error);}
        )
    },
    toggleCommentLike: function(commendId){
        authenticationMethods.isLoggedIn().then(
            (isLoggedInBool)=>{
                 let isLoggedInVal=JSON.parse(isLoggedInBool);
                 if (isLoggedInVal == true){
                    // Collect relevent IDs embedded in the the comment heart (ID form: nft-<nftId>-comment-<commentId>)
                    let commentIdSplitList = commendId.split('-')
                    let nftIndexer = commentIdSplitList.indexOf("nft")
                    let commentIndexer = commentIdSplitList.indexOf("comment")
                    let nftIdSlice = commentIdSplitList.slice(nftIndexer + 1 , commentIndexer)
                    let commentIdSlice = commentIdSplitList.slice(commentIndexer + 1, commentIdSplitList.length - 1)

                    $(`#${commendId}`).toggleClass("is-active");

                    // Collect comment like data
                    let commentLikeData = {
                        nft_address : nftIdSlice.join("-"),
                        comment_id : commentIdSlice.join("-"),
                        liked_by_user: $(`#${commendId}`).is('.is-active')
                    }
                    // Prepare data for POST
                    let postData = {
                        commentLikeData: JSON.stringify(commentLikeData)
                    }
                    let postPath = '/submit-comment-like'
                    console.log ("Comment like not yet implemented as POST")
                    // POST data using ajax
                    this.ajaxPostCall(postPath, postData).then(
                        (success)=>{console.log("comment form successfully posted")},
                        (error)=>{console.log("failed to post registration form", error)}
                    )

                }
                else{
                    authenticationMethods.getSignature()
                }
                 },
            (error)=>{console.log(error);}
        )
    },
    submitComment: function(commentId){
        authenticationMethods.isLoggedIn().then(
            (isLoggedInBool)=>{
                 let isLoggedInVal=JSON.parse(isLoggedInBool);
                 if (isLoggedInVal == true){
                    // Collect relevent IDs embedded in the the comment submit button (ID form: comment-nftId)
                    let commentIdSplitList = commentId.split('-')
                    // Collect comment like data
                    let commentData = {
                        nft_address : commentIdSplitList[1],
                        comment_content: $("#commentInput").val()
                    }
                    // Prepare data for POST
                    let postData = {
                        commentData: JSON.stringify(commentData)
                    }
                    let postPath = '/submit-comment'
                    // POST data using ajax
                    this.ajaxPostCall(postPath, postData).then(
                        (success)=>{console.log("comment form successfully posted")},
                        (error)=>{console.log("failed to post registration form", error)}
                    )
                }
                else{
                    authenticationMethods.getSignature()
                }
            },
            (error)=>{
                console.log(error);
            }
        );
    },
    submitUserForm: function(userPublicKey){
        authenticationMethods.isLoggedIn().then(
            (isLoggedInBool)=>{
                 let isLoggedInVal=JSON.parse(isLoggedInBool);
                 if (isLoggedInVal == true){
                    let registrationFormData = {
                        user_name: $("#registrationUsernameInput").val(),
                        email_address: $("#registrationEmailInput").val(),
                        user_bio: $("#registrationBioInput").val(),
                        src: $("#registrationSrc").val(),
                        twitter_link : $("#registrationTwitterLinkInput").val(),
                        instagram_link : $("#registrationInstagramLinkInput").val(),
                        website_link: $("#registrationWebsiteLinkInput").val()
                    }
                    // post registration form data 
                    let postData = {
                        registrationFormData: JSON.stringify(registrationFormData)
                    }
                    let postPath = '/submit-registration-form'
                    this.ajaxPostCall(postPath, postData).then(
                        (success)=>{
                            console.log("registration form successfully posted");
                            // redirect to the mynft page after 
                            window.location.href=`/profile/${userPublicKey}`
                    },
                        (error)=>{console.log("failed to post registration form", error)}
                    )
                }
                else{
                    authenticationMethods.getSignature()
                }
            },
            (error)=>{
                console.log(error);
            }
        );
    },
    submitBookmark: function(bookmarkId){
        // Collect relevent IDs embedded in the the comment submit button (ID form: bookmark-nftId)
        let bookmarkIdSplitList = bookmarkId.split('-')
        // Collect comment like data
        let bookmarkData = {
            nft_address : bookmarkIdSplitList[1],
            saved_by_user: $(`#${bookmarkId}`).prop('checked')
        }
        // Prepare data for POST
        let postData = {
            bookmarkData: JSON.stringify(bookmarkData)
        }
        let postPath = '/submit-bookmark'
        // POST data using ajax
        this.ajaxPostCall(postPath, postData).then(
            (success)=>{console.log("comment form successfully posted")},
            (error)=>{console.log("failed to post registration form", error)}
        )
    },
    submitLike: function(heartId){
        // Collect relevent IDs embedded in the the comment submit button (ID form: bookmark-nftId)
        let likeIdSplitList = heartId.split('-')
        // Collect comment like data
        let likeData = {
            nft_address : likeIdSplitList[1],
            liked_by_user: $(`#${heartId}`).is('.is-active')
        }
        // Prepare data for POST
        let postData = {
            likeData: JSON.stringify(likeData)
        }
        let postPath = '/submit-like'
        // POST data using ajax
        this.ajaxPostCall(postPath, postData).then(
            (success)=>{console.log("comment form successfully posted")},
            (error)=>{console.log("failed to post registration form", error)}
        )
    },
    submitFollow: function(followButtonId){
        // Element ID is used - assigning value to a div is tedious
        let followIdSplitList = followButtonId.split('-')
        console.log(followButtonId)
        let $clickedFollowButton = $(`#${followButtonId}`)
        // Collect comment follow data
        let followData = {
            artist_address : followIdSplitList[1],
            followed_by_user: $clickedFollowButton.prop('checked')
        }
        // Prepare data for POST
        let postData = {
            followData: JSON.stringify(followData)
        }
        let postPath = '/submit-follow'
        // POST data using ajax
        this.ajaxPostCall(postPath, postData).then(
            (success)=>{console.log("comment follow successfully posted")},
            (error)=>{console.log("failed to post follow", error)}
        )  
    }
};
