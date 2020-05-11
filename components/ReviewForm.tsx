import * as React from 'react'
import axios from 'axios'
import { apiUrl, productId, productName } from '../app.config'
import { ReviewType } from '../models/ReviewType'
import { Task } from '../models/Task'


async function pollUntilTaskFinished(taskId: String, attempt: number, cb: (error?: string, task?: Task) => void) {
  let retryTimeout

  try {
    if (attempt === 61) {
      if (retryTimeout) clearTimeout(retryTimeout)
      return cb('Timeout after 30 seconds', null)
    }

    const task: Task = (await axios.get(`${apiUrl}/tasks/${taskId}`)).data;  console.log(attempt, task)
    
    if (task && task.updatedAt) {
      if (retryTimeout) clearTimeout(retryTimeout)
      return cb(null, task)
    }

    retryTimeout = setTimeout(() => pollUntilTaskFinished(taskId, attempt + 1, cb), 500)
  } catch (e) { cb(e.message, null) }
}

function ReviewForm(props: { 
  rating: number, setRating: (rating: number) => void,
  content: string, setContent: (content: string) => void,
  username: string, setUsername: (username: string) => void,
  userEmail: string, setUserEmail: (userEmail: string) => void,
  onSubmit: (error?: string, review?: ReviewType) => void
}) {

  const emptyFields = () => {
    props.setUsername('')
    props.setRating(5)
    props.setUserEmail('')
    props.setContent('')
  }

  const [sending, setSending] = React.useState<boolean>(false)

  const postReview = async () => {
    const payload = {
      productId,
      productName,
      username: props.username || 'Tom Dollars',
      userEmail: props.userEmail || 'tomdollars@example.com',
      rating: props.rating,
      content: props.content || '(No content)'
    }

    setSending(true)
    const onSubmit = (error?: string, review?: ReviewType) => { setSending(false); props.onSubmit(error, review) }

    try {
      const task: Task = (await axios.post(`${apiUrl}/products/${productId}/reviews`, payload)).data

      pollUntilTaskFinished(task.taskId, 1, async (error, task) => {
        if (error) return onSubmit(error, null)
        if (task.errorMessage) return onSubmit(task.errorMessage, null)

        const review: ReviewType = (await axios.get(`${apiUrl}/products/${productId}/reviews/${task.resourceId}`)).data;  console.log(review)
        emptyFields()
        return onSubmit(null, review)
      })
    } catch (e) { 
      onSubmit(e.message, null)
    }
  }

  return (
    <div style={{ textAlign: 'left', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#DFDFDF', padding: 10, fontSize: '9pt', marginBottom: 15 }}>
      <div style={{ display: 'flex' }}>
        <input placeholder="Name" type="text" value={props.username} onChange={e => props.setUsername(e.target.value)} style={{ flexGrow: 1 }} />
        <input placeholder="Email" type="text" value={props.userEmail} onChange={e => props.setUserEmail(e.target.value)} style={{ flexGrow: 1 }} />
      </div>
      
      <div>
        <label><input type="radio" name="rating" value="1" checked={props.rating == 1} onChange={(e) => props.setRating(parseInt(e.target.value))} />1</label> &nbsp;&nbsp;
        <label><input type="radio" name="rating" value="2" checked={props.rating == 2} onChange={(e) => props.setRating(parseInt(e.target.value))} />2</label> &nbsp;&nbsp;
        <label><input type="radio" name="rating" value="3" checked={props.rating == 3} onChange={(e) => props.setRating(parseInt(e.target.value))} />3</label> &nbsp;&nbsp;
        <label><input type="radio" name="rating" value="4" checked={props.rating == 4} onChange={(e) => props.setRating(parseInt(e.target.value))} />4</label> &nbsp;&nbsp;
        <label><input type="radio" name="rating" value="5" checked={props.rating == 5} onChange={(e) => props.setRating(parseInt(e.target.value))} />5</label>
      </div>

      <div style={{ display: 'flex' }}>
        <textarea 
          onChange={(e) => props.setContent(e.target.value)} 
          style={{ flexGrow: 1, height: 50, minHeight: 50, resize: 'vertical' }}
          value={props.content}
          placeholder="Say something"
        />
      </div>

      <div style={{ textAlign: 'right' }}>
        <button onClick={postReview} disabled={sending}>
          {sending ? 'Sending...' : 'Publish'}
        </button>
      </div>
    </div>
  )
}

export default ReviewForm
