// store.js
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import cartReducer from './cartSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    history: historyReducer
  }
});