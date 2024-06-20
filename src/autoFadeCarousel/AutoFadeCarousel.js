// src/components/AutoFadeCarousel.js
import React, { useState, useEffect } from 'react';
import './AutoFadeCarousel.css';

const AutoFadeCarousel = ({ images, interval = 4000, fadeDuration = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const nextSlide = () => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, fadeDuration);
    };

    const intervalId = setInterval(nextSlide, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval, fadeDuration]);

  return (
    <div className="carousel-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`carousel-image ${index === currentIndex ? 'visible' : ''} ${fade ? 'fade' : ''}`}
          style={{ transitionDuration: `${fadeDuration}ms` }}
        />
      ))}

      <div className='together'>
        memories
      </div>
    </div>
  );
};

export default AutoFadeCarousel;