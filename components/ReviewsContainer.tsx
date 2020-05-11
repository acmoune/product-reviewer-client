import * as React from 'react'
import Link from 'next/link'

export default function ReviewsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: 15 }}>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', padding: 15, maxWidth: 600, textAlign: 'left' }}> 
        <div style={{ paddingBottom: 5, borderBottom: '1px solid #808080' }}><strong>Reviews</strong></div>   
        <div style={{ textAlign: 'left' }}>{children}</div>
      </div>
    </div>
  )
}
