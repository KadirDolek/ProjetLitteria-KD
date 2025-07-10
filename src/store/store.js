import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer
  }
});