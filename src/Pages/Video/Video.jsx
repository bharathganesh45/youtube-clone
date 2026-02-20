import React from 'react'
import './Video.css'
import Playvideo from '../../Components/Playvideo/Playvideo'
import Recommented from '../../Components/Recommented/Recommented'
import { useParams } from 'react-router-dom'


function Video() {

   const {videoId,categoryId} = useParams();




  return (
    <div className='play-container'>
       <Playvideo videoId={videoId}/>
       <Recommented categoryId={categoryId}/>
    </div>
  )
}

export default Video