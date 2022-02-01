let connectionsMethods = {
    init: function(){
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom: function(){
        // DOM Elements for followed
        this.$followedModalButton = $('#followedModalButton');
        this.$followedModal = $('#followedModal');
        this.$followedModalBody = $('#followedModalBody');
        // DOM Elements for following
        this.$followingModalButton = $('#followingModalButton');
        this.$followingModal = $('#followingModal');
        this.$followingModalBody = $('#followingModalBody');
    },
    bindEvents: function(){
        this.$followedModalButton.on('click', this.openFollowedModal.bind(this));
        this.$followingModalButton.on('click', this.openFollowingModal.bind(this))
    },
    ajaxGetCall: function (path){
        return $.ajax(
            {url: path, type: "GET"}
        );
    },
    getProfileAddress: function(){
        return location.href.split('/')[4].slice(0,58)
    },
    openFollowedModal: function(){
        this.loadFollowedContent();
    },
    openFollowingModal: function(){
        this.loadFollowingContent();
    },
    clearFollowedModal: function(){
        this.$followedModalBody.empty();
    },
    clearFollowingModal: function(){
        this.$followingModalBody.empty();
    },
    loadFollowedContent: function(){
        let profileAddress = this.getProfileAddress();
        this.ajaxGetCall(`/profile/get-followed/${profileAddress}`).then(
            (followed_list_json)=>{
                this.clearFollowedModal();
                let followed_list = JSON.parse(followed_list_json)
                if (followed_list.length > 0){
                    for (let profile of followed_list){
                        let profileTruncated = `${profile.slice(0,4)}....${profile.slice(54,58)}`
                        this.$followedModalBody.append(
                            `
                            <div class="following-modal-item">
                                <a href="/profile/${profile}">
                                    <img  
                                        src= "https://testnet.nftspace.cloud/static/img/logo-sm.png"
                                        class = "connection-image"
                                    > 
                                    ${profileTruncated}
                                </a>
                            </div>                          
                            `
                        )
                    };
                } else {
                    this.$followedModalBody.append(
                        `
                        <div class="following-modal-item">
                            This artist does not have any followers.
                        </div>                          
                        `
                    )                    
                }
                this.$followedModal.modal('show');
            },
            (error)=>{console.log("Error loading followed content")}
        );
    },
    loadFollowingContent: function(){
        let profileAddress = this.getProfileAddress();
        this.ajaxGetCall(`/profile/get-following/${profileAddress}`).then(
            (following_list_json)=>{
                this.clearFollowingModal();
                let following_list = JSON.parse(following_list_json)
                if (following_list.length > 0){
                    for (let profile of following_list){
                        console.log(profile)
                        let profileTruncated = `${profile.slice(0,4)}....${profile.slice(54,58)}`
                        this.$followingModalBody.append(
                            `
                            <div class="following-modal-item">
                                <a href="/profile/${profile}">
                                    <img  
                                        src= "https://testnet.nftspace.cloud/static/img/logo-sm.png"
                                        class = "connection-image"
                                    > 
                                    ${profileTruncated}
                                </a>
                            </div>                          
                            `
                        )
                    };
                } else {
                    this.$followingModalBody.append(
                        `
                        <div class="following-modal-item">
                            This artist does not follow anyone.
                        </div>                          
                        `
                    )                    
                }
                this.$followingModal.modal('show');
            },
            (error)=>{console.log("Error loading following content")}
        );
    },
}
