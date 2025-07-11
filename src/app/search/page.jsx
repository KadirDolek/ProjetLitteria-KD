'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/bookSlice';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
//   Grave important pour la recherche
  const query = searchParams.get('q') || '';
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchBooks());
  }, [dispatch, status]);

  useEffect(() => {
    if (query && data.length) {
      const results = data.filter((book) => {
        // Majuscule ou minuscule c'est la même avec lowercase
        const normalizedQuery = query.toLowerCase();
        const normalizedTitle = book.title?.toLowerCase() || '';
        
        //Obligé faut préciser Array sinon ca bug, genre tu dis que ca va etre chaine de lettre 
        if (Array.isArray(book.authors)) {
          return (
            normalizedTitle.includes(normalizedQuery) ||
            book.authors.some(author => 
              author?.toLowerCase().includes(normalizedQuery)
            )
          );
        }
        // 2. Si l'auteur egale un string 
        else if (typeof book.authors === 'string') {
          return (
            normalizedTitle.includes(normalizedQuery) ||
            book.authors.toLowerCase().includes(normalizedQuery)
          );
        }
        // 3. Sinon oklm on prend le titre
        else {
          return normalizedTitle.includes(normalizedQuery);
        }
      });
      setSearchResults(results);
    }
  }, [query, data]);

  if (status === 'loading') return <div className="text-black">Chargement...</div>;
  if (status === 'failed') return <div className="text-red-500">Erreur de chargement</div>;

  return (
    <div className="container mx-auto px-4 py-36">
      <h1 className="text-3xl font-bold mb-8 text-amber-900">
        Résultats de recherche pour "{query}"
      </h1>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((book) => {
            let authorsDisplay = '';
            if (Array.isArray(book.authors)) {
              authorsDisplay = book.authors.join(', ');
            } else if (typeof book.authors === 'string') {
              authorsDisplay = book.authors;
            }

            return (
              <div key={book.id} className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-4 shadow-lg">
                <Link href={`/details/${book.id}`}>
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </Link>
                <h2 className="text-xl font-bold text-amber-50 mb-2">
                  <Link href={`/details/${book.id}`} className="hover:underline">
                    {book.title}
                  </Link>
                </h2>
                {authorsDisplay && (
                  <p className="text-gray-300 mb-2 font-bold">Auteur : &nbsp; {authorsDisplay}</p>
                )}
                <p className="text-amber-50 font-bold">{book.rating} ⭐</p>
                <Link 
                  href={`/details/${book.id}`} 
                  className="mt-4 inline-block bg-gradient-to-r from-amber-700 to-orange-800  text-white px-4 py-2 rounded-lg hover:from-amber-800 hover:to-amber-900 transition-colors"
                >
                  Voir détails
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-black text-xl text-center">Aucun résultat trouvé.</p>
      )}
    </div>
  );
}