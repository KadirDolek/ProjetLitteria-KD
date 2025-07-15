import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';

import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer
  }
});