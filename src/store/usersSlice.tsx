import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {type User} from '../types/User'
interface UsersState {
  users: User[];
  nextId: number;
}

const initialState: UsersState = {
  users: [
    { id: 1, username: 'admin', password: 'admin123' },
    { id: 2, username: 'pisun228', password: 'yazagitlera777', isVip:true}
  ],
  nextId: 3,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser(state, action: PayloadAction<Omit<User, 'id'>>) {
      state.users.push({ id: state.nextId, ...action.payload });
      state.nextId += 1;
    },
  },
});

export const { registerUser } = usersSlice.actions;
export default usersSlice.reducer;
