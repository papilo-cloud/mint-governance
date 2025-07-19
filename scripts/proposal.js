const { parseEther } = require('ethers/lib/utils');
const {ethers} = require('hardhat')

const governorAddress = '0xE2242660dD7F0265d7e8783528F78E21679D4e0c'
const tokenAddress = '0x8D6076b24Cf40F4E519bd22Fb5B08E9F939f53e1';

async function proposing() {
    const [owner] = await ethers.getSigners()
    const governor = await ethers.getContractAt('MyGovernor', governorAddress)
    const token = await ethers.getContractAt('MyToken', tokenAddress)

    const tx = await governor.propose(
        [token.address],
        [0],
        [token.interface.encodeFunctionData('mint', [owner.address, parseEther('30000')])],
        'Give the owner more tokens!'
    )

    const receipt = await tx.wait();
    const proposalId = receipt.events[0].args.proposalId;

    console.log('Proposal created with Id:', proposalId.toString())

}

proposing().catch(error => {
    console.error(error);
    process.exit(1);
})