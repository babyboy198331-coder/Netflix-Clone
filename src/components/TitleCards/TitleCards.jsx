import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = () => {

  const cardsRef = useRef(null)

  const handleWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(() => {
    const element = cardsRef.current

    if (!element) return

    element.addEventListener('wheel', handleWheel)

    return () => {
      element.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className='title-cards'>
      <h2>Popular on Netflix</h2>

      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title || "card"} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleCards