"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/bookSlice";
import Link from "next/link";
import Carousel from "../components/Carousel";

export default function Home() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [bestCurrentPage, setBestCurrentPage] = useState(1);
  const bestItemsPerPage = 3;

  useEffect(() => {
    if (status === "idle") dispatch(fetchBooks());
  }, [dispatch, status]);

  if (status === "loading") return <div className="text-black">Chargement...</div>;
  if (status === "failed") return <div className="text-red-500">Erreur de chargement</div>;
  if (!data.length) return null;

  const auteurRecherche = "J.K. Rowling";
  const livresAuteur = data.filter((book) => book.authors && book.authors.includes(auteurRecherche));
  const best = data.filter((book) => book.rating > 4);

  const totalPages = Math.ceil(livresAuteur.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = livresAuteur.slice(startIdx, startIdx + itemsPerPage);

  const bestTotalPages = Math.ceil(best.length / bestItemsPerPage);
  const bestStartIdx = (bestCurrentPage - 1) * bestItemsPerPage;
  const bestCurrentItems = best.slice(bestStartIdx, bestStartIdx + bestItemsPerPage);

  return (
    <>
      {/* Carousel Section */}
      <motion.section
        
        className="justify-center mb-16 hidden lg:flex relative"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Carousel />
        <img
          src="./read_book.png"
          className="w-80 absolute top-170 right-0 transform -translate-y-1/2 hidden xl:block"
          alt="Book reading"
        />
        <img
          src="./livre_tavu.png"
          className="w-80 absolute top-0 -left-10 transform -translate-y-1/2 hidden xl:block"
          alt="Book reading"
        />
      </motion.section>

      {/* Best Rated Section */}
      <motion.section
        className="flex justify-center flex-col mb-24 px-4"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="mb-8 flex justify-center">
          <h2 className="text-amber-900 font-bold text-xl sm:text-2xl text-center sm:text-left">
            Nos livres les mieux notés :
          </h2>
        </div>

        <div className="w-full max-w-4xl bg-gray-700 rounded-2xl flex flex-col gap-4 mx-auto p-4 shadow-2xl">
          {bestCurrentItems.map((book) => (
            <div key={book.id} className="text-white flex flex-col sm:flex-row gap-3">
              <img
                className="w-24 mx-auto sm:mx-0 transition-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
                src={book.image_url}
                alt=""
              />
              <div className="text-xs sm:text-sm">
                <span className="text-lg underline text-amber-50">{book.title}</span>{" "}
                <Link
                  href={`/details/${book.id}`}
                  className="cursor-pointer hover:underline hover:text-amber-700 ml-2"
                >
                  ➥ Voir les détails
                </Link>
                <p className="italic text-amber-50 mt-2 line-clamp-6">{book.description}</p>
                <span className="text-amber-50">{book.rating} ⭐</span>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center flex-wrap gap-2 mt-4">
            <button
              className="px-2 py-1 text-amber-50 hover:text-amber-700 disabled:opacity-50"
              onClick={() => setBestCurrentPage((p) => Math.max(1, p - 1))}
              disabled={bestCurrentPage === 1}
            >
              &larr; Previous
            </button>
            {Array.from({ length: bestTotalPages }).map((_, i) => {
              if (
                i === 0 ||
                i === bestTotalPages - 1 ||
                Math.abs(i + 1 - bestCurrentPage) <= 1
              ) {
                return (
                  <button
                    key={i}
                    className={`cursor-pointer px-2 py-1 rounded ${
                      bestCurrentPage === i + 1
                        ? "bg-gray-800 text-amber-50"
                        : "hover:bg-gray-500"
                    }`}
                    onClick={() => setBestCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                );
              }
              if (
                (i === 1 && bestCurrentPage > 4) ||
                (i === bestTotalPages - 2 && bestCurrentPage < bestTotalPages - 3) ||
                (Math.abs(i + 1 - bestCurrentPage) === 2 &&
                  i + 1 !== 2 &&
                  i + 1 !== bestTotalPages - 1)
              ) {
                return (
                  <span key={i} className="px-2 text-amber-50">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              className="px-2 py-1 text-amber-50 hover:text-amber-700 disabled:opacity-50"
              onClick={() => setBestCurrentPage((p) => Math.min(bestTotalPages, p + 1))}
              disabled={bestCurrentPage === bestTotalPages}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="flex justify-center flex-col mb-24 px-4"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="mb-8 flex justify-center">
          <h2 className="text-amber-900 font-bold text-xl sm:text-2xl text-center sm:text-left">
            Sorties littéraires de J.K. Rowling :
          </h2>
           <img
          src="./read_booking.png"
          className="w-80 absolute top-453 left-20 transform -translate-y-1/2 hidden xl:block"
          alt="Book reading"
        />
        </div>

        <div className="w-full max-w-4xl bg-gray-700 rounded-2xl flex flex-col gap-4 mx-auto p-4 shadow-2xl">
          {currentItems.map((book) => (
            <div key={book.id} className="text-white flex flex-col sm:flex-row gap-3">
              <img
                className="w-24 mx-auto sm:mx-0 transition-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
                src={book.image_url}
                alt=""
              />
              <div className="text-xs sm:text-sm">
                <span className="text-lg underline text-amber-50">{book.title}</span>{" "}
                <Link
                  href={`/details/${book.id}`}
                  className="cursor-pointer hover:underline hover:text-amber-700 ml-2"
                >
                  ➥ Voir les détails
                </Link>
                <p className="italic text-amber-50 mt-2 line-clamp-6">{book.description}</p>
                <span className="text-amber-50">{book.rating} ⭐</span>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center flex-wrap gap-2 mt-4">
            <button
              className="px-2 py-1 text-amber-50 hover:text-amber-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &larr; Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
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
                        : "hover:bg-gray-500"
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
                  <span key={i} className="px-2 text-amber-50">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              className="px-2 py-1 text-amber-50 hover:text-amber-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        </div>
         
      </motion.section>
    </>
  );
}
