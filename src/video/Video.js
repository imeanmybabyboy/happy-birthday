import React, { useState } from 'react'
import './Video.css'
import App from '../app/App'

export default function Video({ onDataSend }) {
    const [videoIsPaused, setVideoIsPaused] = useState(true)

    const handleSendData = (e) => {
        const newVideoIsPaused = e.target.paused;
        setVideoIsPaused(newVideoIsPaused);
        onDataSend(newVideoIsPaused);
    }

    return (
        <div className='contVideo'>
            <div className='img1'>
            </div>

            <div className='video'>
                <video onPause={handleSendData} onPlay={handleSendData} className='videoMemories' src={process.env.PUBLIC_URL + 'video/Memories....mp4'} controls></video>
                <div className='arrows'>
                    ↑↑↑
                </div>
            </div>

            <div className='img2'>
            </div>
        </div>
    )
}
