import { createSlice } from '@reduxjs/toolkit';
import { createMessage, fetchMessages } from './messagesThunk';

interface Message {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

interface MessagesState {
  items: Message[];
  isLoading: boolean;
}

const initialState: MessagesState = {
  items: [],
  isLoading: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state,{payload: messages}) => {
        state.isLoading = false;
        state.items = messages;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createMessage.pending, (state) => {
      state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const messagesReducer = messagesSlice.reducer;