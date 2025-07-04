'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (!prev) setIsOpened(false); 
      return !prev;
    });
  };
  const toggleMenuUser = () => {
    setIsOpened((prev) => {
      if (!prev) setIsOpen(false); 
      return !prev;
    });
  };


  return (
    <nav className="bg-transparent flex justify-between relative">
      <div className="max-w-7xl flex items-center py-3">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-black font-bold text-xl min-w-full">
            Litteria
            <img src="zob" alt="zob" />
          </Link>
          <button
            className="text-black focus:outline-none text-2xl cursor-pointer"
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
          >
            ☰
          </button>
        </div>
      </div>
      {/* Liens du menu, affichés seulement si isOpen */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full flex flex-col items-center bg-transparent py-2 z-10">
          <Link href="/" className="block py-2 px-4 text-black hover:underline font-bold">
            Accueil
          </Link>
          <Link href="/about" className="block py-2 px-4 text-black hover:underline font-bold">
            Sorties récentes
          </Link>
          <Link href="/about" className="block py-2 px-4 text-black hover:underline font-bold">
            Notre bibliothèque
          </Link>
          
        </div>
      )}
      {isOpened && (
        <div className="absolute left-0 top-full w-full flex flex-col items-center bg-transparent py-2 z-10">
          <Link href="/" className="block py-2 px-4 text-black hover:underline font-bold">
            Inscription/Connexion
          </Link>
          <Link href="/about" className="block py-2 px-4 text-black hover:underline font-bold">
          Ma collection
          </Link>
          <Link href="/about" className="block py-2 px-4 text-black hover:underline font-bold">
          Données personnelles
          </Link>
        </div>
      )}
      <div>
        <input type="search" className="w-100 my-6 bg-white text-black border-none rounded-4xl" />
      </div>
      <div className="my-6 flex gap-6">
        <i onClick={toggleMenuUser} aria-expanded={isOpened} className='bxr text-black  bx-user cursor-pointer rounded-2xl scale-160'></i> 
        <Link href="/" className="bxr bx-shopping-bag bx-bounce text-black cursor-pointer rounded-2xl scale-160" style={{ color: "#000000" }} />
        <i className="bxr bx-moon text-black cursor-pointer rounded-2xl scale-160 " />
      </div>
    </nav>
  );
}
