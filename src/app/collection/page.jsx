"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../store/bookSlice";
import Link from "next/link";

export default function Collection() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);
  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);

  if (status === "loading") return <div>Chargement...</div>;
  if (!data.length) return <notFound/>;

  return (
    <section className="h-auto mt-42 text-black">
      <h2 className="ps-14 mb-12 text-amber-900 font-bold text-2xl">
        Notre collection complète:
      </h2>

      <div className="flex flex-wrap gap-x-64 justify-center">
        {currentItems.map((book) => (
          <div
            key={book.id}
            className="group flip-card w-64 h-82 relative rounded-3xl"
          >
            <div className="flip-inner w-full h-full relative">
              {/* Devant */}
              <div className="flip-front bg-transparent rounded-3xl shadow-2xl flex items-center justify-center p-4">
                <img
                  className="rounded-2xl w-48 object-contain"
                  src={book.image_url}
                  alt={book.title}
                />
              </div>

              {/* Derrière */}
              <div className="flip-back bg-transparent rounded-3xl shadow-2xl flex items-center justify-center p-4">
                <Link href={`/details/${book.id}`}>
                  <p className="text-black text-sm text-center line-clamp-7 font-bold">
                    {book.description}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8 mb-12">
        <button
          className="px-3 py-1 bg-transparent disabled:opacity-50 cursor-pointer font-bold"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="text-black font-bold">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-transparent disabled:opacity-50 cursor-pointer font-bold"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
