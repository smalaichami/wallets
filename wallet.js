
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  console.log(`\n\nEthereum Wallet creation `)
  console.log(`=======================\n`)

  console.log(`Please provide the following inputs`)

  readline.question(`Enter your 12 or 24 word seed (mnemonic) ...:`, mnemonic => {
    readline.question(`Enter the starting number for address creation : `, startAddress => {

        // console.log(`Hi ${startAddress}!`)

        startAddress = parseInt(startAddress);

        const bip39 = require("bip39");
        const hdkey = require("hdkey");
        const ethUtil = require("ethereumjs-util");
        var fs = require('fs');

       // var mnemonic = bip39.generateMnemonic()
        var root = hdkey.fromMasterSeed(mnemonic);

        var str = "Wallet Addresses \n";

        var noOfAddresses = 5000;

        var generateAddress = function(x){
            if( x < startAddress+noOfAddresses ) {
                var addrNode = root.derive("m/44'/60'/0'/0/" + x);
                var pubKey = ethUtil.privateToPublic(addrNode._privateKey);
                var addr = ethUtil.publicToAddress(pubKey).toString('hex');

                var address = ethUtil.toChecksumAddress('0x'+addr);
                var privKey = addrNode._privateKey.toString('hex');
                console.log(x);

                str += x+1 + "," + address + "," + privKey + "\n";
                generateAddress(x+1);    
                };
            };
            generateAddress(startAddress);
            
            fs.writeFile("Wallets"+startAddress+".csv", str, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file " + "Wallets"+startAddress+".csv created...")
            });
            readline.close()
    });
});
  