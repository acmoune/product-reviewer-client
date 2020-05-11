import * as React from 'react'
import Head from 'next/head'

import Header from '../components/Header'
import Product from '../components/Product'

function ProductLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 50 }}>
      <Head><title>{title}</title></Head>

      <Header />
      <Product />

      {children}
      
      <div style={{ marginTop: 50, textAlign: 'center', fontSize: '9pt' }}>&copy; 2020 - acmoune</div>
    </div>
  )
}

export default ProductLayout
