import {useContext} from 'react'
import FeedbackContext from "../context/FeedbackContext"


function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext)

  //Rating Avarege
  let ratingAvarage = feedback.reduce((accumulator, current) => { 
    return accumulator + current.rating
   }, 0) / feedback.length

  ratingAvarage = ratingAvarage.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Avarage Rating: {isNaN(ratingAvarage) ? 0 : ratingAvarage}</h4>
    </div>
  )
}

export default FeedbackStats