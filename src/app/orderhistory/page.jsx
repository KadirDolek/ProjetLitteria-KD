'use client'

import { useLocalAuth } from '../../hooks/useLocalAuth';
import { useSession } from 'next-auth/react';
import React from 'react'


export default function Page() {
  const { data: session, status } = useSession();
  const { user: localUser} = useLocalAuth();


  if (status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (status === "unauthenticated" && !localUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">
          Redirection vers la connexion...
        </div>
      </div>
    );
  }

    const user = session?.user || localUser;
  const userName = user?.name || 'Utilisateur';
  const userImage = user?.image || '/default-profile.png';

return (
  <section className='h-auto'>
    <div className='w-full max-w-[950px] h-auto lg:h-[500px] shadow-2xl 
      mx-auto mt-36 rounded-3xl mb-32 flex flex-col lg:flex-row px-4 lg:px-0 bg-gradient-to-r from-white to-gray-100'>
      <div className='w-full lg:w-[320px] h-auto lg:h-[500px] shadow-2xl rounded-t-3xl lg:rounded-l-3xl 
      lg:rounded-tr-none flex flex-col items-center justify-center py-8 lg:py-0 bg-gradient-to-tr from-gray-100 to-yellow-100  '>
        <img
          src={userImage}
          alt="Photo de profil"
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full text-black"
        />
        <p className='p-4 lg:p-6 text-black font-bold text-sm sm:text-base lg:text-lg text-center'>
          {session?.user?.name}
        </p>
      </div>
      <div className='flex-1 p-4 lg:p-8 text-black flex justify-center items-center min-h-[300px] lg:min-h-0'>
        <div className='text-center lg:text-left'>
          (Contenue de l'historique d'achat)
        </div>
      </div>
    </div>
  </section>
);
}
