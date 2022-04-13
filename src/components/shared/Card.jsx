import PropTypes from 'prop-types'

function Card({ children, reverse }) {
  return (
    <div className='card' style={{
      backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
      color: reverse ? '#fff' : '#000',
    }}>{children}</div>
  )
}

// La versione di reverse in questo modo è inutile,
// è solo dimostrativa di un conditional styling.
Card.defaultProps = {
  reverse: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool.isRequired,
}

export default Card