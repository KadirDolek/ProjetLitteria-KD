import React from 'react'

export default function Login() {



  return (
    <section className='w-auto mt-32 mb-18 flex flex-wrap flex-col'>
      <h1 className='sm:text-sm lg:text-2xl text-black flex justify-center mb-12 text-2xl mx-auto'>Inscrivez-vous maintenant et profitez des différentes promotions sur les livres!</h1>
        <div className='h-auto mx-auto rounded-3xl flex flex-wrap'>
          <div className="w-full lg:w-[500px] h-[500px] shadow-2xl mx-auto rounded-br-3xl rounded-tr-3xl px-6 flex flex-col gap-8 border-l-black border-2">
             <h2 className='flex justify-center py-6 text-black font-bold'>Inscription:</h2>
             <p className='text-black font-bold'>Adresse mail:</p>
             <input className='bg-white rounded-2xl border-2 text-black px-4' placeholder='Email...' type="mail" />
             <p className='text-black font-bold'>Mot de passe:</p>
             <input className='bg-white rounded-2xl border-2 text-black px-4' placeholder='Mot de passe...' type="password" />
             <button className='border-4 border-amber-900 hover:bg-amber-700 text-white font-bold cursor-pointer w-2xs mx-auto rounded-2xl bg-amber-800 shadow-2xl'>Inscription</button>
          </div>
          <div className="w-full lg:w-[500px] h-[500px] shadow-2xl mx-auto rounded-tl-3xl rounded-bl-3xl border-2  border-r-black px-6 flex flex-col gap-8">
              <h2 className='h-auto flex justify-center py-6 text-black font-bold'>Connexion:</h2>
              <p className='text-black font-bold'>Adresse mail:</p>
             <input className='bg-white rounded-2xl border-2 text-black px-4' placeholder='Email...' type="mail" />
             <p className='text-black font-bold'>Mot de passe:</p>
             <input className='bg-white rounded-2xl border-2 text-black px-4' placeholder='Mot de passe...' type="password" />
             <button className='border-4 border-amber-900 hover:bg-amber-700 text-white font-bold cursor-pointer w-2xs mx-auto rounded-2xl bg-amber-800 shadow-2xl'>Connexion</button>
             <h4 className='text-black mx-auto -mb-5 font-bold'>Connectez-vous avec google:</h4>
             <button className='mx-auto'><img className='size-12 cursor-pointer'src="https://imgs.search.brave.com/i5jpEidif0rldoEakBbhITh8itjcUMaN6XbAtHw3Yzs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdvb2dsZS1sb2dv/LWljb24tZG93bmxv/YWQtaW4tc3ZnLXBu/Zy1naWYtZmlsZS1m/b3JtYXRzLS1zb2Np/YWwtbWVkaWEtc3Vp/dHMtcGFjay1sb2dv/cy1pY29ucy05MzQx/My5wbmc_Zj13ZWJw/Jnc9MTI4" alt="" /></button>
          </div>
        </div>
    </section> 
  )
}
