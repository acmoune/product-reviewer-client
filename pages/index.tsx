import * as React from 'react'
import axios from 'axios'
import ProductLayout from '../layouts/ProductLayout'
import ReviewsContainer from '../components/ReviewsContainer'
import { withData, DataContext } from '../data/DataProvider'
import SocketProvider from '../data/SocketProvider'
import { isNull } from 'util'
import { apiUrl, apiServer, productId } from '../app.config'
import ReviewForm from '../components/ReviewForm'
import ReviewsList from '../components/ReviewsList'
import { ReviewType } from '../models/ReviewType'
import { ProductStatistic } from '../models/ProductStatistic'

class IndexPage extends React.Component<{}, {
  rating: number,
  content: string,
  username: string,
  userEmail: string,
  error: string
}> {

  constructor(props: any) {
    super(props)
    this.state = {
      rating: 5,
      content: '',
      username: '',
      userEmail: '',
      error: ''
    }

    this.handleOnReview = this.handleOnReview.bind(this)
  }

  static contextType = DataContext
  context: React.ContextType<typeof DataContext>
  
  async fetchReviews() {
    try {
      const { data } = await axios.get(`${apiUrl}/products/${productId}/reviews`)
      const items: ReviewType[] = data
      this.context.setReviews(items)
      this.setState({ error: '' })
    } catch (e) { this.setState({ error: e.message }) }
  }

  async fetchStats() {
    try {
      const { data } = await axios.get(`${apiUrl}/products/${productId}/stats`)
      
      if (data) {
        const stats: ProductStatistic = data
        this.context.setStats(stats)
      }
      this.setState({ error: '' })
    } catch (e) { this.setState({ error: e.message }) }
  }

  componentDidMount() {
   this.fetchReviews()
   this.fetchStats()
  }

  handleOnReview(data: any): void {
    const review: ReviewType = {
      reviewId: data.reviewId,
      createdAt: data.createdAt,
      username: data.username,
      userEmail: data.userEmail,
      rating: data.rating,
      content: data.content
    }

    const currentReviews = this.context.reviews || []
    this.context.setReviews([review].concat(currentReviews))
  }

  render() {
    const reviews = this.context.reviews

    return (
      <ProductLayout title="Product Reviewer">
        <ReviewsContainer>
          <ReviewForm
            rating={this.state.rating}
            content={this.state.content}
            username={this.state.username}
            userEmail={this.state.userEmail}
            setRating={rating => this.setState({ rating })}
            setContent={content => this.setState({ content })}
            setUsername={username => this.setState({ username })}
            setUserEmail={userEmail => this.setState({ userEmail })}
            onSubmit={(error, review) => {
              if (error) { alert(error) }
              /*
              else {
                You can do whatever you want here with the new review, like adding it to the list.
                But we will rely on the WebSocket connection to refresh the list.
                
                const currentReviews = this.context.reviews || []
                this.context.setReviews([review].concat(currentReviews))
              }
              */
            }}
          />

          <div>
            {this.state.error ? 
              <span style={{ color: 'red' }}>{this.state.error} - Could not connect to the server. Please refresh the page later</span> : 
              isNull(this.context.reviews) ? 
                <span style={{ color: '#808080' }}>Loading...</span> : 

                <SocketProvider url={`ws://${apiServer}/reviews-socket`}>
                  <ReviewsList
                    reviews={reviews}
                    onReview={data => this.handleOnReview(JSON.parse(data))}
                  />
                </SocketProvider>
            }
          </div>
        </ReviewsContainer>
      </ProductLayout>
    )
  }
}

export default withData(IndexPage)
