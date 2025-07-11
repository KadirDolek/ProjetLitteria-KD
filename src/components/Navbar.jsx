'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session} = useSession();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-transparent flex justify-between relative">
      <div className="max-w-7xl flex items-center pt-0">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-black font-bold text-xl min-w-full mt-3">
            <img className="w-24 mt-0 pt-0" src="./Logo_livre.png" alt="Litteria" />
            <p className='absolute -mt-24 -z-1 -mx-2 h-12 text-4xl text-amber-900'>Litteria</p>
          </Link>
          <button
            className="text-black focus:outline-none text-2xl cursor-pointer"
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}>
            <i className="bxr bx-align-left bx-wiggle " style={{color:'#000000'}}/> 
          </button>
        </div>
      </div>
      {/* Liens du menu, affichés seulement si isOpen */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full flex flex-col items-center bg-transparent py-2 z-10">
          <Link href="/" className="block py-2 px-4 text-black hover:underline font-bold">
            Accueil
          </Link>
          <Link href="/recently" className="block py-2 px-4 text-black hover:underline font-bold">
            Thème aléatoire
          </Link>
          <Link href="/collection" className="block py-2 px-4 text-black hover:underline font-bold">
            Notre bibliothèque
          </Link>
        </div>
      )}
      {isOpened && (
        <div className="absolute left-0 top-full w-full flex flex-col items-center bg-transparent py-2 z-10">
          <Link href="/login" className="block py-2 px-4 text-black hover:underline font-bold">
            Inscription/Connexion
          </Link>
          <Link href="/orderhistory" className="block py-2 px-4 text-black hover:underline font-bold">
            Historique de commande
          </Link>
          <Link href="/userinfo" className="block py-2 px-4 text-black hover:underline font-bold">
            Données personnelles
          </Link>
        </div>
      )}
      <div>
        <form onSubmit={handleSearch}>
          <input 
            type="search" 
            className="lg:w-100 sm:w-2/3 my-6 bg-white text-black border-none rounded-4xl px-4" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par titre ou auteur"
          />
        </form>
      </div>
      <div className="my-6 flex gap-6 py-4">
        {session?.user?.image ? (
          <img
            onClick={toggleMenuUser}
            src={session.user.image}
            alt="Profil"
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-black -my-4"
          />
        ) : (
          <i 
            onClick={toggleMenuUser} 
            aria-expanded={isOpened} 
            className='bxr text-black bx-user cursor-pointer rounded-2xl scale-160'
          />
        )} 
        <Link href="/panier" className="bxr bx-shopping-bag bx-bounce text-black cursor-pointer rounded-2xl scale-160" style={{ color: "#000000" }} />
        <i className="bxr bx-moon text-black cursor-pointer rounded-2xl scale-160 " />
      </div>
    </nav>
  );
}