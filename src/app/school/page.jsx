"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../store/bookSlice";
import Link from "next/link";



export default function Collection() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);


  const ecole = data.filter(book => 
  book.genres.includes("School"))

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

 


  if (status === "loading") return <div>Chargement...</div>;
  if (!data.length) return <notFound/>;

  return (
    <section className="h-auto mt-42 text-black">
      <h2 className="ps-14 mb-12 text-amber-900 font-bold text-2xl">
        Notre collection de livre pour écoles:
      </h2>

      <div className="flex flex-wrap gap-x-64 gap-y-6 justify-center">
        {ecole.map((book) => (
          <div
            key={book.id}
            className="group flip-card w-64 h-82 relative rounded-3xl"
          >
            <div className="flip-inner w-full h-full relative">
              {/* Devant */}
              <div className="flip-front bg-transparent rounded-3xl shadow-2xl flex items-center justify-center">
                <img
                  className="rounded-2xl size-82 fit-contain"
                  src={book.image_url}
                  alt={book.title}/>
              </div>

              {/* Derrière */}
              <div className="flip-back bg-gray-100 rounded-3xl shadow-2xl flex items-center justify-center p-4">
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
    </section>
  );
}
