const {ethers} = require('hardhat')

const tokenAddress = '0x8D6076b24Cf40F4E519bd22Fb5B08E9F939f53e1';
async function main(params) {
    const [owner] = await ethers.getSigners()

    const token = await ethers.getContractAt('MyToken', tokenAddress);
    const tx = await token.delegate(owner.address)

    await tx.wait()
    console.log('Delegate vote to yourself:', owner.address)
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})