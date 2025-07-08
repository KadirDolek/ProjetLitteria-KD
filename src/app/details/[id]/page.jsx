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
    <div className='flex flex-col items-center justify-center mx-auto w-full h-screen'>
      <img className='h-80 w-80 rounded-lg' src={product.image_url} alt={product.title} />
      <hr className='w-90 my-4' />
      <p>{product.description}</p>
      <p>{product.rating} ⭐</p>
    </div>
  );
}

