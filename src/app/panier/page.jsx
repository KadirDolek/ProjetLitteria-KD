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
    <section className='h-auto w-full mt-36 px-4'>
      <div className='min-h-[620px] w-full max-w-[850px] shadow-2xl mx-auto rounded-3xl p-4 sm:p-6 mb-12'>
        <h2 className='text-black text-2xl sm:text-3xl font-bold text-center mb-6'>Mon Panier</h2>
        
        <div className='bg-transparent min-h-[400px] w-full mx-auto shadow-2xl rounded-3xl p-2 sm:p-4'>
          {items.length === 0 ? (
            <div className='flex items-center justify-center h-[300px]'>
              <p className='text-black text-lg sm:text-xl text-center'>Votre panier est vide</p>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <div key={item.id} className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200 mb-4 gap-4'>
                  <div className='flex items-center gap-4 w-full sm:w-auto'>
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className='w-16 h-20 object-cover rounded-lg flex-shrink-0'
                    />
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-black font-bold text-base sm:text-lg truncate'>{item.title}</h3>
                      <p className='text-gray-600 text-sm sm:text-base'>{item.rating} ⭐</p>
                      {item.price && <p className='text-black font-bold text-sm sm:text-base'>{item.price}€</p>}
                    </div>
                  </div>
                  
                  <div className='flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto'>
                    <div className='flex items-center gap-2'>
                      <button 
                        onClick={() => handleModifierQuantite(item.id, item.quantity - 1)}
                        className='bg-gradient-to-r from-gray-600 to-gray-700 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer text-white min-w-[30px] h-8 flex items-center justify-center'
                      >
                        -
                      </button>
                      <span className='text-black font-bold min-w-[30px] text-center'>{item.quantity}</span>
                      <button 
                        onClick={() => handleModifierQuantite(item.id, item.quantity + 1)}
                        className='bg-gradient-to-r from-gray-600 to-gray-700 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer text-white min-w-[30px] h-8 flex items-center justify-center'
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleRetirerProduit(item.id)}
                      className="bg-gradient-to-r from-amber-700 to-orange-800 hover:opacity-75 text-white px-3 sm:px-4 py-2 rounded-3xl cursor-pointer transition-all duration-300 text-sm sm:text-base whitespace-nowrap">
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
              
              <div className='flex justify-center sm:justify-end mt-4'>
                <button 
                  onClick={handleViderPanier}
                  className='bg-gradient-to-r from-amber-700 to-orange-800 hover:opacity-75 text-white px-4 sm:px-6 h-8 rounded-3xl cursor-pointer text-sm sm:text-base'
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className='mt-6 sm:mt-10'>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'> 
            <p className='text-black text-lg sm:text-2xl text-center'>Code de réduction:</p>
            <div className='flex gap-2 w-full sm:w-auto'>
              <input 
                className='bg-white border border-black px-2 py-1 flex-1 sm:flex-initial text-sm sm:text-base' 
                type="text" 
                placeholder='Code de réduction' 
              />
              <button className='cursor-pointer bg-gradient-to-r from-amber-700 to-orange-800 px-4 sm:px-6 py-1 rounded-2xl shadow-2xl hover:opacity-75 text-white text-sm sm:text-base whitespace-nowrap'>
                Valider
              </button>
            </div>
          </div>
        </div>
        
        <div className='mt-6'>
          <p className='text-black font-bold text-lg sm:text-2xl text-center'>
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
            className={`px-6 sm:px-10 rounded-2xl shadow-2xl mt-6 mx-auto block h-10 sm:h-12 text-sm sm:text-base ${
              items.length === 0 
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200'
                : 'bg-gradient-to-r from-amber-700 to-orange-800 hover:opacity-75 cursor-pointer text-white'
            }`}
          >
            <Link href="/payment" className='h-full flex items-center justify-center'>
              Passer au paiement
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}