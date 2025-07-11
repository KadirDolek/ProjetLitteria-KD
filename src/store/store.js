import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
    cart: cartReducer
  }
});