import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';


export const fetchMessages = createAsyncThunk<Message[]>(
  'messages/fetchMessages',
  async () => {
    const response = await axiosApi.get('/messages');
    return response.data || [];
  }
);

export const createMessage = createAsyncThunk<void, MessageMutation>(
  'messages/createMessage',
  async (messageMutation) => {
    const formData = new FormData();

    if (messageMutation.author) formData.append('author', messageMutation.author);
    if (messageMutation.message) formData.append('message', messageMutation.message);
    if (messageMutation.image) formData.append('image', messageMutation.image);

    await axiosApi.post('/messages', formData);
  }
);
