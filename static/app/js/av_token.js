let account = null;
let contract = null;
let tokens = [];
const connect = async () => {
    $('.wallet_connecting_load').css({'display':'inline-block'})
    $('.wallet_txt_msg').html(`<p class="placeholder-glow" style="width: 90px; margin-bottom: 5px;"><span class="placeholder col-12"></span></p> `)
    if (window.ethereum) {
        try{
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                
                
                account = accounts[0] //'0x1a7a7b015cc3daa866916bff9c5f28cf811e134f';

                get_and_set()


        
            }).catch((err) => {
                if (err.code === 4001) {
                  $('.wallet_txt_msg').html(`<p style="color:red; margin:0px;display:inline-block;">Please connect | </p> `)
                  $('.wallet_connecting_load').css({'display':'none'})
                  //$('.wallet_txt_msg').text(`CONNECT WALLET`)

                } else {
                    $('.wallet_txt_msg').html(`<p style="color:red; margin:0px;display:inline-block;"> Error | </p> `)
                    $('.wallet_connecting_load').css({'display':'none'})
                    //$('.wallet_txt_msg').text(`CONNECT WALLET`)
                  alert(err)
                };
            }); 

            window.web3 = new Web3(window.ethereum);

            const currentChainId = await web3.eth.getChainId()

            if (currentChainId != 56) {
               
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ 
                        chainId: "0x38",
                    }],
                }).then(accounts => {
                   
                    get_and_set()
            
                });
            }


            


            // var accounts = await web3.eth.getAccounts();
            // account = '0xb4dd66D7c2C7E57F628210187192fb89d4b99dD4';

        }

        catch(error){
               
            $('.wallet_txt_msg').html(`<p style="color:red; margin:0px;display:inline-block;">Please connect | </p>`)
            $('.wallet_connecting_load').css({'display':'none'})
            //$('.wallet_txt_msg').text(`CONNECT WALLET`)
        }


    } 
    
    else {
      
            alert('Please Install Metamask OR TrustWallet Extension')
            $('.wallet_txt_msg').html(`<p style="color:red; margin:0px;display:inline-block;">Install Metamask | </p>`)
            $('.wallet_connecting_load').css({'display':'none'})
        
    }



}


