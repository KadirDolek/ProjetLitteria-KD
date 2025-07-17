'use client'

import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="w-full flex justify-center border-t border-t-neutral-900 mb-8 sm:mb-12 px-4">
      <div className='w-full max-w-6xl'>
        <h2 className='text-black flex justify-center mb-8 sm:mb-12 mt-8 sm:mt-12 text-lg sm:text-xl font-semibold'>
          Liens utiles:
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4'>
          {/* Section Contact */}
          <div className='w-full text-black flex flex-col gap-2 sm:gap-3'>
            
            <h3 className='text-center font-bold text-base sm:text-lg mb-2'>Contact</h3>
            <span className='text-center text-sm sm:text-base'>
              <strong>Adresse:</strong> Place de la minoterie 10, 
              
            </span>

            <span className='text-center text-sm sm:text-base'>
              <strong>Mail:</strong> kadirdolek01@hotmail.com
            </span>
            <span className='text-center text-sm sm:text-base'>
              <strong>Téléphone:</strong> +32.479.93.13
            </span>
          </div>
          
          {/* Section Liens */}
          <div className='w-full text-black flex flex-col gap-2 sm:gap-3'>
            <h3 className='text-center font-bold text-base sm:text-lg mb-2'>Informations</h3>
            <span className='text-center'>
              <a 
                className='font-bold text-sm sm:text-base hover:text-amber-700 transition-colors duration-200' 
                href="/documentation.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </span>
            <span className='text-center'>
              <a 
                className='font-bold text-sm sm:text-base hover:text-amber-700 transition-colors duration-200' 
                href="https://www.figma.com/design/5a2ozTQznFnfG5uFYDQXTm/Projet-Front?node-id=0-1&p=f&t=v6FgzuAKE1bQD5s7-0" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Maquette Figma
              </a>
            </span>
            <span className='text-center text-sm sm:text-base'>
              Copyright ©2025
            </span>
          </div>
          
          {/* Section Réseaux sociaux */}
          <div className='w-full text-black flex flex-col gap-2 sm:gap-3'>
            <h3 className='text-center font-bold text-base sm:text-lg mb-2'>Suivez-moi</h3>
            <Link 
              className='text-center cursor-pointer text-sm sm:text-base hover:text-amber-700 transition-colors duration-200' 
              href="https://github.com/KadirDolek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github mr-2"></i>
              Github
            </Link>
            <Link 
              className='text-center text-sm sm:text-base hover:text-amber-700 transition-colors duration-200' 
              href="https://linkedin.com/in/kadir-dölek-572975226"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin mr-2"></i>
              Linkedin
            </Link>
            <span className='text-center text-xs sm:text-sm text-gray-600 mt-2'>
              Projet à but éducatif réalisé par Kadir Dolek.
            </span>
          </div>
        </div>
        
        {/* Ligne de séparation et copyright mobile */}
        <div className='mt-8 pt-4 border-t border-gray-300 md:hidden'>
          <p className='text-center text-xs text-gray-500'>
            © 2025 Kadir Dolek. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}