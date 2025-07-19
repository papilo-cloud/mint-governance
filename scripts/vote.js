const {ethers} = require('hardhat');

const proposalId = '818141792628640967260025734759239539607062306016850913465167283985649838996'
const governorAddress = '0xE2242660dD7F0265d7e8783528F78E21679D4e0c'

async function vote() {
    const governor = await ethers.getContractAt('MyGovernor', governorAddress);
    let state = await governor.state(proposalId)

    while (state != 1) {
        console.log('Waiting for proposal to become active...')
        await new Promise(res => setTimeout(res, 15000));
        state = await governor.state(proposalId)
    }

    const tx = await governor.castVote(proposalId, 1);
    await tx.wait()

    console.log('Voted for proposal:', proposalId)
}

vote().catch(error => {
    console.error(error);
    process.exit(1);
})