import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

export function TradeVolumeChart({ data }) {
  return (
    <section className="trade-volume-chart">
      <h3>Trade Volume (USD)</h3>
      <p>The total USD value of trading volume on major bitcoin exchanges.</p>
      <AreaChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82caff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82caff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelStyle={{ color: 'white', fontSize: 18, paddingBottom: 4 }} contentStyle={{ color: 'darkgray', backgroundColor: 'var(--theme-body)', borderRadius: '6px' }}/>
        <Area
          type="monotone"
          dataKey="tradeVolume"
          stroke="#82caff"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </section>
  )
}
