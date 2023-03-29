const INITIAL_STATE = {
    btcRate: null,
    marketPriceData: null,
    tradeVolumeData: null
}

export function bitcoinReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_BTC_RATE': {
            return {
                ...state,
                btcRate: action.btcRate
            }
        }

        case 'SET_MARKET_PRICE':
            return {
                ...state,
                marketPriceData: action.marketPriceData
            }

        case 'SET_TRADE_VOLUME':
            return {
                ...state,
                tradeVolumeData: action.tradeVolumeData
            }

        default:
            return state
    }
}