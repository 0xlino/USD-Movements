import dotenv from 'dotenv'
dotenv.config()
import { Contract } from 'ethers'
import { 
    getJsonFromFile,
    setupProvider
} from './utils'
import { overSomeTreshold } from './strats/overSomeTresold'

let _treshold = process.env.TRESHOLD || 1000

console.log(`Treshold: ${_treshold}`)

let final_data = [];

const tokenAddress = {
	tokens: {
		usdc: {
			address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
		},
		usdt: {
			address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
		}
	}
}

/**
 * @description Initialize an event watcher
 * @param contract 
 * @param filter 
 * @param func 
 */
const initEventWatcher = async (contract, filter, func, opts?) => {
    if (opts) {
        // You can do stuff with custom options here
    }
    
    contract.on(filter, (from, to, value, data) => {
        func(from, to, value, data)
    })
}

const runApp = async () => {
    const provider = setupProvider()
    const CONTRACT_ABI = getJsonFromFile(`./stableabi.json`)
    for (const token in tokenAddress.tokens) {
        console.log(`Token: ${token}`)
        let transfer_treshold = _treshold
        const tokenContract = new Contract(tokenAddress.tokens[token].address, CONTRACT_ABI, provider)
        const tokenName = await tokenContract.name()
        const decimals = await tokenContract.decimals()
        //@ts-expect-error
        transfer_treshold *= `1e${decimals}`

        initEventWatcher(tokenContract, 'Transfer', (from, to, value, data) => {
            overSomeTreshold(value, transfer_treshold, decimals, tokenName, data, final_data, from, to, true)
        })
    }
}

runApp()

