import {
    formatPriceBigNumber,
} from '../utils'

import fs from 'fs'

export const overSomeTreshold = (value, transfer_treshold, decimals, tokenName, data, final_data, from, to, shouldDumpToFile) => {
    const bigIntValue = BigInt(value)
    const bigIntTreshold = BigInt(transfer_treshold)

    if (bigIntValue >= bigIntTreshold) {
        console.log(`-> ${formatPriceBigNumber(bigIntValue, decimals)} ${tokenName}s`)
        console.log(`-> tx: https://etherscan.io/tx/${data.transactionHash}`)

        if (shouldDumpToFile) {
            let previous_data = JSON.parse(fs.readFileSync('final_data.json', 'utf8'))
            previous_data.push({
                tokenName,
                from,
                to,
                value: formatPriceBigNumber(bigIntValue, decimals),
                tx: `https://etherscan.io/tx/${data.transactionHash}`
            })
            fs.writeFileSync('final_data.json', JSON.stringify(previous_data, null, 2))
        }
    }
}