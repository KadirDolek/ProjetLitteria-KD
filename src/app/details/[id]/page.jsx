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
    <div className='relative flex flex-col items-center justify-center mx-auto w-full h-auto py-6 shadow-2xl mb-24 rounded-4xl mt-36 lg:px-48 sm:px-24'>
      <h2 className='text-black lg:text-4xl mb-12 sm:text-xl'>{product.title}</h2>
      <img className='lg:h-80 lg:w-60 rounded-lg sm:h-40 sm:w-30' src={product.image_url} alt={product.title} />
      <hr className='w-90 my-4' />
      <p className='text-black text-center lg:text-xl px-12 font-bold sm:text-xs'>{product.description}</p>
      <p className='text-black text-2xl mt-12 mb-6'>{product.rating} ⭐</p>
      <button
        onClick={handleAjouterPanier}
        className='border bg-gradient-to-r from-amber-700 to-orange-800 cursor-pointer hover:from-amber-800 hover:to-amber-900 px-8 shadow-2xl border-none rounded-4xl font-bold py-2'>
        Ajouter au panier
      </button>

      {showToast && (
        <div className="relative top-0 right-0 text-red-500 px-4 py-2 transition-opacity duration-300 ease-in-out">
           Article ajouté au panier ✅
        </div>
      )}
    </div>
  );
}
