'use client'
import React, { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../../../store/bookSlice'
import { ajouterPanier } from '../../../store/cartSlice'

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.books);
  
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') return <div>Chargement...</div>;
  
  const product = data.find(m => m.id.toString() === id);
  
  if (!product) return notFound();
  
  const handleAjouterPanier = () => {
    dispatch(ajouterPanier(product));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };
  
  return (
    <div className='flex flex-col items-center justify-center mx-auto w-full py-6 md:py-12 mt-16 md:mt-24 mb-12 md:mb-24 px-4'>
      {/* Titre du livre au-dessus */}
      <h1 className='text-black text-2xl md:text-4xl mb-6 md:mb-8 text-center font-bold max-w-4xl'>
        {product.title}
      </h1>
      
      {/* Livre ouvert - Desktop uniquement */}
      <div className='relative hidden lg:block'>
        {/* Reliure centrale */}
        <div className='absolute left-1/2 top-0 w-4 h-full bg-gradient-to-r from-amber-800 to-amber-900 transform -translate-x-1/2 z-10 rounded-sm shadow-lg'></div>
        
        {/* Container du livre */}
        <div className='flex bg-white rounded-lg shadow-2xl overflow-hidden transform perspective-1000 max-w-6xl'>
          
          {/* Page de gauche - Informations du livre */}
          <div className='w-1/2 p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-r-2 border-amber-200 transform rotate-y-2 shadow-inner'>
            <div className='flex flex-col items-center h-full'>
              {/* Image du livre */}
              <div className='mb-6 transform hover:scale-105 transition-transform duration-300'>
                <img 
                  className='h-80 w-60 rounded-lg shadow-lg border-2 border-amber-200' 
                  src={product.image_url} 
                  alt={product.title} 
                />
              </div>
              
              {/* Rating */}
              <div className='mb-6 text-center'>
                <p className='text-amber-800 text-2xl font-bold mb-2'>Évaluation</p>
                <p className='text-amber-700 text-3xl'>{product.rating} ⭐</p>
              </div>
              
              {/* Bouton d'achat */}
              <button
                onClick={handleAjouterPanier}
                className='bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-amber-900 
                          text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 
                          transition-all duration-300 cursor-pointer border-none'>
                Ajouter au panier
              </button>
            </div>
          </div>
          
          {/* Page de droite - Description */}
          <div className='w-1/2 p-8 bg-gradient-to-bl from-amber-50 to-orange-50 transform rotate-y-minus-2 shadow-inner'>
            <div className='h-full flex flex-col justify-center'>
              <h2 className='text-amber-800 text-3xl font-bold mb-6 text-center border-b-2 border-amber-200 pb-4'>
                Description
              </h2>
              
              {/* Texte de description avec style livre ancien */}
              <div className='text-amber-900 text-lg leading-relaxed font-serif text-justify px-4'>
                <p className='first-letter:text-5xl first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-2 first-letter:mt-1'>
                  {product.description}
                </p>
              </div>
              
              {/* Décoration de page */}
              <div className='mt-8 flex justify-center'>
                <div className='w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent'>
                  {showToast && (
                    <div className="text-green-600 w-54 -ml-16 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out z-50">
                      Article ajouté au panier ✅
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ombre du livre */}
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full h-6 bg-black opacity-10 rounded-full blur-md'></div>
      </div>

      {/* Layout mobile et tablette */}
      <div className='lg:hidden w-full max-w-md mx-auto'>
        <div className='bg-white rounded-lg shadow-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50'>
          
          {/* Image du livre */}
          <div className='flex justify-center p-6 pb-4'>
            <div className='transform hover:scale-105 transition-transform duration-300'>
              <img 
                className='h-64 w-48 sm:h-80 sm:w-60 rounded-lg shadow-lg border-2 border-amber-200' 
                src={product.image_url} 
                alt={product.title} 
              />
            </div>
          </div>
          
          {/* Rating */}
          <div className='px-6 pb-4 text-center'>
            <p className='text-amber-800 text-xl font-bold mb-2'>Évaluation</p>
            <p className='text-amber-700 text-2xl'>{product.rating} ⭐</p>
          </div>
          
          {/* Description */}
          <div className='px-6 pb-4'>
            <h2 className='text-amber-800 text-2xl font-bold mb-4 text-center border-b-2 border-amber-200 pb-2'>
              Description
            </h2>
            
            <div className='text-amber-900 text-base leading-relaxed font-serif text-justify'>
              <p className='first-letter:text-3xl first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-2 first-letter:mt-1'>
                {product.description}
              </p>
            </div>
          </div>
          
          {/* Bouton d'achat */}
          <div className='p-6 pt-4 text-center'>
            <button
              onClick={handleAjouterPanier}
              className='w-full bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-amber-900 
                        text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 
                        transition-all duration-300 cursor-pointer border-none'>
              Ajouter au panier
            </button>
            
            {/* Toast notification */}
            {showToast && (
              <div className="mt-4 text-green-600 text-center font-semibold">
                Article ajouté au panier ✅
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 