"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../store/bookSlice";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Collection() {

// On dispatch mon reducer de books pour l'utiliser ici
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);


// Ptit genre trié en lightpage en mode t'aimes pas trop lire donc c'est moinns de 200 pages (catégorie pour gland)
  const lightPage = 200;
  const light = data.filter((book) => book.num_pages && book.num_pages < lightPage);


// Tableau des différents genre on tape dedans aléatoirement
  const genres = ["Classics",
                  "Fiction",
                  "Mystery",
                  "Russian",
                  "Gothic",
                  "Romance",
                  "Young Adult",
                  "Historical",
                  "Biography",
                  "Nonfiction",
                  "Dystopia",
                  "Science Fiction",
                  "Cultural",
                  "Religion",
                  "Politics",
                  "European Literature",
                  "Spanish Literature",
                  "French Literature",
                  "Academic",
                  "School",
                  "Poetry",
                  "Paranormal",
                  "Fantasy",
                  "Novels",
                  "Philosophy",
                  "Thriller",
                  "Childrens",
                  "Crime"
                  ];



// je prend 3 fois un genre aléatoirement
  // Ptit filtre des livres par genre pour le 1er
  const randomGenre1 = genres[Math.floor(Math.random() * genres.length)];
  const random1 = data.filter(book => 
  book.genres.includes(randomGenre1)
);
// 2eme filtre random
  const randomGenre2 = genres[Math.floor(Math.random() * genres.length)];
  const random2 = data.filter(book => 
  book.genres.includes(randomGenre2)
);
// 3eme filtre random
  const randomGenre3 = genres[Math.floor(Math.random() * genres.length)];
  const random3 = data.filter(book => 
  book.genres.includes(randomGenre3)
);


//  Ca sert au déclenchement de l'effet de dispatch quand le composant est monté quand on arrive sur la page tkt meme pas 

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  // Au cas ou internet merde, ptit message en attendant

  if (status === "loading") return <div>Chargement...</div>;
  if (!data.length) return <notFound/>;

  return (
    <section className="h-auto mt-42 text-black mb-24">
    <div className="mb-12">
        <h2 className="mb-12 font-bold text-2xl">Rapide à lire ! (moins de 200 pages)</h2>
        <div className="flex overflow-x-auto w-auto gap-4 shadow-2xl">
            {light.map((book) => (
            <div
                key={book.id}
                className="min-w-[220px] h-75 text-center bg-transparent rounded-xl shadow hover:shadow-lg">
                    <p className="font-bold mb-3 line-clamp-1">{book.title}</p>
                    <img className="h-42 w-32 mx-auto" src={book.image_url} alt="" />
                <p className="text-sm mt-1 text-amber-600">{book.num_pages} pages</p>
                <Link href={`/details/${book.id}`} className="text-amber-600 shadow-2xl mt-2 block hover:text-amber-900">
                    Voir le livre
                </Link>
            </div>
            ))}
        </div>
    </div>
        <div className="mb-12">
            <h2 className="mb-12 font-bold text-2xl">Sélection aléatoire:{randomGenre1}</h2>
            <div className="flex overflow-x-auto w-auto gap-4 shadow-2xl">
            {random1.map((book) => (
            <div
                key={book.id}
                className="min-w-[220px] h-75 text-center bg-transparent rounded-xl shadow hover:shadow-lg">
                    <p className="font-bold mb-3 line-clamp-1">{book.title}</p>
                    <img className="h-42 w-32 mx-auto" src={book.image_url} alt="" />
                <p className="text-sm mt-1 text-amber-600">{book.num_pages} pages</p>
                <Link href={`/details/${book.id}`} className="text-amber-600 mt-2 block hover:text-amber-900">
                    Voir le livre
                </Link>
            </div>
            ))}
        </div>
        </div>
       <div className="mb-12">
            <h2 className="mb-12 font-bold text-2xl">Sélection aléatoire:{randomGenre2}</h2>
            <div className="flex overflow-x-auto w-auto gap-4 shadow-2xl">
            {random2.map((book) => (
            <div
                key={book.id}
                className="min-w-[220px] h-75 text-center bg-transparent rounded-xl shadow hover:shadow-lg">
                    <p className="font-bold mb-3 line-clamp-1">{book.title}</p>
                    <img className="h-42 w-32 mx-auto" src={book.image_url} alt="" />
                <p className="text-sm mt-1 text-amber-600">{book.num_pages} pages</p>
                <Link href={`/details/${book.id}`} className="text-amber-600 mt-2 block hover:text-amber-900">
                    Voir le livre
                </Link>
            </div>
            ))}
        </div>
        </div>
        <div className="mb-12">
            <h2 className="mb-12 font-bold text-2xl">Sélection aléatoire:{randomGenre3}</h2>
            <div className="flex overflow-x-auto w-auto gap-4 shadow-2xl">
            {random3.map((book) => (
            <div
                key={book.id}
                className="min-w-[220px] h-75 text-center bg-transparent rounded-xl shadow hover:shadow-lg">
                    <p className="font-bold mb-3 line-clamp-1">{book.title}</p>
                    <img className="h-42 w-32 mx-auto" src={book.image_url} alt="" />
                <p className="text-sm mt-1 text-amber-600">{book.num_pages} pages</p>
                <Link href={`/details/${book.id}`} className="text-amber-600 mt-2 block hover:text-amber-900">
                    Voir le livre
                </Link>
            </div>
            ))}
        </div>
        </div>
    </section>
  );
}
