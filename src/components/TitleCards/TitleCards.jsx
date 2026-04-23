import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([])
  const cardsRef = useRef(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2RkMjUyZmUxZjc0ZDdkNmY4ZDk5NGYzYzg4MzQwMCIsIm5iZiI6MTc3Njg3Nzk2OC4wOCwic3ViIjoiNjllOTAxOTBkNWYzZTk3YTQzMDk3ZjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.RMY2TgQdU6e_hze1rC-j3dIMh05Coaz_CA4SHQ-R57o'
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        )
        const data = await res.json()
        setApiData(data?.results || [])
      } catch (err) {
        console.error(err)
        setApiData([])
      }
    }

    fetchData()
  }, [category])

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return

    const handleWheel = (e) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="title-cards">
      <h2>{title}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((movie) => (
          <div className="card" key={movie.id}>
            {movie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.original_title}
              />
            )}
            <p>{movie.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleCards