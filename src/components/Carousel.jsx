'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const images = [
  {
    src: '/romance_home.png',
    href: '/romance',
  },
  {
    src: '/scolaire_home.png',
    href: '/school',
  },
  {
    src: '/dystopie_home.png',
    href: '/dystopie'
  }
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
    <section className="w-full">
      <div className="w-3/4 h-[28rem] relative overflow-hidden bg-gray-200 rounded-2xl mx-auto">
        {images.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={item.src}
                alt={`slide-${index}`}
                className="w-full h-full object-cover rounded-2xl cursor-pointer"
              />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center">
        <img className='w-md' src="/deco_Home.png" alt="" />
      </div>
    </section>
  )
}