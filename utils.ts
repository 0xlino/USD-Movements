import dotenv from 'dotenv';
dotenv.config();

import {
    green,
    yellow,
    bold
} from 'chalk';

import fs from 'fs';

import { ethers, Contract } from "ethers";

let RPC_URL = process.env.RPC_URL

let opts = []
const player = require('play-sound')((opts = []))

/**
 * Formats the given price to a US formatted string with two decimal places.
 * 
 * @param price - The price to be formatted.
 * @returns The formatted price as a string.
 */
export const formatPrice = (price) => {
    const USFormattedPrice = Intl.NumberFormat('en-US', { style: 'decimal' })
    return USFormattedPrice.format(price.toFixed(2))
}

export const playWhaleSound = path => {
    player.play(path, err => {
        if (err) throw err
    })
}

export const setupProvider = (): ethers.providers.JsonRpcProvider => {
    const rpcURL = RPC_URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL)

    return provider
}

export const validateAddress = address => (ethers.utils.isAddress(address) ? true : `Address is not valid`)

export const getJsonFromFile = (path) => {
    if (path) {
        const data = fs.readFileSync(path, 'utf8')
        const json = JSON.parse(data)
        return json
    } else {
        return {}
    }
}

export const formatPriceBigNumber = (_num: any, _decimals: any) => {
    //@ts-expect-error - ethers.js types are not up to date
    let price = _num.toString() / `1e${_decimals}`

    const USformatedPrice = Intl.NumberFormat('en-US', { style: 'decimal' })
    // @ts-expect-error - ethers.js types are not up to date
    return USformatedPrice.format(price.toFixed(2))
}


export {
    green as g_log,
    yellow as y_log,
    bold as b_log,
    Contract
}


