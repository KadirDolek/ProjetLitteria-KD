'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

  if (status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (status === 'unauthenticated') {
        return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">
          Redirection vers la connexion...
        </div>
      </div>
    );
  }

  return (
    <section className='h-auto'>
      <div className='w-[900px] h-[500px] shadow-2xl mx-auto mt-36 rounded-3xl mb-32 flex'>
        <div className='w-[320px] h-[500px] shadow-2xl rounded-l-3xl flex flex-col items-center justify-center'>
          <img
            src={session?.user?.image || '/default-profile.png'}
            alt="Photo de profil"
            className="w-24 h-24 rounded-full"/>
          <p className='p-6 text-black font-bold'>{session?.user?.name}</p>
        </div>
        <div className='flex-1 p-8 text-black flex justify-center'>
          (Contenue de l'historique d'achat)
        </div>
      </div>
    </section>
  );
}
