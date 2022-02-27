const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  it("Should make a lottery and select a winner", async function () 
  {
    // test to receive contract addresses
    const Lottery         = await ethers.getContractFactory('Lottery');
    const lottery         = await Lottery.deploy();
    await lottery.deployed();
    const lotteryAddress  = lottery.address;

    console.log('Lottery address is:',lotteryAddress);


    const enterPrice = ethers.utils.parseUnits('0.02', 'ether')


    const addresses = await ethers.getSigners();

    
    for (let i =1; i < addresses.length; i++ )
    {
      console.log('Entering lottery with address:',addresses[i].address);
      await lottery.connect(addresses[i]).enter({value:enterPrice});
    }

    await lottery.pickWinner();

    const winner = await lottery.winner();

    console.log('winner is:',winner);

 });
});
