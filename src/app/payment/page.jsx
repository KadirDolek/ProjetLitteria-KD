"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { addPurchase } from "../../store/historySlice";
import { clearHist } from "../../store/cartSlice";
import { useSession } from "next-auth/react";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import Link from "next/link";

export default function Page() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { user: localUser } = useLocalAuth();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const mapSrc = userInfo.address
    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBwfPTLdTYLvTd21EIMsaMrYGy4giLmLzs&q=${encodeURIComponent(
        userInfo.address
      )}`
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5037.387110338958!2d4.338645076848227!3d50.8553587581269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c38c275028d3%3A0xc7799151146ebf77!2sMolenGeek!5e0!3m2!1sen!2sbe!4v1752493420275!5m2!1sen!2sbe";

  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  // Détermine l'ID utilisateur
  const userId = session?.user?.email || localUser?.email || "guest";

  const handlePayment = () => {
    if (!selectedMethod)
      return alert("Veuillez sélectionner un moyen de paiement.");
    setIsLoading(true);

    // Préparation des données
    const purchaseItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
    }));

    dispatch(
      addPurchase({
        userId,
        items: purchaseItems,
        total: totalPrice,
        userInfo,
        paymentMethod: selectedMethod,
      })
    );

    setTimeout(() => {
      dispatch(clearHist());
      setIsLoading(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.address) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    setShowPayment(true);
  };

  const paymentMethods = [
    {
      name: "Visa",
      id: "visa",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    },
    {
      name: "Mastercard",
      id: "mastercard",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    },
    {
      name: "PayPal",
      id: "paypal",
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
  ];
   

  return (
    <section className="h-auto">
      <div className="flex justify-center mt-32 mb-24 flex-wrap-reverse">
        <div className="h-[500px] w-[500px] shadow-2xl rounded-2xl">
          <iframe
            src={mapSrc}
            className="m-auto my-1 rounded-2xl"
            width="495"
            height="495"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div
          className={`h-[500px] w-[500px] shadow-2xl bg-gray-100 rounded-2xl p-6 ${
            isLoading ? "cursor-wait" : "cursor-auto"
          }`}
        >
          {!showPayment ? (
            <>
              <h2 className="text-xl text-black mb-4 text-center">
                Vos Informations
              </h2>
              <form onSubmit={handleUserSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  className="p-2 rounded border text-black"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Nom"
                  className="p-2 rounded border text-black"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  className="p-2 rounded border text-black"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                  required
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-amber-700 text-white py-3 rounded-xl font-semibold hover:opacity-75"
                >
                  Continuer vers le paiement
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl text-black mb-4 text-center">
                Sélectionnez votre moyen de paiement
              </h2>

              <div className="flex flex-col gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all 
                    ${
                      selectedMethod === method.id
                        ? "border-amber-500 bg-blue-50"
                        : "border-gray-300 hover:border-amber-300"
                    }`}
                  >
                    <img src={method.img} alt={method.name} className="h-6" />
                    <span>{method.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="mt-6 w-full bg-amber-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center hover:opacity-75 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Paiement en cours...
                  </>
                ) : (
                  "Payer"
                )}
              </button>

              {items.length > 0 && (
                <div className="text-black text-lg mt-6 text-center">
                  <p>Total : {totalPrice.toFixed(2)} €</p>
                </div>
              )}

              {paymentSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Paiement validé avec succès !
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Merci pour votre achat. Votre commande sera livrée le{" "}
                        {new Date(
                          Date.now() + 2 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                        .
                      </p>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-700">
                          Adresse de livraison :
                        </p>
                        <p className="text-gray-600">{userInfo.address}</p>
                      </div>
                      <div className="mt-6">
                        <Link
                          href="/"
                          className="w-full bg-amber-700 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 inline-block text-center"
                        >
                          Retour à l'accueil
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
