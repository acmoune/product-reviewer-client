import * as React from 'react'

export default function Header() {
  return (
    <div 
      style={{ 
        backgroundColor: '#0d75bf', 
        color: 'white',
        borderBottom: '#135d91',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 900
      }}
    >
      <span style={{ fontSize: '12pt', fontWeight: 'bold' }}>Product Reviewer</span>
    </div>
  )
}
