"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../store/bookSlice";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Collection() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.books);
  const lightPage = 200;
  const light = data.filter((book) => book.num_pages && book.num_pages < lightPage);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);


  if (status === "loading") return <div>Chargement...</div>;
  if (!data.length) return notFound;

  return (
    <section className="h-auto mt-42 text-black mb-24">
    <div>
        <h2 className="mb-12 font-bold text-2xl">Rapide à lire ! (moins de 200 pages)</h2>
        <div className="flex overflow-x-auto w-auto gap-4 shadow-2xl">
            {light.map((book) => (
            <div
                key={book.id}
                className="min-w-[220px] h-70 text-center bg-transparent rounded-xl shadow hover:shadow-lg">
                    <p className="font-bold">{book.title}</p>
                    <img className="h-42 w-32 mx-auto" src={book.image_url} alt="" />
                <p className="text-sm mt-1 text-amber-600">{book.num_pages} pages</p>
                <Link href={`/details/${book.id}`} className="text-amber-600 mt-2 block">
                    Voir le livre
                </Link>
            </div>
            ))}
        </div>
    </div>
        <div>
            <h2 className="mb-12">Littérature russes:</h2>
            <div className="w-320 h-80 bg-white mx-auto">

            </div>
        </div>
        <div>
            <h2 className="mb-12" >Livres historiques</h2>
            <div className="w-320 h-80 bg-white mx-auto">

            </div>
        </div>
    </section>
  );
}
