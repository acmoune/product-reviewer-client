import React, { useContext, createContext } from 'react'
import { ReviewType } from '../models/ReviewType'
import { ProductStatistic } from '../models/ProductStatistic'
import { productId, productName } from '../app.config'

const emptyStats = {
  productId,
  productTitle: productName,
  countOne: 0,
  countTwo: 0,
  countThree: 0,
  countFour: 0,
  countFive: 0,
  totalReviews: 0,
  totalRating: 0
}

export const DataContext = createContext<{
  reviews?: ReviewType[],
  stats: ProductStatistic,
  setReviews: (reviews: ReviewType[]) => void,
  setStats: (stats: ProductStatistic) => void
}>({
  reviews: null,
  stats: emptyStats,
  setReviews: () => {},
  setStats: () => {}
})

export const useData = () => useContext(DataContext)

export default class DataProvider extends React.Component<{ children: React.ReactNode }, { reviews: ReviewType[], stats: ProductStatistic }> {
  constructor(props: any) {
    super(props)
    this.state = { reviews: null, stats: emptyStats }
    this.setReviews = this.setReviews.bind(this)
    this.setStats = this.setStats.bind(this)
  }

  setReviews(reviews: ReviewType[]): void {
    this.setState({ reviews })
  }

  setStats(stats: ProductStatistic): void {
    this.setState({ stats })
  }

  render() {
    const { reviews, stats } = this.state

    return (
      <DataContext.Provider 
        value={{
          reviews,
          stats,
          setReviews: this.setReviews,
          setStats: this.setStats
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export const withData = (Component) => {
  const DataWrapper = (props: any) => 
    <DataProvider>
      <Component {...props} />
    </DataProvider>
  
  return DataWrapper
}
