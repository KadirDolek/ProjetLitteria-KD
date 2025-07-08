'use client'


import React from 'react'
import { useSelector } from "react-redux";

export default function Collection() {
  const { data, status } = useSelector((state) => state.books);

  const itemsPerPage = 18; 
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);

  if (status === 'loading') return <div>Chargement...</div>;
  if (!data.length) return null;

  return (
    <section className='h-auto mt-42 text-black '>
      <h2 className='ps-14 mb-12 text-amber-900 font-bold text-2xl'>Notre collection complète:</h2> <br />
      <div className="grid grid-cols-3 gap-8">
        {currentItems.map(book => (
          <div key={book.id} className="flex flex-col items-center">
            <img className='rounded-2xl w-64 h-82' src={book.image_url} alt="" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-3 py-1 bg-transparent disabled:opacity-50 cursor-pointer"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="text-black">{currentPage} / {totalPages}</span>
        <button
          className="px-3 py-1 bg-transparent disabled:opacity-50 cursor-pointer"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </section>
  )
}
