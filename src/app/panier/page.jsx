import React from 'react'

export default function Panier() {




  return (

    <section className='h-[700px] w-full mt-32'>
        <div className='h-[620px] w-[850px] shadow-2xl mx-auto rounded-3xl'>
            <div className='bg-transparent h-[400px] w-[850px] mx-auto shadow-2xl rounded-3xl'>

            </div>
            <div>
              <span className='flex justify-center gap-6 mt-10'> 
                <p className='text-black text-2xl'>Code de réduction:</p>
                <input className='bg-white border border-black' type="text" placeholder='Code de réduction' />
                <button className='cursor-pointer bg-amber-800 px-6 rounded-2xl shadow-2xl border-2 border-black hover:opacity-75'>Valider</button>
              </span>
            </div>
            <div>
              <span>
                <p className='text-black font-bold text-2xl flex justify-center mt-6'>
                  Total :
                </p>
                <button className='cursor-pointer bg-amber-800 px-10 rounded-2xl shadow-2xl border-2 border-black hover:opacity-75 mt-6 mx-auto block'>
                  Valider votre commande
                </button>
              </span>
            </div>
        </div>
    </section>

  )
}