test =  (labelValue) =>  {
    // Twelve Zeroes for Trillions
    return Math.abs(Number(labelValue)) >= 1.0e+12
    ?  { value: (Math.abs(Number(labelValue)) / 1.0e+12).toFixed(0), symbol:  "T" }
    
    // Nine Zeroes for Billions
    :Math.abs(Number(labelValue)) >= 1.0e+9

    ? { value: (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(0), symbol: "B" }
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? { value:  (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(0), symbol: "M" }
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? { value: (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(0), symbol: "K" }

    : { value: Math.abs(Number(labelValue)).toFixed(0), symbol:'' };
 };




const main = async () => {
    await connect()


    // for (var i = 0; i < v1Balance; i++) {
    //     const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call()
    //     const tokenURI = await contract.methods.tokenURI(tokenId).call();
    //     tokens.push({ tokenId, tokenURI })
    // }

    // for (var i = 0; i < tokens.length; i++) {
    //     const token = tokens[i];
    //     const metadataRes = await fetch(`https://ipfs.io/ipfs/${token.tokenURI.substr(7)}`)
    //     const metadata = await metadataRes.json()
    //     token.metadata = metadata
    // }

    // document.getElementById("root").innerHTML = tokens.map(createElement).join("")
    // console.log('Values have been updated')

    // console.log(tokens)
}


const setAddress = async (addr) => {
    $('.wallet_connecting_load').css({'display':'inline-block'})
    window.web3 = new Web3(window.ethereum);
    web3.eth.setProvider('https://bsc-dataseed.binance.org/')
    account = addr
    get_and_set()
  
}



const get_and_set = async () => {

// web3 and account
contract = new web3.eth.Contract(ABI, ADDRESS)

//BNB Balance
let BNBBalance = Number(await web3.eth.getBalance(account));
    BNBBalance = parseFloat(BNBBalance / Math.pow(10, 18)).toFixed(2); 

//AV Balance
let v1Balance = await contract.methods.balanceOf(account).call()
    v1Balance = await web3.utils.fromWei(v1Balance,'ether');

let accountInfo = await contract.methods.getAccountDividendsInfo(account).call()

// current paid totalDividends of holder 
let totalDividends = accountInfo[4];

if(totalDividends > 0){ 
    totalDividends = parseFloat( totalDividends / Math.pow(10, 18));

}


// last claim time
let lastClaimTime = accountInfo[5];
if(lastClaimTime > 0){

let date1 = new Date(lastClaimTime * 1000);
let date2 = new Date();


    var difference =  date2.getTime() - date1.getTime();

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    var minutesDifference = Math.ceil(difference/1000/60);
    difference -= minutesDifference*1000*60

    var secondsDifference = Math.floor(difference/1000);
    difference -= secondsDifference*1000


    if(daysDifference >= 1){
        lastClaimTime = daysDifference +'D';
    }else if(hoursDifference >=1){
        lastClaimTime = hoursDifference +'H';
    }
    else if(minutesDifference >=1){
        lastClaimTime = minutesDifference +'M';
    }
    else{
        lastClaimTime = secondsDifference +'S';
    }
    
    }else{
        lastClaimTime = 'Never';
    }

    //current withdrawable Dividends of holder 
    let withdrawableDividends  = accountInfo[3];


    if(withdrawableDividends > 0){ 
    withdrawableDividends = parseFloat(withdrawableDividends / Math.pow(10, 18));

    }else{
    withdrawableDividends = 0;
    } 




// console.log(BNBBalance , test(v1Balance) , test(totalDividends) , lastClaimTime , test(withdrawableDividends))

var get_v1Balance = test(v1Balance) 
var get_totalDividends = test(totalDividends)
var get_withdrawableDividends = test(withdrawableDividends)

$('#total_av').html(''+get_v1Balance['value'] + get_v1Balance['symbol']+'<span>AV</span>')
$('#total_BUSD').html(''+get_totalDividends['value'] + get_totalDividends['symbol']+'<span>BUSD</span>')
$('#total_Pending_BUSD').html(''+get_withdrawableDividends['value'] + get_withdrawableDividends['symbol']+'<span>BUSD</span>')
$("#lastClaimTime").html(lastClaimTime)
$('#total_av_2').html(''+get_v1Balance['value'] + get_v1Balance['symbol']+'<span>AV</span>')
$('#total_BNB').html(''+BNBBalance+'<span>BNB</span>')


$('.wallet_txt_msg').html(`<p style="color:green; margin:0px;display:inline-block;"> ${BNBBalance} BNB Balance | </p> `)
$('.wallet_connecting_load').css({'display':'none'})

var myModalEl = document.getElementById('Connect_model');
var modal = bootstrap.Modal.getInstance(myModalEl)
modal.hide();

}



// function handleAccountsChanged(accounts) {
//     main()
// }
  
// window.ethereum.on('accountsChanged', handleAccountsChanged);

// // Later

// window.ethereum.removeListener('accountsChanged', handleAccountsChanged);

// window.ethereum.on('chainChanged', (chainId) => main());


// function createElement(token) {
//     return `<div>
//     <h1>#${token.tokenId} ${token.metadata.name}</h1>
//     <img src="https://ipfs.io/ipfs/${token.metadata.image.substr(7)}" width="100" height="100"/>
//     <hr />
// </div>`
// }

const ABI = [{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"uint8","name":"decimal","type":"uint8"},{"internalType":"uint256","name":"amountOfTokenWei","type":"uint256"},{"internalType":"uint16","name":"setMxTxPer","type":"uint16"},{"internalType":"uint16","name":"setMxWalletPer","type":"uint16"},{"components":[{"internalType":"address payable","name":"wallet","type":"address"},{"internalType":"address payable","name":"walletCharity","type":"address"},{"internalType":"bool","name":"walletFeeInBNB","type":"bool"},{"internalType":"bool","name":"walletCharityFeeInBNB","type":"bool"}],"internalType":"struct Token.FeeWallet","name":"wallet","type":"tuple"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_minimumTokenBalanceForDividends","type":"uint256"},{"components":[{"internalType":"uint8","name":"setTaxFee","type":"uint8"},{"internalType":"uint8","name":"setLiqFee","type":"uint8"},{"internalType":"uint8","name":"setBurnFee","type":"uint8"},{"internalType":"uint8","name":"setWalletFee","type":"uint8"},{"internalType":"uint8","name":"setBuybackFee","type":"uint8"},{"internalType":"uint8","name":"setWalletCharityFee","type":"uint8"},{"internalType":"uint8","name":"setRewardFee","type":"uint8"}],"internalType":"struct Token.Fee","name":"fee","type":"tuple"},{"internalType":"address payable","name":"_feeReceiver","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"bool","name":"automatic","type":"bool"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"newValue","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"oldValue","type":"uint256"}],"name":"ClaimWaitUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"weiAmount","type":"uint256"}],"name":"DividendWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"weiAmount","type":"uint256"}],"name":"DividendsDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"ExcludeFromDividends","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"iterations","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claims","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastProcessedIndex","type":"uint256"},{"indexed":true,"internalType":"bool","name":"automatic","type":"bool"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":true,"internalType":"address","name":"processor","type":"address"}],"name":"ProcessedDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"SwapAndLiquifyEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_burnFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_buybackFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liquidityFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxWalletAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_rewardFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_tDividendTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_tTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_taxFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_walletCharityFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_walletFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"accumulativeDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"blacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"buyBackUpperLimitAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"}],"name":"deliver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"dividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"excludedFromDividends","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeWalletCharity","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gasForProcessing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"geUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getAccountDividendsInfo","outputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"int256","name":"index","type":"int256"},{"internalType":"int256","name":"iterationsUntilProcessed","type":"int256"},{"internalType":"uint256","name":"withdrawableDividends","type":"uint256"},{"internalType":"uint256","name":"totalDividends","type":"uint256"},{"internalType":"uint256","name":"lastClaimTime","type":"uint256"},{"internalType":"uint256","name":"nextClaimTime","type":"uint256"},{"internalType":"uint256","name":"secondsUntilAutoClaimAvailable","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAccountDividendsInfoAtIndex","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastProcessedIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfDividendTokenHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastProcessedIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxBurnFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxBuybackFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiqFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTaxFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletFee","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minMxTxPercentage","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minMxWalletPercentage","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minimumTokenBalanceForDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintedByUnicarve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numTokensSellToAddToLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pcsV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pcsV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"process","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"processDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverBEP20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"},{"internalType":"bool","name":"deductTransferFee","type":"bool"}],"name":"reflectionFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"taxFee","type":"uint8"},{"internalType":"uint8","name":"liquidityFee","type":"uint8"},{"internalType":"uint8","name":"burnFee","type":"uint8"},{"internalType":"uint8","name":"walletFee","type":"uint8"},{"internalType":"uint8","name":"buybackFee","type":"uint8"},{"internalType":"uint8","name":"walletCharityFee","type":"uint8"},{"internalType":"uint8","name":"rewardFee","type":"uint8"}],"name":"setAllFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"buyBackLimit","type":"uint256"}],"name":"setBuybackUpperLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newFeeWallet","type":"address"}],"name":"setFeeWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newFeeWallet","type":"address"}],"name":"setFeeWalletCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxTxPercent","type":"uint256"}],"name":"setMaxTxPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxWalletPercent","type":"uint256"}],"name":"setMaxWalletPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimumTokenBalanceForDividends","type":"uint256"}],"name":"setMinimumTokenBalanceForDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"inBNB","type":"bool"}],"name":"setWalletCharityFeeTokenType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"inBNB","type":"bool"}],"name":"setWalletFeeTokenType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapAndLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rAmount","type":"uint256"}],"name":"tokenFromReflection","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newClaimWait","type":"uint256"}],"name":"updateClaimWait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateGasForProcessing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updatePcsV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawDividend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"withdrawableDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"withdrawnDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
const ADDRESS = "0x32F738738F238865f8506593c6e2613647eCE478"



// $("#RunMain").click(function(){

//     main()

// })


$(".connect-button_nav").click(function(){
    main()
})







// if (window.ethereum){
     
//     var meta_connected = window.ethereum.isConnected()
//     var wallet_adderss = $("#hidden_wallet_addess").val()

//     if(meta_connected){
//         main()
        
//     }

// }



