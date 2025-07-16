"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import Link from "next/link";
;


export default function UserInfo() {
  const { data: session, status } = useSession();
  const { user: localUser, logout } = useLocalAuth();
  const router = useRouter();



  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">Chargement...</div>
      </div>
    );
  }

  if (status === "unauthenticated" && !localUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">
          Vous n'êtes pas connectés,
          <Link className="text-amber-700 underline hover:opacity-75" href="/login">
            connectez vous
          </Link>  pour consulter vos données personnelles <br />
        </div>
        
      </div>
    );
  }

  // Je peux séparer nom et prénom comme ca, faut remplir userInfo un peu
  const user = session?.user || localUser;
  const [firstName, ...lastNameParts] = (user.name || '').split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <section className="w-auto mt-32 mb-18 flex flex-wrap flex-col">
      <h1 className="sm:text-sm lg:text-2xl text-black flex justify-center mb-12 text-2xl mx-auto">
        Informations de votre compte
      </h1>
      <div className="h-auto mx-auto rounded-3xl flex flex-wrap">
        <div className="w-full lg:w-[600px] h-auto shadow-2xl mx-auto rounded-3xl px-8 py-8 flex flex-col gap-6 border-2">
          <div className="flex justify-center">
            <img
              src={user.image}
              alt="Photo de profil"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div>
            <h2 className="text-black font-bold text-lg mb-2">
              <span className="flex justify-between">
                <p> Prénom:</p>
                <p>{firstName}</p>
              </span>
            </h2>
            <h2 className="text-black font-bold text-lg mb-2">
              <span className="flex justify-between">
                <p> Nom:</p>
                <p>{lastName}</p>
              </span>
            </h2>
            <h2 className="text-black font-bold text-lg mb-2">
              <span className="flex justify-between">
                <p>Adresse mail:</p>
                <p>{user.email}</p>
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
            {localUser && (
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="bg-gradient-to-r from-red-700 to-red-800 hover:opacity-75 
                text-white font-bold cursor-pointer w-48 mx-auto rounded-2xl shadow-2xl py-2"
              >
                Se déconnecter
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}