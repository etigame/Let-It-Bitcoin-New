import { Component } from 'react'
import { Loader } from '../cmps/Loader'
import { MarketPriceChart } from '../cmps/MarketPriceChart'
import { TradeVolumeChart } from '../cmps/TradeVolumeChart'
// import { bitcoinService } from '../services/bitcoin.service'
import {loadMarketPriceData, loadTradeVolumeData} from '../store/actions/bitcoin.actions'
import { connect } from 'react-redux'

class _StatisticPage extends Component {
  // state = {
  //   // marketPriceData: null,
  //   // tradeVolumeData: null,
  // }

  componentDidMount() {
    this.props.loadMarketPriceData()
    this.props.loadTradeVolumeData()
  }

  // loadMarketPriceData = async () => {
  //   try {
  //     const marketPriceData = await bitcoinService.getMarketPrice()
  //     this.setState({ marketPriceData })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  // loadTradeVolumeData = async () => {
  //   try {
  //     const tradeVolumeData = await bitcoinService.getTradeVolume()
  //     this.setState({ tradeVolumeData })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  render() {
    const { marketPriceData, tradeVolumeData } = this.props
    if (!marketPriceData || !tradeVolumeData) return <Loader />

    return (
      <section className="main-container full">
        <section className="statistic-page">
          <MarketPriceChart data={marketPriceData} />
          <TradeVolumeChart data={tradeVolumeData} />
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  marketPriceData: state.bitcoinModule.marketPriceData,
  tradeVolumeData: state.bitcoinModule.tradeVolumeData
})

const mapDispatchToProps = {
  loadMarketPriceData,
  loadTradeVolumeData
}

export const StatisticPage = connect(mapStateToProps, mapDispatchToProps)(_StatisticPage)