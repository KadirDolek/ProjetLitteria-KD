import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await fetch('https://example-data.draftbit.com/books');
  const data = await res.json();

  return data.map((book, index) => {
    const basePrice = parseFloat(book.price ?? (Math.random() * 20 + 5).toFixed(2));

    // 1 livre sur 5 a promo 
    const isPromo = index % 5 === 0;

    // Promo entre 10% et 30%
    const discount = isPromo ? Math.floor(Math.random() * 21) + 10 : 0;

    const discountedPrice = isPromo
      ? (basePrice * (1 - discount / 100)).toFixed(2)
      : basePrice.toFixed(2);

    return {
      ...book,
      price: basePrice.toFixed(2),
      discount,
      discountedPrice,
    };
  });
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;