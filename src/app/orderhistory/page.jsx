'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { Calendar, Package, CreditCard, MapPin, User } from 'lucide-react'

export default function PurchaseHistory() {
  const { purchases } = useSelector(state => state.history)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPaymentMethodName = (method) => {
    const methods = {
      'visa': 'Visa',
      'mastercard': 'Mastercard',
      'paypal': 'PayPal'
    }
    return methods[method] || method
  }

  if (purchases.length === 0) {
    return (
      <section className='w-auto mt-32 mb-18 flex flex-wrap flex-col'>
        <h1 className='text-2xl text-black flex justify-center mb-12 mx-auto'>
          Historique d'achat
        </h1>
        <div className='flex justify-center items-center h-64'>
          <div className='text-center'>
            <Package className='mx-auto h-16 w-16 text-gray-400 mb-4' />
            <p className='text-gray-600 text-lg'>Aucun achat effectué</p>
            <p className='text-gray-500 text-sm mt-2'>Vos achats apparaîtront ici</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='w-auto mt-32 mb-18 flex flex-wrap flex-col'>
      <h1 className='text-2xl text-black flex justify-center mb-12 mx-auto'>
        Historique d'achat
      </h1>
      
      <div className='max-w-6xl mx-auto px-4'>
        <div className='space-y-6'>
          {purchases.map((purchase) => (
            <div key={purchase.id} className='bg-white rounded-2xl shadow-lg border-2 overflow-hidden'>
              {/* En-tête de la commande */}
              <div className='bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b'>
                <div className='flex justify-between items-start'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex items-center text-gray-600'>
                      <Calendar className='h-5 w-5 mr-2' />
                      <span className='text-sm font-medium'>
                        {formatDate(purchase.date)}
                      </span>
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <CreditCard className='h-5 w-5 mr-2' />
                      <span className='text-sm font-medium'>
                        {getPaymentMethodName(purchase.paymentMethod)}
                      </span>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-2xl font-bold text-amber-700'>
                      {purchase.total.toFixed(2)} €
                    </p>
                    <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
                      {purchase.status === 'completed' ? 'Livré' : 'En cours'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informations de livraison */}
              <div className='px-6 py-4 bg-gray-50 border-b'>
                <div className='flex items-start space-x-6'>
                  <div className='flex items-center text-gray-600'>
                    <User className='h-5 w-5 mr-2' />
                    <span className='text-sm'>
                      {purchase.userInfo.firstName} {purchase.userInfo.lastName}
                    </span>
                  </div>
                  <div className='flex items-center text-gray-600'>
                    <MapPin className='h-5 w-5 mr-2' />
                    <span className='text-sm'>
                      {purchase.userInfo.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Articles achetés */}
              <div className='px-6 py-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                  Articles commandés ({purchase.items.length})
                </h3>
                <div className='space-y-3'>
                  {purchase.items.map((item) => (
                    <div key={item.id} className='flex items-center space-x-4 p-3 bg-gray-50 rounded-lg'>
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className='h-16 w-12 object-cover rounded shadow-sm'
                      />
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900'>{item.title}</h4>
                        <p className='text-sm text-gray-600'>
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold text-gray-900'>
                          {(item.price * item.quantity).toFixed(2)} €
                        </p>
                        <p className='text-sm text-gray-600'>
                          {item.price.toFixed(2)} € / unité
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Résumé de la commande */}
              <div className='px-6 py-4 bg-gray-50 border-t'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>
                    Commande #{purchase.id}
                  </span>
                  <div className='text-right'>
                    <p className='text-sm text-gray-600'>
                      Total: {purchase.total.toFixed(2)} €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}