let web3 = new Web3(window.ethereum);
const contractAddress = "0x8BFFC531D75FEE35ca27C1F2be4F8C7C9d362044";
const contractABI =
    [
        {
            "inputs": [],
            "name": "checkBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "contractBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
contract = new web3.eth.Contract(contractABI, contractAddress);

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

async function bankDeposit() {
    const depositAmount = document.getElementById('depositAmount').value;
    var select = document.getElementById('senders');
    if (contract && depositAmount) {
        try {
            await contract.methods.deposit().send({
                from: select.options[select.selectedIndex].value,
                value: web3.utils.toWei(depositAmount, 'ether')
            });
            alert('Deposit successful!');
        } catch (error) {
            console.error(error);
            alert('Deposit failed');
        }
    }
}
async function bankWithdraw() {
    const withdrawAmount = document.getElementById('withdrawAmount').value;
    var select = document.getElementById('senders');
    if (contract && withdrawAmount) {
        try {
            await contract.methods.withdraw(web3.utils.toWei(withdrawAmount, 'ether')).send({
                from: select.options[select.selectedIndex].value
            });
            alert('Withdraw successful!');
        } catch (error) {
            console.error(error);
            alert('Withdraw failed');
        }
    }
}

async function bankBalance() {
    var select = document.getElementById('senders');
    if (contract) {
        try {
            const balance = await contract.methods.checkBalance().call({
                from: select.options[select.selectedIndex].value
            });
            document.getElementById('bankBalance').innerText = `${web3.utils.fromWei(balance, 'ether')} ETH available in Bank`;
        } catch (error) {
            console.error(error);
            alert('Failed to retrieve balance');
        }
    }
}


function changeTab(evt, tabName) {
    console.log(tabName)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sidenavElement");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

window.onload = function () {
    document.getElementById('defaultTab').click();
};

