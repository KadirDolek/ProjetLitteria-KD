
'use client'
import { useEffect, useState } from 'react'

const images = [
  '/romance_home.png',
  '/scolaire_home.png',
  
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-3/4 h-[28rem] overflow-hidden relative">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}
