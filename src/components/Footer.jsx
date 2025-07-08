'use client'

import Link from 'next/link'
import React from 'react'


export default function Footer() {
  return (
    <div
      className="w-auto flex justify-center border-t border-t-neutral-900 mb-12"
    >
      <div className='w-full'>
        <h2 className='text-black flex justify-center mb-12 mt-12'>Liens utiles:</h2>
        <div className='columns-3xs flex justify-between '>
          <div className='w-full text-black justify-center flex flex-col gap-2'>
            <span className='text-center'>Adresse:blablalakld</span>
            <span className='text-center'>Mail: kadirdolek01@hotmail.com</span>
            <span className='text-center'>Téléphone: +32.479.93.13</span>
          </div>
          <div className='w-full text-black justify-center flex flex-col gap-2'>
            <span className='text-center'>
              <a className='font-bold' href="/DocumentationProjet.pdf" target="_blank" rel="noopener noreferrer">Docs</a>
            </span>
            <span className='text-center font-bold'>FAQ</span>
            <span className='text-center'>Copyright ©2025 </span>
          </div>
          <div className='w-full text-black flex flex-col gap-2'>
            <Link className='text-center cursor-pointer' href="https://github.com/KadirDolek">
              <i className="fa-brands fa-github"> Github</i>
            </Link>
            <Link className='text-center' href="https://linkedin.com/in/kadir-dölek-572975226">
              <i className="fa-brands fa-linkedin"> Linkedin</i>
            </Link>
            <span className='text-center'>Projet à but éducatif réalisé par Kadir Dolek.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
