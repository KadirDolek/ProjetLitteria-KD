'use client'
import React, { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../../../store/bookSlice'
import { ajouterPanier } from '../../../store/cartSlice'

export default function Details() {
  //  la base on utilise l'id pour l'ordre des objet dans l'API
  const { id } = useParams();
  //  Ca dispatch fort l'api
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.books);
  //  pour le ptit 'ajouté au panier'
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  // Handle loading state
  if (status === 'loading' || status === 'idle') {
    return <div className="text-center mt-16 text-xl">Chargement...</div>;
  }

  // Parse ID and match
  const product = data.find(book => book.id.toString() === id);

  // If product not found, return 404
  if (!product) {
    return notFound();
  }

  const handleAjouterPanier = () => {
    dispatch(ajouterPanier(product));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div className='flex flex-col items-center justify-center mx-auto w-full py-6 md:py-12 mt-16 md:mt-24 mb-12 md:mb-24 px-4'>
      <h1 className='text-black text-2xl md:text-4xl mb-6 md:mb-8 text-center font-bold max-w-4xl'>
        {product.title}
      </h1>

      {/* Desktop version */}
      <div className='relative hidden lg:block'>
        <div className='absolute left-1/2 top-0 w-4 h-full bg-gradient-to-r from-amber-800 to-amber-900 transform -translate-x-1/2 z-10 rounded-sm shadow-lg'></div>
        <div className='flex bg-white rounded-lg shadow-2xl overflow-hidden max-w-6xl'>

          {/* Left Page */}
          <div className='w-1/2 p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-r-2 border-amber-200'>
            <div className='flex flex-col items-center h-full'>
              <img 
                className='h-80 w-60 mb-6 rounded-lg shadow-lg border-2 border-amber-200' 
                src={product.image_url} 
                alt={product.title} 
              />
              <div className='mb-6 text-center'>
                <p className='text-amber-800 text-2xl font-bold mb-2'>Évaluation</p>
                <p className='text-amber-700 text-3xl'>{product.rating} ⭐</p><br/>
                {product.discount > 0 ? (
                  <>
                    <p className='text-red-600 line-through text-xl'>{product.price} €</p>
                    <p className='text-green-700 font-bold text-3xl'>
                      {product.discountedPrice} € 
                      <span className="text-sm font-semibold text-green-800"> (-{product.discount}%)</span>
                    </p>
                  </>
                ) : (
                  <p className='text-amber-700 text-3xl'>{product.price} €</p>
                )}
              </div>
              <button
                onClick={handleAjouterPanier}
                className='bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-amber-900 
                          text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300'>
                Ajouter au panier
              </button>
            </div>
          </div>

          {/* Right Page */}
          <div className='w-1/2 p-8 bg-gradient-to-bl from-amber-50 to-orange-50'>
            <h2 className='text-amber-800 text-3xl font-bold mb-6 text-center border-b-2 border-amber-200 pb-4'>
              Description
            </h2>
            <div className='text-amber-900 text-lg leading-relaxed font-serif text-justify px-4'>
              <p className='first-letter:text-5xl first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-2 first-letter:mt-1'>
                {product.description}
              </p>
            </div>
            {showToast && (
              <div className="mt-6 text-green-600 text-center font-semibold transition-opacity duration-300">
                Article ajouté au panier ✅
              </div>
            )}
          </div>
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full h-6 bg-black opacity-10 rounded-full blur-md'></div>
      </div>

      {/* Mobile/Tablet */}
      <div className='lg:hidden w-full max-w-md mx-auto'>
        <div className='bg-white rounded-lg shadow-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50'>
          <div className='flex justify-center p-6 pb-4'>
            <img 
              className='h-64 w-48 sm:h-80 sm:w-60 rounded-lg shadow-lg border-2 border-amber-200' 
              src={product.image_url} 
              alt={product.title} 
            />
          </div>
          <div className='px-6 pb-4 text-center'>
            <p className='text-amber-800 text-xl font-bold mb-2'>Évaluation</p>
            <p className='text-amber-700 text-2xl'>{product.rating} ⭐</p>
            <div className="text-center mt-4">
              <p className="text-amber-800 text-2xl font-bold mb-1">Prix</p>
              {product.discount > 0 ? (
                <div>
                  <p className="text-red-600 text-xl line-through">{product.price} €</p>
                  <p className="text-green-700 text-3xl font-bold">
                    {product.discountedPrice} €
                    <span className="text-sm font-semibold text-green-800 ml-1">
                      (-{product.discount}%)
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-amber-700 text-3xl font-bold">{product.price} €</p>
              )}
            </div>
          </div>
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
          <div className='p-6 pt-4 text-center'>
            <button
              onClick={handleAjouterPanier}
              className='w-full bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-amber-900 
                        text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 
                        transition-all duration-300'>
              Ajouter au panier
            </button>
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