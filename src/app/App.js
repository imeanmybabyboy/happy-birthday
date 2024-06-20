import React, { useEffect, useRef, useState } from 'react'
import AutoFadeCarousel from '../autoFadeCarousel/AutoFadeCarousel';
import '../styles.css'
import Video from '../video/Video';
import { Link, Route, Routes } from 'react-router-dom';
import UsCarousel from '../usCarousel/UsCarousel';

export default function App() {
  let musicArr = ['background1.mp3', 'background2.mp3', 'background3.mp3', 'background4.mp3', 'background5.mp3', 'background6.mp3',
    'background7.mp3', 'background8.mp3', 'background9.mp3', 'background10.mp3', 'background11.mp3', 'background12.mp3', 'background13.mp3'
  ]

  const [showMainDiv, setShowMainDiv] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(Math.floor(Math.random() * musicArr.length))
  const [meAndUClicked, setMeAndUClicked] = useState(false)
  const [meAndUVideoisPaused, setMeAndUVideoisPaused] = useState(true)

  const audioRef = useRef(null);

  let allImages = []
  for (let i = 1; i <= 29; i++) {
    allImages.push(process.env.PUBLIC_URL + `/images/1 (${i}).jpg`)
  }

  let usImages = []
  for (let i = 1; i <= 6; i++) {
    usImages.push(process.env.PUBLIC_URL + `/me and u/1 (${i}).jpg`)
  }

  useEffect(() => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + `/backgroundMusic/${musicArr[currentMusic]}`);
    audioRef.current.volume = 0.1;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioRef]);


  const handlePlayBackgroundMusic = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const handleShowDiv = () => {
    setShowMainDiv(true)
    setMeAndUClicked(false)
  }

  const handleHideDiv = () => {
    setShowMainDiv(false)
  }

  const handleDataSend = (videoIsPaused) => {
    setTimeout(() => {
      if (!videoIsPaused) {
        audioRef.current.pause()
      } else {
        if (!isPlaying) {
          return
        } else {
          audioRef.current.play()
        }
      }
    }, 200);
  }

  const changeBackgroundMusic = (e) => {
    audioRef.current.pause();

    let newCurrentMusic = currentMusic;

    if (e.target.className === 'prevMusic') {
      newCurrentMusic = (currentMusic - 1 + musicArr.length) % musicArr.length;
      audioRef.current.volume = 0.1
    } else if (e.target.className === 'nextMusic') {
      newCurrentMusic = (currentMusic + 1) % musicArr.length;
      audioRef.current.volume = 0.1
    }

    setCurrentMusic(newCurrentMusic);
    audioRef.current = new Audio(process.env.PUBLIC_URL + `/backgroundMusic/${musicArr[newCurrentMusic]}`);
    audioRef.current.volume = 0.2
    audioRef.current.play();
    setIsPlaying(true);
  }

  const handlePauseMusic = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const handleOpenMeAndUComp = () => {
    setMeAndUClicked(true)
  }

  const handlePlayMeAndUVideo = (e) => {
    const newVideoIsPaused = e.target.paused
    setMeAndUVideoisPaused(newVideoIsPaused)

    setTimeout(() => {
      if (meAndUVideoisPaused) {
        audioRef.current.pause()
      } else {
        if (!isPlaying) {
          return
        } else {
          audioRef.current.play()
        }
      }
    }, 200);
  }

  const handleChangeBackgroundVolume = (e) => {
    if (e.target.className === 'volumeUp') {
      if (audioRef.current.volume >= 0.9) {
        return
      }
      audioRef.current.volume += 0.1
    } else if (e.target.className === 'volumeDown') {
      if (audioRef.current.volume <= 0.1) {
        audioRef.current.volume = 0
        return
      }
      audioRef.current.volume -= 0.1
    }
  }

  return (
    <div className='body'>
      <div className='cont'>
        <div className='header'>
          <div className='main'>
            17❤️
            <Link to='/' onClick={handleShowDiv} className='home'>[ home ]</Link>
          </div>

          <div className='musicControl'>
            {isPlaying ? (
            <div className='volumeControl'>
              <div className='volumeUp' onClick={handleChangeBackgroundVolume}>
              </div>

              <div className='volumeDown' onClick={handleChangeBackgroundVolume}>
              </div>
            </div>
            ) : null}

            <div className='playStop'>
              <div className='play'>
                {isPlaying && (
                  <div className='prevMusic' onClick={changeBackgroundMusic}>
                  </div>
                )}

                <div className='music start' onClick={handlePlayBackgroundMusic}>
                  [ play music ]
                </div>

                {isPlaying && (
                  <div className='nextMusic' onClick={changeBackgroundMusic}>
                  </div>
                )}
              </div>

              <div className='music stop' onClick={handlePauseMusic}>
                [ stop music ]
              </div>
            </div>
          </div>
        </div>

        <div className='memoriesUs'>
          {showMainDiv ? (<>
            {meAndUClicked === false ? (
              <Link to='/memories' onClick={handleHideDiv}>
                <AutoFadeCarousel images={allImages} interval={3000} fadeDuration={1000} />
              </Link>
            ) : null}

            <Link onClick={handleOpenMeAndUComp} className='fadeTrans'>
              <UsCarousel images={usImages} interval={3000} fadeDuration={1000} />
            </Link>

            {meAndUClicked ? (
              <video onPlay={handlePlayMeAndUVideo} onPause={handlePlayMeAndUVideo} className='usVideo' src={process.env.PUBLIC_URL + 'usVideo/meAndU.mp4'} controls></video>
            ) : null}
          </>
          ) : null}
        </div>

        <Routes>
          {!showMainDiv ? (
            <Route path='/memories' element={<Video onDataSend={handleDataSend} />} />
          ) : null}
          <Route path='/us' element={<UsCarousel />} />
        </Routes>
      </div>
    </div>
  )
}
