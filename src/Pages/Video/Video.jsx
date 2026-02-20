import React from 'react'
import './Video.css'
import Playvideo from '../../Components/Playvideo/Playvideo'
import Recommented from '../../Components/Recommented/Recommented'
import { useParams } from 'react-router-dom'


function Video() {

   const {videoId} = useParams();




  return (
    <div className='play-container'>
       <Playvideo videoId={videoId}/>
       <Recommented categoryId="0"/>
    </div>
  )
}

export default Video