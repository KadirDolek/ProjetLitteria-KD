"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/bookSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (status === "idle") dispatch(fetchBooks());
  }, [dispatch, status]);

  if (status === "loading")
    return <div className="text-black">Chargement...</div>;
  if (status === "failed")
    return <div className="text-red-500">Erreur de chargement</div>;
  if (!data.length) return null;

  const auteurRecherche = "J.K. Rowling";
  const livresAuteur = data.filter(
    (book) => book.authors && book.authors.includes(auteurRecherche)
  );
  const totalPages = Math.ceil(livresAuteur.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = livresAuteur.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <section className="h-auto flex justify-center mt-36 mb-28">
        <div className="w-3/4 bg-gray-700 h-112 rounded-4xl shadow-2xl">
          <p className="text-white p-12"> Romance,School,Dystopique</p>
        </div>
      </section>
      <section className="flex justify-center mb-28">
        <div className="w-2/4 bg-gray-700 h-112 rounded-4xl shadow-2xl">
        <p className="text-white p-12">Sorties récentes/</p>
        </div>
      </section>
      <section className="flex justify-center flex-col mb-24">
        <div className="px-54 mb-24">
          <h2 className="text-amber-900 font-bold">
            Sorties littéraires de J.K. Rowling :
          </h2>
        </div>
        <div className="w-3/4 bg-gray-700 h-152 rounded-4xl flex mx-auto flex-col gap-3 p-6 shadow-2xl">
          {currentItems.map((book) => (
            <div key={book.id} className="text-white px-2 gap-3 flex h-42">
              <img
                className="w-24 mt-3 transition-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
                src={book.image_url}
                alt=""
              />{" "}
              <br />
              <div style={{ fontSize: "12px" }}>
                <span className="text-2xl underline text-amber-50">
                  {book.title}
                </span>{" "}
                <button className="cursor-pointer hover:underline hover:text-amber-700">
                  ➥ Voir les détails
                </button>
                <span className="italic text-amber-50">
                  <p> {book.description}</p>
                  {book.rating} ⭐
                </span>
              </div>
            </div>
          ))}

          {/* Bouton Next/Prev*/}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-2 py-1 text-amber-50 cursor-pointer hover:text-amber-700"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &larr; Previous
            </button>
            {/* Numéros de page */}
            {Array.from({ length: totalPages }).map((_, i) => {
              // Affiche toujours première dernière et page courante
              if (
                i === 0 ||
                i === totalPages - 1 ||
                Math.abs(i + 1 - currentPage) <= 1
              ) {
                return (
                  <button
                    key={i}
                    className={`cursor-pointer px-2 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-gray-800 text-amber-50"
                        : "text-shadow-amber-200 hover:bg-gray-500"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                );
              }
              if (
                (i === 1 && currentPage > 4) ||
                (i === totalPages - 2 && currentPage < totalPages - 3) ||
                (Math.abs(i + 1 - currentPage) === 2 &&
                  i + 1 !== 2 &&
                  i + 1 !== totalPages - 1)
              ) {
                return (
                  <span key={i} className="px-2 text-amber-50 cursor-pointer">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              className="px-2 py-1 text-amber-50 cursor-pointer hover:text-amber-700"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
