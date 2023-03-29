import axios from 'axios'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getTradeVolume
}

function getRate() {
    return new Promise((resolve, reject) => {
        const url = `https://blockchain.info/tobtc?currency=USD&value=1`
        let btcRate = axios.get(url).then(res => res.data)
        btcRate ? resolve(btcRate) : reject('Bitcoin Rate not found.')
    })
}

async function getMarketPrice() {
    try {
        const url = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
        const res = await(await axios.get(url)).data
        const marketPriceData = res.values.map(val => ({marketPrice: val.y, date: new Date(val.x * 1000).toLocaleDateString()}))
        return marketPriceData
    } catch (err) {
        console.log('err:', err)
    }
}

async function getTradeVolume() {
    try {
        const url = 'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true'
        const res = await(await axios.get(url)).data
        const tradeVolumeData = res.values.map(val => ({tradeVolume: val.y, date: new Date(val.x * 1000).toLocaleDateString()}))
        return tradeVolumeData
    } catch (err) {
        console.log('err:', err)
    }
}