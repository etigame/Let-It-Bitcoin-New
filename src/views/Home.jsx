import { Component } from 'react'
import { Loader } from '../cmps/Loader'
import { MoveList } from '../cmps/MoveList'
import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.service'

export class Home extends Component {
  state = {
    loggedInUser: null,
    btcRate: null,
  }

  componentDidMount() {
    this.loadUser()
    this.loadBtcRate()
  }

  loadUser = () => {
    const loggedInUser = userService.getLoggedInUser()
    this.setState({ loggedInUser })
  }

  loadBtcRate = async () => {
    try {
      const btcRate = await bitcoinService.getRate()
      this.setState({ btcRate })
    } catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    const { loggedInUser, btcRate } = this.state
    if (!loggedInUser || !btcRate) return <Loader />

    const { name, coins } = loggedInUser
    const dollarUSLocale = Intl.NumberFormat('en-US')
    const usd = dollarUSLocale.format(coins / btcRate)

    return (
      <section className="main-container full">
        <section className="home grid">
          <section className="user-info">
            <h1>Hello, {name}</h1>
            <p className='light'>Current Balance</p>
            <p className='regular'>BIT: <span className='light btc'>&#8383; {coins}</span></p>
            <p>USD: <span className='light'>$ {usd}</span></p>
            <p>BTC Rate: <span className='light'>{btcRate}</span></p>
          </section>

          <section className="move-list-container">
            <MoveList
              title={'Your last moves'}
              moves={loggedInUser.moves}
              location={'home'}
              btcRate={btcRate}
            />
          </section>
        </section>
      </section>
    )
  }
}
