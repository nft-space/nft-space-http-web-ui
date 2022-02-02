let collectionsMethods = {
    init: function(){
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom: function(){
        // Modal
        this.$addCollectionModal = $('#addCollectionModal');

        // Modal buttons
        this.$clearCollectionModalButton = $('#clearCollectionModal');
        this.$saveCollectionModalButton = $('#saveCollectionModalButton');
        
        // Collection settings input
        this.$addCollectionId = $('#addCollectionId')
        this.$addCollectionCreatorAddress = $('#addCollectionCreatorAddress');
        this.$addCollectionTitle = $('#addCollectionTitle');
        this.$addCollectionSrc = $('#addCollectionSrc');
        this.$addCollectionDescription = $('#addCollectionDescription');
        this.$addCollectionPrefix = $('#addCollectionPrefix');
        this.$addCollectionTags = $('#addCollectionTags');
        this.$addCollectionTwitterLinkInput = $('#addCollectionTwitterLinkInput');
        this.$addCollectionDiscordLinkInput = $('#addCollectionDiscordLinkInput');
        this.$addCollectionWebsiteLinkInput = $('#addCollectionWebsiteLinkInput');
    },
    bindEvents:function(){
        this.$clearCollectionModalButton.on('click', this.clearFields.bind(this));
        this.$saveCollectionModalButton.on('click', this.submitFields.bind(this));
    },
    ajaxGetCall: function (path){
        return $.ajax(
            {url: path, type: "GET"}
        );
    },
    ajaxPostCall: function (path, data){
        return $.ajax(
            {url: path, type: "POST", dataType: "json", data:data}
        );
    },
    ajaxDeleteCall: function(path){
        return $.ajax(
            {url: path, type: "DELETE"}
        )
    },
    getProfileAddress: function(){
        return location.href.split('/')[4].slice(0,58)
    },
    openAddCollectionModal: function(){
        // Empty existing modal content
        this.clearFields()
        // Show collections tab 
        $('.nav-tabs a[href="#pills-collections"]').tab('show')
        // Fill collections tab gallery
        galleryTabsMethods.clickCollectionsTab()
        this.showCollectionsModal()
    },
    showCollectionsModal: function(){
        // Add creator profile adress
        this.$addCollectionCreatorAddress.val(
            this.getProfileAddress()
        );
        // Show modal
        this.$addCollectionModal.modal('show')
    },
    clearFields:function(){
        this.$addCollectionId.val("")
        this.$addCollectionTitle.val(""); 
        this.$addCollectionSrc.val(""); 
        this.$addCollectionDescription.val("");  
        this.$addCollectionPrefix.val(""); 
        this.$addCollectionTags.tagsinput('removeAll');
        this.$addCollectionTwitterLinkInput.val("");
        this.$addCollectionDiscordLinkInput.val(""); 
        this.$addCollectionWebsiteLinkInput.val(""); 
    },
    submitFields: function(){
        let collectionDetailsData = {
            // Collection ID is hidden from user view
            "collection_id": this.$addCollectionId.val(),
            "manager_address": this.$addCollectionCreatorAddress.val(),
            // Note atm: manager_address == artist_addresses TODO
            "artist_addresses": this.$addCollectionCreatorAddress.val(),
            "collection_title": this.$addCollectionTitle.val(),
            "collection_cover_src": this.$addCollectionSrc.val(),
            "collection_description": this.$addCollectionDescription.val(),
            "collection_tags": this.$addCollectionTags.tagsinput('items'),
            "twitter_link": this.$addCollectionTwitterLinkInput.val(),
            "website_link": this.$addCollectionWebsiteLinkInput.val(),
            "prefix": this.$addCollectionPrefix.val(),
            "discord_link": this.$addCollectionDiscordLinkInput.val(),
        };
        this.ajaxPostCall(
            '/submit-collection',
            {collectionDetailsData: JSON.stringify(collectionDetailsData)}
        ).then(
            (resp)=>{
                console.log(resp); 
                // refresh collections 
                this.refreshCollectionsCards()
                // Hide on save 
                this.$addCollectionModal.modal('hide')

            },
            (error)=>{console.log("failed to post collection details")}
        )
    },
    editCollection: function(collectionId){
        let managerAddress = this.getProfileAddress();
        this.ajaxGetCall(`/get-collection-details/${managerAddress}/${collectionId}`).then(
            (collectionDetailsJson)=>{
                let collectionDetails = JSON.parse(collectionDetailsJson); 
                this.$addCollectionId.val(collectionId);// Collection ID is hidden from user view 
                this.$addCollectionTitle.val(collectionDetails.collection_title); 
                this.$addCollectionSrc.val(collectionDetails.collection_cover_src); 
                this.$addCollectionDescription.val(collectionDetails.collection_description);  
                this.$addCollectionPrefix.val(collectionDetails.prefix);
                //  Add all the tags
                console.log(collectionDetails.collection_tags)
                for (tag of collectionDetails.collection_tags)(
                    (tag)=>{
                        this.$addCollectionTags.tagsinput('add', tag)
                    }
                )
                this.$addCollectionTwitterLinkInput.val(collectionDetails.twitter_link);
                this.$addCollectionDiscordLinkInput.val(collectionDetails.discord_link); 
                this.$addCollectionWebsiteLinkInput.val(collectionDetails.website_link); 
                // Open editor
                this.showCollectionsModal()
            },
            (error) => {console.log("Could not retrieve collection details")}
        )
    },
    deleteCollection: function(collectionId){
        let managerAddress = this.getProfileAddress();
        this.ajaxDeleteCall(`/delete-collection/${managerAddress}/${collectionId}`).then(
            (resp)=>{
                console.log(resp);
                // refresh collections 
                this.refreshCollectionsCards()               
            },
            (error) => {console.log("Error deleting collection")}
        )
    },
    refreshCollectionsCards: function(){
        galleryTabsMethods.clickCollectionsTab()
    },
}