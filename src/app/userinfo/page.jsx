"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import Link from "next/link";

export default function UserInfo() {
  // Récupère la session utilisateur (authentification NextAuth)
  const { data: session, status } = useSession();

  // Récupère l'utilisateur local via hook personnalisé
  const { user: localUser, logout, updateUser } = useLocalAuth();

  const router = useRouter();

  // État pour modif les infos 
  const [editMode, setEditMode] = useState(false);

  // Définit l'utilisateur actif (session ou local)
  const user = session?.user || localUser;

  // Informations modifiables (nom, prénom, email)
  const [editableInfo, setEditableInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Met à jour editableInfo quand les infos utilisateur changent
  useEffect(() => {
    if (user) {
      const [firstName = "", ...lastNameParts] = (user.name || "").split(" ");
      const lastName = lastNameParts.join(" ");

      setEditableInfo({
        firstName,
        lastName,
        email: user.email || "",
      });
    }
  }, [user]);

  // Affiche un message de chargement pendant la récupération de la session
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">Chargement...</div>
      </div>
    );
  }

  // Affiche un message si l'utilisateur n'est pas connecté
  if (status === "unauthenticated" && !localUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-black text-xl">
          Vous n'êtes pas connectés,{" "}
          <Link
            className="text-amber-700 underline hover:opacity-75"
            href="/login"
          >
            connectez-vous
          </Link>{" "}
          pour consulter vos données personnelles.
        </div>
      </div>
    );
  }

  // Si aucun utilisateur, ne rien afficher
  if (!user) {
    return null;
  }

  // Enregistre les modifications utilisateur
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: `${editableInfo.firstName} ${editableInfo.lastName}`,
      email: editableInfo.email,
    };

    if (localUser) {
      updateUser(updatedUser); // Met à jour l'utilisateur local
    }

    setEditMode(false); // Quitte le mode édition
  };

  // Interface utilisateur
  return (
    <section className="w-auto mt-32 mb-18 flex flex-wrap flex-col">
      <h1 className="text-2xl text-black text-center mb-12">
        Informations de votre compte
      </h1>
      <div className="mx-auto rounded-3xl shadow-2xl px-8 py-8 w-full max-w-lg border-2">
        <div className="relative flex justify-center mb-6 text-black text-center">
          <img
            src={user.image || "/default-user.png"}
            alt="Photo indisponible"
            className="w-24 h-24 rounded-full"
          />

          {/* Bouton pour modifier ou enregistrer les données */}
          <div className="absolute top-0 right-0">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-red-600 px-4 py-2 rounded-xl hover:text-red-800 cursor-pointer shadow-xl hover:scale-115 text-md"
              >
                Modifier
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="text-green-500 px-4 py-2 rounded-xl hover:opacity-75 text-md"
              >
                Enregistrer
              </button>
            )}
          </div>
        </div>

        {/* Champ prénom */}
        <label className="text-black font-bold">Prénom :</label>
        <input
          type="text"
          className="p-2 border rounded mb-4 w-full text-black border-none"
          readOnly={!editMode}
          value={editableInfo.firstName}
          onChange={(e) =>
            setEditableInfo({ ...editableInfo, firstName: e.target.value })
          }
        />

        {/* Champ nom */}
        <label className="text-black font-bold">Nom :</label>
        <input
          type="text"
          className="p-2 border rounded mb-4 w-full text-black border-none"
          readOnly={!editMode}
          value={editableInfo.lastName}
          onChange={(e) =>
            setEditableInfo({ ...editableInfo, lastName: e.target.value })
          }
        />

        {/* Champ email */}
        <label className="text-black font-bold">Email :</label>
        <input
          type="email"
          className="p-2 border rounded mb-4 w-full text-black border-none"
          readOnly={!editMode}
          value={editableInfo.email}
          onChange={(e) =>
            setEditableInfo({ ...editableInfo, email: e.target.value })
          }
        />
      </div>
    </section>
  );
}
