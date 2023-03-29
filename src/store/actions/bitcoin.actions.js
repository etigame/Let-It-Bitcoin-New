import { bitcoinService } from '../../services/bitcoin.service'

export function getRate () {
    return async (dispatch) => {
        try {
            const btcRate = await bitcoinService.getRate()
            dispatch({type: 'SET_BTC_RATE', btcRate})
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadMarketPriceData () {
    return async (dispatch) => {
        try {
            const marketPriceData = await bitcoinService.getMarketPrice()
            dispatch({type: 'SET_MARKET_PRICE', marketPriceData})
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadTradeVolumeData () {
    return async (dispatch) => {
        try {
            const tradeVolumeData = await bitcoinService.getTradeVolume()
            dispatch({type: 'SET_TRADE_VOLUME', tradeVolumeData})
        } catch (err) {
            console.log('err:', err)
        }
    }
}