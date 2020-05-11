import * as React from 'react'
import formatDate from '../utils/formatDate'
import { ReviewType } from '../models/ReviewType'

export default function Review({ review }: { review: ReviewType }) {
  return (
    <div style={{  marginBottom: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '9pt' }}>
        <img src="/images/user.png" height="35" alt="" />
        
        <div style={{ flexGrow: 1, paddingLeft: 5 }}>
          <div>{review.username} ({review.userEmail})</div>
          <div>Rating <span style={{ color: 'orange' }}>{review.rating}/5</span></div>
        </div>

        <div style={{ color: '#808080' }}>{formatDate(review.createdAt)}</div>
      </div>

      <div style={{ marginLeft: 40, paddingTop: 10 }}>
        {review.content}
      </div>
    </div>
  )
}
