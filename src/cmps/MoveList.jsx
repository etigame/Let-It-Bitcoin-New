export function MoveList({ title, moves, location, btcRate }) {
  return (
    <section className="move-list">
      <section className="header flex">
        <img
          src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672237805/samples/let%20it%20bitcoin/icons8-data-transfer-48_kwvsnx.png"
          alt="transfer-icon"
        />
        <h1>{title}</h1>
      </section>
      <ul className="clean-list">
        {moves.length === 0 && <p className='light'>You haven't done any move yet.</p>}
        {moves.map((move) => {
          const { at, amount, to, _id } = move
          const moveDate = new Date(at).toLocaleDateString()
          const moveTime = new Date(at).toLocaleTimeString()
          const dollarUSLocale = Intl.NumberFormat('en-US')
          const usd = dollarUSLocale.format(move.amount / btcRate)

          return (
            <li key={_id}>
              {location === 'home' && <p>To <span className='light'>{to}</span></p>}
              <p>
                <span className='btc'>&#8383; {amount}</span> | $ {usd}
              </p>
              <p>
                Status: <span className='light approved'> Approved</span>
              </p>
              <p className='light'> {moveDate}, {moveTime} </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
