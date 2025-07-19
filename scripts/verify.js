const {run} = require('hardhat')

const tokenAddress = '0x8D6076b24Cf40F4E519bd22Fb5B08E9F939f53e1';
const governorAddress = '0xE2242660dD7F0265d7e8783528F78E21679D4e0c'

async function main() {
    try {
        await run('verify:verify', {
            address: governorAddress,
            constructorArguments: [tokenAddress]
        })

        await run('verify:verify', {
            address: tokenAddress,
            constructorArguments: [governorAddress]
        })

        console.log('Both verified...')
    } catch (err) {
        console.error('Verification failed', err);
    }
}

main()