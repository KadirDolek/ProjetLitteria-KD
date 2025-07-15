
import { createSlice } from '@reduxjs/toolkit';

// Gros délire de sauvegarde, le initial state de base devient la sauvegarde effectué du coup
const loadHistory = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('purchaseHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const initialState = {
  purchases: loadHistory()
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addPurchase: (state, action) => {
      const purchase = {
        id: Date.now(), 
        date: new Date().toISOString(),
        items: action.payload.items,
        total: action.payload.total,
        userInfo: action.payload.userInfo,
        paymentMethod: action.payload.paymentMethod,
        status: 'completed'
      };
      
      state.purchases.unshift(purchase);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('purchaseHistory', JSON.stringify(state.purchases));
      }
    },
    
    clearHistory: (state) => {
      state.purchases = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('purchaseHistory');
      }
    }
  }
});

export const { addPurchase, clearHistory } = historySlice.actions;
export default historySlice.reducer;