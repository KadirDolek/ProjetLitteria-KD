"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">Chargement...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">
          Redirection vers la connexion...
        </div>
      </div>
    );
  }

  return (
    <section className="w-auto mt-32 mb-18 flex flex-wrap flex-col">
      <h1 className="sm:text-sm lg:text-2xl text-black flex justify-center mb-12 text-2xl mx-auto">
        Informations de votre compte
      </h1>
      <div className="h-auto mx-auto rounded-3xl flex flex-wrap">
        <div className="w-full lg:w-[600px] h-auto shadow-2xl mx-auto rounded-3xl px-8 py-8 flex flex-col gap-6 border-2">
          <div className="flex justify-center">
            <img
              src={session.user.image}
              alt="Photo de profil"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div>
            <h2 className="text-black font-bold text-lg mb-2">
              <span className="flex justify-between">
                <p> Nom d'utilisateur:</p>
                <p>{session.user.name}</p>
              </span>
            </h2>
            <h2 className="text-black font-bold text-lg mb-2">
              <span className="flex justify-between">
                <p>Adresse mail:</p>
                <p>{session.user.email}</p>
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-amber-700 to-orange-800 hover:opacity-75 
              text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl shadow-2xl py-2"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
