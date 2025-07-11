'use client'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { retirerPanier, modifierQuantite, viderPanier } from '../../store/cartSlice'
import Link from 'next/link'



export default function Panier() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const generatePrice = (itemId) => {
    Math.seedrandom = function(seed) {
      Math.random = function() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };
    };
    
    const seed = itemId.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    Math.seedrandom(seed);
    
    return Math.floor(Math.random() * 20) + 1;
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = generatePrice(item.id);
      const subtotal = price * (item.quantity || 1);
      return total + subtotal;
    }, 0);
  };

  const totalPrice = calculateTotal();


  const handleRetirerProduit = (productId) => {
    dispatch(retirerPanier(productId));
  };

  const handleModifierQuantite = (productId, newQuantity) => {
    dispatch(modifierQuantite({ id: productId, quantity: newQuantity }));
  };

  const handleViderPanier = () => {
    dispatch(viderPanier());
  };

  return (
    <section className='h-auto w-full mt-36'>
      <div className='min-h-[620px] w-[850px] shadow-2xl mx-auto rounded-3xl p-6 mb-12'>
        <h2 className='text-black text-3xl font-bold text-center mb-6'>Mon Panier</h2>
        
        <div className='bg-transparent min-h-[400px] w-full mx-auto shadow-2xl rounded-3xl p-4'>
          {items.length === 0 ? (
            <div className='flex items-center justify-center h-[300px]'>
              <p className='text-black text-xl'>Votre panier est vide</p>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <div key={item.id} className='flex items-center justify-between p-4 border-b border-gray-200 mb-4'>
                  <div className='flex items-center gap-4'>
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className='w-16 h-20 object-cover rounded-lg'
                    />
                    <div>
                      <h3 className='text-black font-bold text-lg'>{item.title}</h3>
                      <p className='text-gray-600'>{item.rating} ⭐</p>
                      {item.price && <p className='text-black font-bold'>{item.price}€</p>}
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <button 
                        onClick={() => handleModifierQuantite(item.id, item.quantity - 1)}
                        className='bg-gradient-to-r from-gray-600 to-gray-700 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer'
                      >
                        -
                      </button>
                      <span className='text-black font-bold'>{item.quantity}</span>
                      <button 
                        onClick={() => handleModifierQuantite(item.id, item.quantity + 1)}
                        className='bg-gradient-to-r from-gray-600 to-gray-700 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer'
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleRetirerProduit(item.id)}
                      className="bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-700 hover:to-orange-800 text-white px-4 py-2 rounded-3xl cursor-pointer transition-all duration-300">
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
              
              <div className='flex justify-end mt-4'>
                <button 
                  onClick={handleViderPanier}
                  className='bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-700 hover:bg-amber-800 text-white px-6 h-8 rounded-3xl cursor-pointer'
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <span className='flex justify-center gap-6 mt-10'> 
            <p className='text-black text-2xl'>Code de réduction:</p>
            <input className='bg-white border border-black px-2 py-1' type="text" placeholder='Code de réduction' />
            <button className='cursor-pointer bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-700 px-6 rounded-2xl shadow-2xl hover:opacity-75'>Valider</button>
          </span>
        </div>
        
        <div>
          <span>
            <p className='text-black font-bold text-2xl flex justify-center mt-6'>
              {items.length === 0 ? (
                'Votre panier est vide'
              ) : (
                <>
                  Total : {totalPrice.toFixed(0)}€ ({items.length} article{items.length > 1 ? 's' : ''})
                </>
              )}
            </p>
            <button 
              disabled={items.length === 0}
              className={`px-10 rounded-2xl shadow-2xl  mt-6 mx-auto block h-8 ${
                items.length === 0 
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                  : 'bg-gradient-to-r from-amber-700 to-orange-800 hover:opacity-75 cursor-pointer'
              }`}
            >
              <Link href="/payment">
                Passer au paiement
              </Link>
              
            </button>
          </span>
        </div>
      </div>
    </section>
  )
}