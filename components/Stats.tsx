import * as React from 'react'
import { useSocket } from '../data/SocketProvider'
import { useData } from '../data/DataProvider'

export default function Stats() {
  const { socket } = useSocket()
  const { stats, setStats } = useData()

  React.useEffect(() => {
    if (socket) {
      socket.onmessage = (e) => {
        setStats(JSON.parse(e.data))
      }
    }
  })

  return (
    <div 
      style={{ 
        fontSize: '9pt',
        textAlign: 'left',
        borderTop: '1px solid #DFDFDF',
        paddingTop: 5,
        marginTop: 15,
        color: '#808080'
      }}
    >
      Total 1 &nbsp;&nbsp;<span style={{ color: 'orange' }}>{stats.countOne}</span><br />
      Total 2 &nbsp;&nbsp;<span style={{ color: 'orange' }}>{stats.countTwo}</span><br />
      Total 3 &nbsp;&nbsp;<span style={{ color: 'orange' }}>{stats.countThree}</span><br />
      Total 4 &nbsp;&nbsp;<span style={{ color: 'orange' }}>{stats.countFour}</span><br />
      Total 5 &nbsp;&nbsp;<span style={{ color: 'orange' }}>{stats.countFive}</span><br />
      Total reviews &nbsp;&nbsp;<span style={{ color: 'orange' }}>{stats.totalReviews}</span><br />

      Average rating &nbsp;&nbsp;
      <span style={{ color: 'orange' }}>
        {(stats.totalReviews > 0) ? (stats.totalRating / stats.totalReviews).toFixed(1) : 0}
      </span> 
    </div>
  )
}
