let web3 = new Web3(window.ethereum);

async function TranferTo() {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const web3 = new Web3(window.ethereum);

    const amountInWei = web3.utils.toWei(amount, 'ether');

    await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: amountInWei
    });

}

async function GetBalance() {
    const accounts = await web3.eth.requestAccounts();

    const balance = await web3.eth.getBalance(accounts[0]);
    const ethBalance = await web3.utils.fromWei(balance, 'ether');

    document.getElementById('Balance').innerHTML = 'Balance: ' + ethBalance;
}