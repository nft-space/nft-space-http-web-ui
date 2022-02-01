let authenticationMethods= {
    logOut: function(){
        this.removeAuthenticationSessionFlag()
        this.updateHrefList.forEach(
            (element)=> {this.revertHrefs(element)}
        )
    },
    getSignature: function(){
        const myAlgoWallet = new MyAlgoConnect();  
        // GET PUBLIC KEY 
        myAlgoWallet.connect().then(
            (accounts) => {
                // Accounts is an array that has all public addresses shared by the user  
            
                const addresses = accounts.map(account => account.address);
                let txn = {
                    fee: 0,
                    type: 'pay',
                    from: addresses[0],
                    to:  addresses[0],
                    amount: 0, // 1 algo
                    firstRound: 12449335,
                    lastRound: 12450335,
                    genesisHash: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
                    genesisID: "testnet-v1.0"
                };

                sigData = {
                    addresses,
                    txn
                }
                console.log(txn);

                this.createLoginNotifier(sigData)

            }
        ).catch(
            e => {
                console.error(e);
            }
        );
    },
    createLoginNotifier: function(sigData){
        $('#loginNotifier').append(`
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
            
            <div class="alert alert-success align-items-center text-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:" style="margin: 0.3%"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    <span>
                    <div class="wrapper-tooltip">
                    <div class="icon login-info">
                      <div class="tooltip">For security, we use Algorand’s signature verification function to send you a transaction to verify your identity. Do not worry, you won’t be charged.</div>
                      <span><i class="fas fa-info"></i></span>
                    </div>
                  </div>
                        Welcome to NFT Space. We just need to verify your signature to sign you in. Click 
                        <button type="button" class="btn btn-success btn-sm" style="padding: 0.2rem 0.6rem" id=${JSON.stringify(sigData)} onClick=authenticationMethods.finishSignature(this.id)>
                            here
                        </button>

                    </span>
                </div>
            </div>
        `)
    },
    finishSignature: function(sigData){
        const myAlgoWallet = new MyAlgoConnect(); 
        let sigDataParsed = JSON.parse(sigData)
        let txn = sigDataParsed.txn
        let addresses = sigDataParsed.addresses

        // GET SIGNATURES 
        myAlgoWallet.signTransaction(txn).then(
            (signedTxn)=> {
                const sig = signedTxn
                if ('blob' in sig && 'txID' in sig && typeof(sig)== 'object' ){
                    this.sendTheBlob(blob= sig.blob, txn = txn, publicKey= addresses[0])
                }
                else{
                    alert(
                        "Signature authentication failures. Please check entered details and try again. "
                    )
                }
            }
        ).catch(
            e => {
                if (e.message == "Can not open popup window - blocked"){
                    alert("Signature authentication was refused. Please ensure pop-ups are enabled on the browser and try again. ")
                }
                else {
                    console.error(e);
                }
            }
        );
    },
    sendTheBlob: function(blob, txn, publicKey){
        // Set blob as a valid json for POST
        let blobJSON = {
           blob: JSON.stringify(blob),
           txn: JSON.stringify(txn)
        }
        // Send blob to flask backend using ajax POST
        $.ajax(
            {url: '/authenticate-signature', type: "POST", dataType: "json", data: blobJSON}
        // POST Request call back functions
        ).then(
            (success)=>{location.reload()},
            (error)=>{alert("Signature verification unsuccessful :( ")},

        )
    },
    isLoggedIn: function(){
        return $.ajax(
            {url: '/is-logged-in', type: "GET"}
        )
    }
}


