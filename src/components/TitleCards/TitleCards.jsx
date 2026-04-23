import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([])
  const cardsRef = useRef(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2RkMjUyZmUxZjc0ZDdkNmY4ZDk5NGYzYzg4MzQwMCIsIm5iZiI6MTc3Njg3Nzk2OC4wOCwic3ViIjoiNjllOTAxOTBkNWYzZTk3YTQzMDk3ZjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.RMY2TgQdU6e_hze1rC-j3dIMh05Coaz_CA4SHQ-R57o'
    }
  }

  const handleWheel = (event) => {
    if (!cardsRef.current) return
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1',
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res?.results || []))
      .catch((err) => {
        console.error(err)
        setApiData([])
      })

    const element = cardsRef.current
    if (!element) return

    element.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      element.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="title-cards">
      <h2>{title || 'Popular on Netflix'}</h2>

      <div className="card-list" ref={cardsRef}>
        {(apiData || []).map((card) => {
          const img = card?.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
            : null

          return (
            <div className="card" key={card?.id}>
              {img && <img src={img} alt={card?.title || 'movie'} />}
              <p>{card?.original_title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards