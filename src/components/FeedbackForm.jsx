import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState('')
  const [btnDisabled, setbtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(10)

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  const handleTextChange = (e) => {
    if (text === '') {
      setbtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setbtnDisabled(true)
      setMessage('Almeno 10 caratteri...')
    } else {
      setbtnDisabled(false)
      setMessage(null)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Faccio un altro check di validità perchè
    // quello precedente potrebbe essere bypassato dalla console del browser
    if (text.trim().length > 10) {
      const newFeedback = {
        text, // text: text
        rating, // rating:  rating
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText('')
      setbtnDisabled(true)
    }
  }

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setbtnDisabled(false)
    }
  }, [feedbackEdit])

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Quanto valuti il nostro servizio?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Scrivi una recensione..."
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Invia
          </Button>
        </div>
      </form>

      {message && <div className="message">{message}</div>}
    </Card>
  )
}

export default FeedbackForm
