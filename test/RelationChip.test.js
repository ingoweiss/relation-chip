const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

let { abi, bytecode } = require('../build/contracts/RelationChip.json');
let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  partnerA = accounts[0]
  partnerB = accounts[1]
  personC = accounts[2]

  // Use one of those accounts to deploy
  // the contract
  relationChip = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [partnerA, partnerB]
    })
    .send({ from: partnerA, gas: '1000000' });
});

describe('RelationChip', () => {
  it('deploys a contract', () => {
    assert.ok(relationChip.options.address);
  });

  it('gives partner A a default balance of 50', async () => {
    const partnerABalance = await relationChip.methods.balanceOf(partnerA).call();
    assert.equal(partnerABalance, 50);
  });

  it('gives partner B a default balance of 50', async () => {
    const partnerBBalance = await relationChip.methods.balanceOf(partnerB).call();
    assert.equal(partnerBBalance, 50);
  });

  it('can send a token from partner A to partner B', async () => {
    await relationChip.methods.transfer(partnerB, 1).send({ from: partnerA });
    const partnerABalance = await relationChip.methods.balanceOf(partnerA).call();
    const partnerBBalance = await relationChip.methods.balanceOf(partnerB).call();
    assert.equal(partnerABalance, 49);
    assert.equal(partnerBBalance, 51);
  });
});
