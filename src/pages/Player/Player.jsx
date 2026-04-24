import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
const navigate = useNavigate();


  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2RkMjUyZmUxZjc0ZDdkNmY4ZDk5NGYzYzg4MzQwMCIsIm5iZiI6MTc3Njg3Nzk2OC4wOCwic3ViIjoiNjllOTAxOTBkNWYzZTk3YTQzMDk3ZjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.RMY2TgQdU6e_hze1rC-j3dIMh05Coaz_CA4SHQ-R57o'
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0])
        }
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back" onClick={() => {navigate(-2)}} />

      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player