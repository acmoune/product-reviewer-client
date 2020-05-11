import * as React from 'react'
import Stats from './Stats'
import SocketProvider from '../data/SocketProvider'
import { productId, apiServer } from '../app.config'

export default function Product() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 15 }}>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', padding: 15, maxWidth: 400 }}>
        <div style={{ border: '1px solid #DFDFDF', padding: 15 }}>

          <img src="/images/kobe.jpg" alt="kobe jersey 8" style={{ width: '100%', padding: 15 }} />
          <div>Kobe Bryant's Lakers Jersey 8</div>
          <div style={{ color: 'orange' }}>$ 300</div>

          <SocketProvider url={`ws://${apiServer}/stats-socket/${productId}`}>
            <Stats />
          </SocketProvider>
        </div>
      </div>
    </div>
  )
}
