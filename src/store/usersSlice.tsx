import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, apiUrl } from '../types/User';

interface UsersState {
	data: User[];
	loading: boolean;
	error: string | null;
}
// Users initial state
const initialState: UsersState = {
	data: [],
	loading: false,
	error: null,
};
// Async users fetch
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
	const response = await axios.get<User[]>(apiUrl);
	return response.data;
});
// Create users slice
const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	// Async
	extraReducers: builder => {
		builder
			// Loading has started
			.addCase(fetchUsers.pending, state => {
				state.loading = true;
				state.error = null;
			})
			// Upload successful
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			// Loading error
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error';
			});
	},
});
// Reducer export
export default usersSlice.reducer;
