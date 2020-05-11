import * as React from 'react'
import { useSocket } from '../data/SocketProvider'
import Review from './Review'
import { ReviewType } from '../models/ReviewType'

type Props = {
  reviews: ReviewType[],
  onReview: (data: any) => void
}

function ReviewsList(props: Props) {
  const { socket } = useSocket()

  React.useEffect(() => {
    if (socket) {
      socket.onmessage = (e) => {
        props.onReview(e.data)
      }
    }
  })

  return (
    <div>
      {props.reviews.map(review => <Review key={review.reviewId} review={review} />)}
    </div>
  )
}

export default ReviewsList
