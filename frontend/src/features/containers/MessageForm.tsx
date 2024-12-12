import { useAppDispatch } from '../../app/hooks';
import { createMessage } from '../messagesThunk';
import axiosApi from '../../axiosApi';
import React, { useState } from 'react';

const MessageForm: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) {
      alert('Message is required');
      return;
    }

    const formData = new FormData();
    formData.append('author', author);
    formData.append('message', message);
    if (image) formData.append('image', image);

    try {
      const response = await axiosApi.post('/messages/create', formData);
      dispatch(createMessage(response.data));
      setAuthor('');
      setMessage('');
      setImage(null);
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div>
      <h2>Post a Message</h2>
      <form onSubmit={handleMessageSubmit}>
        <div>
          <label htmlFor="author">Name (Optional):</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image (Optional):</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit">Submit Message</button>
      </form>
    </div>
  );
};

export default MessageForm;
