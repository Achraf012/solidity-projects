// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract escrow{
address public escrowagent;
address private buyer;
address payable private seller;
uint public amount;
bool sent =false;
constructor(address _buyer,address payable _seller){
   escrowagent=msg.sender;
   buyer = _buyer;
   seller=_seller;
}
modifier onlybuyer(){
    require(msg.sender==buyer,"only buyer can do this");
    _;
}
modifier onlyagent(){
    require(msg.sender==escrowagent,"only escrowagent can do this");
    _;
}
event deposited(address indexed buyer,uint amount);
event released(address indexed seller,uint amount);
event refunded(address indexed buyer,uint amount);
function deposite()external payable onlybuyer {
require(msg.value>0,"Must send ETH to deposit");
require(!sent,"Funds already deposited");

amount= msg.value;
sent=true;
emit deposited(msg.sender, msg.value);
}
function releasefunds()external onlyagent {
    require(seller!=address(0),"check the seller address");
    require(sent,"no money to release ");
    uint releasedsmount=amount;
    amount=0;
    sent=false;
    seller.transfer(amount);
    emit released(seller, releasedsmount);
   
}

function refund()external onlyagent{
    require(sent,"no money to refund ");
  
    uint transferedamount=amount;
    amount=0;
    sent=false;
    payable(buyer).transfer(amount);
    emit refunded(buyer, transferedamount);
}


}

