function myFunction() {
    
    const myAlgoWallet = new MyAlgoConnect();  

    myAlgoWallet.connect().then((accounts) => {
    // Accounts is an array that has all public addresses shared by the user  

    const addresses = accounts.map(account => account.address);
    console.log(addresses)
    let txn = {
    fee: 0,
    type: 'pay',
    from: addresses[0],
    to:  '4SZTEUQIURTRT37FCI3TRMHSYT5IKLUPXUI7GWC5DZFXN2DGTATFJY5ABY',
    amount: 0, // 1 algo
    firstRound: 12449335,
    lastRound: 12450335,
    genesisHash: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
    genesisID: "testnet-v1.0"
};
console.log(txn);
myAlgoWallet.signTransaction(txn).then((signedTxn)=> {
    const sig = signedTxn
    console.log(signedTxn.blob);

    })
  })
  .catch((err) => {
    console.error(err);
    });

    // console.log(addresses)

   

// myAlgoWallet.signTransaction(txn)
// .then((signedTxn) => {
//     console.log(signedTxn);
//     /*
//         {
//             txID: "IMXOKHFRXGJUBDNOHYB5H6HASYACQ3PE5R6VFWLW4QHARFWLTVTQ",
//             blob: Uint8Array(247) [130, 163, 115, 105, 103, 196, 64, 73, 156, 137, 76, 48, 112, 237, ... ]
//         }
//     */
// })
}
