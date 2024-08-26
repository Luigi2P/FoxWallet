let web3 = new Web3(window.ethereum);

GetSender()

async function TranferTo() {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    var select = document.getElementById('senders');
    var selectedValue = select.options[select.selectedIndex].value;

    const amountInWei = web3.utils.toWei(amount, 'ether');

    await web3.eth.sendTransaction({
        from: selectedValue,
        to: recipient,
        value: amountInWei
    });

}

async function GetBalance() {
    var select = document.getElementById('senders');
    var selectedValue = select.options[select.selectedIndex].value;

    const balance = await web3.eth.getBalance(selectedValue);
    const ethBalance = await web3.utils.fromWei(balance, 'ether');

    document.getElementById('Balance').innerHTML = ethBalance + ' ETH available to swap';
}

async function GetSender() {
    const accounts = await web3.eth.requestAccounts();

    var select = document.getElementById('senders');

    select.innerHTML = '';

    for (var i = 0; i < accounts.length; i++) {
        var option = document.createElement('option');
        option.text = accounts[i];
        select.add(option);
    }
    GetBalance()
}
