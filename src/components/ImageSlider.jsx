import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ImageSlider({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="slider-placeholder" style={{ background: '#f1f5f9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        No Image
      </div>
    );
  }

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="image-slider" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img 
        src={photos[currentIndex]} 
        alt={`Dacha slide ${currentIndex + 1}`} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease-in-out' }}
      />
      
      {/* Navigation Arrows */}
      {photos.length > 1 && (
        <>
          <button 
            className="slider-btn prev-btn" 
            onClick={prevSlide}
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              transition: 'background 0.2s',
              zIndex: 10
            }}
          >
            <ChevronLeft size={20} color="#1e293b" />
          </button>
          <button 
            className="slider-btn next-btn" 
            onClick={nextSlide}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              transition: 'background 0.2s',
              zIndex: 10
            }}
          >
            <ChevronRight size={20} color="#1e293b" />
          </button>
          
          {/* Dots Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            zIndex: 10
          }}>
            {photos.map((_, index) => (
              <div 
                key={index}
                style={{
                  width: currentIndex === index ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
