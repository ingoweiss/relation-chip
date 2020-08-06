// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract RelationChip {

  address partnerA;
  address partnerB;
  mapping(address => uint256) balances;
  event Transfer(address indexed from, address indexed to, uint tokens);

  constructor(address partnerAAddr, address partnerBAddr) public {
    partnerA = partnerAAddr;
    partnerB = partnerBAddr;
    balances[partnerA] = 50;
    balances[partnerB] = 50;
  }

  function totalSupply() public view returns (uint256) {
    return 100;
  }

  function balanceOf(address partner) public view returns (uint) {
    return balances[partner];
  }

  function transfer(address receiver, uint numTokens) public returns (bool) {
    require(numTokens <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender] - numTokens;
    balances[receiver] = balances[receiver] + numTokens;
    emit Transfer(msg.sender, receiver, numTokens);
    return true;
  }

}