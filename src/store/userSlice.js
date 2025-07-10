import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      const { email, password, name } = action.payload;
      if (!state.users.some(user => user.email === email)) {
        state.users.push({ email, password, name });
      }
    },
    login: (state, action) => {
      const user = state.users.find(u => 
        u.email === action.payload.email && 
        u.password === action.payload.password
      );
      if (user) state.currentUser = user;
    },
    logout: (state) => {
      state.currentUser = null;
    }
  }
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;