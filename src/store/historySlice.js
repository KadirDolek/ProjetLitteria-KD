import { createSlice } from '@reduxjs/toolkit';
// Journée de débugage avec cette saloperie, ca voulait sauvegarder dans l'historique selon le User.
const loadUserHistory = (userId) => {
  if (typeof window === 'undefined') return [];
  
  try {
    const rawData = localStorage.getItem('purchaseHistory');
    if (!rawData) return [];
    
    const parsedData = JSON.parse(rawData);
    if (!parsedData || typeof parsedData !== 'object') return [];
    
    const userHistory = parsedData[userId];
    return Array.isArray(userHistory) ? userHistory : [];
  } catch (error) {
    console.error("Erreur de chargement de l'historique:", error);
    return [];
  }
};

const saveUserHistory = (userId, history) => {
  if (typeof window === 'undefined') return;

  try {
    const existingData = loadAllHistory();
    const newData = {
      ...existingData,
      [userId]: history.map(item => ({
        ...item,
        items: JSON.parse(JSON.stringify(item.items))
      }))
    };
    
    localStorage.setItem('purchaseHistory', JSON.stringify(newData));
  } catch (error) {
    console.error("Erreur de sauvegarde:", error);
  }
};

const loadAllHistory = () => {
  try {
    const rawData = localStorage.getItem('purchaseHistory');
    return rawData ? JSON.parse(rawData) : {};
  } catch {
    return {};
  }
};

const initialState = {
  userPurchases: {}
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addPurchase: {
      reducer: (state, action) => {
        const { userId, purchase } = action.payload;
        
        if (!state.userPurchases[userId]) {
          state.userPurchases[userId] = [];
        }
        
        state.userPurchases[userId].unshift(purchase);
        saveUserHistory(userId, state.userPurchases[userId]);
      },
      prepare: ({ userId, items, total, userInfo, paymentMethod }) => {
        return {
          payload: {
            userId,
            purchase: {
              id: Date.now(),
              date: new Date().toISOString(),
              items: JSON.parse(JSON.stringify(items)), 
              total,
              userInfo: { ...userInfo }, 
              paymentMethod,
              status: 'completed'
            }
          }
        };
      }
    },
    
    loadUserPurchases: (state, action) => {
      const userId = action.payload;
      state.userPurchases[userId] = loadUserHistory(userId);
    },
    
    clearUserHistory: (state, action) => {
      const userId = action.payload;
      state.userPurchases[userId] = [];
      saveUserHistory(userId, []);
    }
  }
});

export const { addPurchase, loadUserPurchases, clearUserHistory } = historySlice.actions;
export default historySlice.reducer;