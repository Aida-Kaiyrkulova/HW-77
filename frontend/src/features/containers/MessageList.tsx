import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { fetchMessages } from '../messagesThunk';
import MessageItem from '../components/MessageItem';

const MessageList: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state: RootState) => state.messages.items);
  const isFetchMessagesLoading = useAppSelector((state: RootState) => state.messages.isLoading);
  const error = useAppSelector((state: RootState) => state.messages.error);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (isFetchMessagesLoading) {
    return <h3>Loading messages...</h3>;
  }

  if (error) {
    return <h3>Error loading messages: {error}</h3>;
  }

  return (
    <div>
      <h2>Guestbook Messages</h2>
      {messages.length === 0 ? (
        <h4>No messages yet</h4>
      ) : (
        <div>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              author={message.author || 'Anonymous'}
              message={message.message}
              image={message.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;