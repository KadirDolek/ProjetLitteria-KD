'use client'

import React, { useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../../../store/bookSlice'

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Chargement...</div>;

  const product = data.find(m => m.id.toString() === id);

  if (!product) return notFound();

  return (
    <div className='flex flex-col items-center justify-center mx-auto w-full h-200 shadow-2xl mb-24 rounded-4xl mt-36'>
    <h2 className='text-black text-4xl mb-12'>{product.title}</h2>
      <img className='h-80 w-60 rounded-lg' src={product.image_url} alt={product.title} />
      <hr className='w-90 my-4' />
      <p className='text-black text-center text-xl px-12 font-bold'>{product.description}</p>
      <p className='text-black text-2xl mt-12 mb-6'>{product.rating} ⭐</p>
      <button className='border bg-amber-900 cursor-pointer px-8 shadow-2xl border-none rounded-4xl font-bold py-2'>Ajouter au panier</button>
    </div>
  );
}

