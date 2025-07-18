'use client'

import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLocalAuth } from '../../hooks/useLocalAuth'
import Link from 'next/link'


export default function Login() {
  const { data: session, status } = useSession()
  const { user: localUser, login, register, logout } = useLocalAuth()
  const router = useRouter()
  const [registerForm, setRegisterForm] = useState({ email: '', password: '' })
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')



// Gère la connexion Google/NextAuth
const handleGoogleLogin = () => {
  signIn('google', { 
    callbackUrl: window.location.origin,
    redirect: false 
  })
}
 
// Gère l'inscription local
const handleRegister = (e) => {
  e.preventDefault()
  if (!registerForm.email || !registerForm.password) {
    setMessage('Veuillez remplir tous les champs')
    setMessageType('error')
    return
  }

  const result = register(registerForm.email, registerForm.password)
  setMessage(result.message)
  setMessageType(result.success ? 'success' : 'error')
  
  // Redirige si suuuuuuuuu
  if (result.success) {
    setRegisterForm({ email: '', password: '' })
    setTimeout(() => router.push('/userinfo'), 1000)
  }
}

// Gère la connexion local
const handleLogin = (e) => {
  e.preventDefault()
  if (!loginForm.email || !loginForm.password) {
    setMessage('Veuillez remplir tous les champs')
    setMessageType('error')
    return
  }

  const result = login(loginForm.email, loginForm.password)
  setMessage(result.message)
  setMessageType(result.success ? 'success' : 'error')
  
  // Redirige si on est suuuuuuuu
  if (result.success) {
    setLoginForm({ email: '', password: '' })
    setTimeout(() => router.push('/userinfo'), 1000)
  }
}


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
                alt="Photo de profil" 
                className="w-20 h-20 rounded-full text-black"
              />
            </div>
            <p className='text-black text-center'>{session.user.email}</p>
            <button 
              onClick={() => router.push('/userinfo')}
              className='bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800
               hover:to-orange-900 text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl shadow-2xl py-2'
            >
              Voir mon profil
            </button>
            <button 
              onClick={() => signOut()}
              className='hover:from-red-800 hover:to-red-900 text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl 
              bg-gradient-to-r from-red-700 to-red-800 shadow-2xl py-2'
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Si connecté en local
  if (localUser) {
    return (
      <section className='w-auto mt-32 mb-18 flex flex-wrap flex-col'>
        <h1 className='sm:text-sm lg:text-2xl text-black flex justify-center mb-12 text-2xl mx-auto'>
          Vous êtes connecté !
        </h1>
        <div className='h-auto mx-auto rounded-3xl flex flex-wrap'>
          <div className="w-full lg:w-[550px] h-[400px] shadow-2xl mx-auto rounded-3xl px-6 flex flex-col gap-6 border-2 justify-center">
            <h2 className='flex justify-center text-black font-bold text-xl'>
              Bienvenue {localUser.name} !
            </h2>
            <div className="flex justify-center">
              <img 
                src={localUser.image}
                alt="Photo de profil" 
                className="w-20 h-20 rounded-full text-black"
              />
            </div>
            <p className='text-black text-center'>{localUser.email}</p>
            <button 
              
              className='bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800
               hover:to-orange-900 text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl shadow-2xl py-2'
            >
              <Link href="/userinfo">
                Voir mon profil
              </Link>
              
            </button>
            <button 
              onClick={logout}
              className='hover:from-red-800 hover:to-red-900 text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl 
              bg-gradient-to-r from-red-700 to-red-800 shadow-2xl py-2'
            >
              Se déconnecter
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
      {message && (
        <div className={`mx-auto mb-4 px-4 py-2 rounded-lg ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      <div className='h-auto mx-auto rounded-3xl flex flex-wrap'>
        <div className="w-full lg:w-[500px] h-auto shadow-2xl mx-auto rounded-br-3xl rounded-tr-3xl px-6 flex flex-col gap-8 border-l-black border-2">
          <h2 className='flex justify-center py-6 text-black font-bold'>Inscription:</h2>
          <form onSubmit={handleRegister} className='flex flex-col gap-4'>
            <p className='text-black font-bold'>Adresse mail:</p>
            <input 
              className='bg-white rounded-2xl border-2 text-black px-4 py-2' 
              placeholder='Email...' 
              type="email" 
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              required
            />
            <p className='text-black font-bold'>Mot de passe:</p>
            <input 
              className='bg-white rounded-2xl border-2 text-black px-4 py-2' 
              placeholder='Mot de passe...' 
              type="password" 
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              required
            />
            <button 
              type="submit"
              className='border-4 border-amber-900 hover:bg-amber-700 text-white font-bold cursor-pointer w-32 mx-auto rounded-2xl bg-amber-800 shadow-2xl py-2'
            >
              Inscription
            </button>
          </form>
        </div>
        <div className="w-full lg:w-[500px] h-auto shadow-2xl mx-auto rounded-tl-3xl rounded-bl-3xl border-2 border-r-black px-6 flex flex-col gap-8">
          <h2 className='h-auto flex justify-center py-6 text-black font-bold'>Connexion:</h2>
          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <p className='text-black font-bold'>Adresse mail:</p>
            <input 
              className='bg-white rounded-2xl border-2 text-black px-4 py-2' 
              placeholder='Email...' 
              type="email" 
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              required
            />
            <p className='text-black font-bold'>Mot de passe:</p>
            <input 
              className='bg-white rounded-2xl border-2 text-black px-4 py-2' 
              placeholder='Mot de passe...' 
              type="password" 
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              required
            />
            <button 
              type="submit"
              className='border-4 border-amber-900 hover:bg-amber-700 text-white font-bold cursor-pointer w-32 mx-auto rounded-2xl bg-amber-800 shadow-2xl py-2'
            >
              Connexion
            </button>
          </form>
          
          <h4 className='text-black mx-auto -mb-5 font-bold'>Connectez-vous avec google:</h4>
          {status === 'loading' && (
            <p className='text-black text-center text-sm'>Connexion en cours...</p>
          )}
          <button className='mx-auto'
            onClick={() => handleGoogleLogin('google')}
            disabled={status === 'loading'}
          > 
            <img 
              className='size-12 cursor-pointer hover:opacity-80 transition-opacity' 
              src="https://imgs.search.brave.com/i5jpEidif0rldoEakBbhITh8itjcUMaN6XbAtHw3Yzs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdvb2dsZS1sb2dv/LWljb24tZG93bmxv/YWQtaW4tc3ZnLXBu/Zy1naWYtZmlsZS1m/b3JtYXRzLS1zb2Np/YWwtbWVkaWEtc3Vp/dHMtcGFjay1sb2dv/cy1pY29ucy05MzQx/My5wbmc_Zj13ZWJw/Jnc9MTI4" 
              alt="Se connecter avec Google" 
            />
          </button>
        </div>
      </div>
    </section>
  )
}