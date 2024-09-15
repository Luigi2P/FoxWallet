// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {
    mapping(address => uint256) private balances;

    // Deposit function, allowing users to deposit money into the contract
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    // Check balance
    function checkBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Withdrawal function allows users to withdraw funds from the contract
    function withdraw(uint256 amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance");
        require(amount > 0, "Withdraw amount must be greater than zero");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // The balance of the contract
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}