import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
   ajouterPanier: (state, action) => {
  const product = action.payload;
  const existingItem = state.items.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const randomPrice = Math.floor(Math.random() * 20) + 1;
    state.items.push({
      ...product,
      price: product.price ?? randomPrice,
      quantity: 1
    });
  }

  state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
},
    
    retirerPanier: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    modifierQuantite: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    viderPanier: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { ajouterPanier, retirerPanier, modifierQuantite, viderPanier } = cartSlice.actions;
export default cartSlice.reducer;