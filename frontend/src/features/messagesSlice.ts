import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages } from './messagesThunk';

interface Message {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

interface MessagesState {
  items: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  items: [],
  isLoading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const messagesReducer = messagesSlice.reducer;