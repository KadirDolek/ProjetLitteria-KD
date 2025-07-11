'use client'

import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <section className='w-auto mt-32 mb-18 flex flex-wrap flex-col'>
        <h1 className='sm:text-sm lg:text-2xl text-black flex justify-center mb-12 text-2xl mx-auto'>
          Vous êtes déjà connecté !
        </h1>
        <div className='h-auto mx-auto rounded-3xl flex flex-wrap'>
          <div className="w-full lg:w-[550px] h-[400px] shadow-2xl mx-auto rounded-3xl px-6 flex flex-col gap-6 border-2 justify-center">
            <h2 className='flex justify-center text-black font-bold text-xl'>
              Bienvenue {session.user.name} !
            </h2>
            <div className="flex justify-center">
              <img 
                src={session.user.image}
                alt="Si erreur 423 = Too many requests" 
                className="w-20 h-20 rounded-full text-black"
              />
            </div>
            <p className='text-black text-center'>{session.user.email}</p>
            <button 
              onClick={() => router.push('/userinfo')}
              className='bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800
               hover:to-orange-900 text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl  shadow-2xl py-2'
            >
              Voir mon profil
            </button>
            <button 
              onClick={() => signOut()}
              className='hover:from-red-800 hover:to-red-900 text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl 
              bg-gradient-to-r from-red-700 to-red-800 shadow-2xl py-2'
            >
              Se déconnecter <i className='bxr  bx-arrow-out-left-square-half'></i> 
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='w-auto mt-32 mb-18 flex flex-wrap flex-col'>
      <h1 className='sm:text-sm lg:text-2xl text-black flex justify-center mb-12 text-2xl mx-auto'>
        Inscrivez-vous maintenant et profitez des différentes promotions sur les livres!
      </h1>
      <div className='h-auto mx-auto rounded-3xl flex flex-wrap'>
        <div className="w-full lg:w-[500px] h-auto shadow-2xl mx-auto rounded-br-3xl rounded-tr-3xl px-6 flex flex-col gap-8 border-l-black border-2">
          <h2 className='flex justify-center py-6 text-black font-bold'>Inscription:</h2>
          <p className='text-black font-bold'>Adresse mail:</p>
          <input className='bg-white rounded-2xl border-2 text-black px-4 py-2' placeholder='Email...' type="email" />
          <p className='text-black font-bold'>Mot de passe:</p>
          <input className='bg-white rounded-2xl border-2 text-black px-4 py-2' placeholder='Mot de passe...' type="password" />
          <button className='border-4 border-amber-900 hover:bg-amber-700 text-white font-bold cursor-pointer w-32 mx-auto rounded-2xl bg-amber-800 shadow-2xl py-2'>
            Inscription
          </button>
        </div>
        <div className="w-full lg:w-[500px] h-auto shadow-2xl mx-auto rounded-tl-3xl rounded-bl-3xl border-2 border-r-black px-6 flex flex-col gap-8">
          <h2 className='h-auto flex justify-center py-6 text-black font-bold'>Connexion:</h2>
          <p className='text-black font-bold'>Adresse mail:</p>
          <input className='bg-white rounded-2xl border-2 text-black px-4 py-2' placeholder='Email...' type="email" />
          <p className='text-black font-bold'>Mot de passe:</p>
          <input className='bg-white rounded-2xl border-2 text-black px-4 py-2' placeholder='Mot de passe...' type="password" />
          <button className='border-4 border-amber-900 hover:bg-amber-700 text-white font-bold cursor-pointer w-32 mx-auto rounded-2xl bg-amber-800 shadow-2xl py-2'>
            Connexion
          </button>
          <h4 className='text-black mx-auto -mb-5 font-bold'>Connectez-vous avec google:</h4>
           {status === 'loading' && (
            <p className='text-black text-center text-sm'>Connexion en cours...</p>
          )}
          <button className='mx-auto'
            onClick={() => signIn('google')}
            disabled={status === 'loading'}> 
            <img 
              className='size-12 cursor-pointer hover:opacity-80 transition-opacity' 
              src="https://imgs.search.brave.com/i5jpEidif0rldoEakBbhITh8itjcUMaN6XbAtHw3Yzs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdvb2dsZS1sb2dv/LWljb24tZG93bmxv/YWQtaW4tc3ZnLXBu/Zy1naWYtZmlsZS1m/b3JtYXRzLS1zb2Np/YWwtbWVkaWEtc3Vp/dHMtcGFjay1sb2dv/cy1pY29ucy05MzQx/My5wbmc_Zj13ZWJw/Jnc9MTI4" 
              alt="Se connecter avec Google" />
          </button>
        </div>
      </div>
    </section>
  )
}