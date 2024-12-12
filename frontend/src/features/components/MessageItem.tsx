import React from 'react';

interface MessageItemProps {
  author: string;
  message: string;
  image: string | null;
}

const MessageItem: React.FC<MessageItemProps> = ({ author, message, image }) => {
  return (
    <div style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
      <p>
        <strong>{author || 'Anonymous'}</strong>: {message}
      </p>
      {image && <img src={image} alt="Message image" style={{ maxWidth: '100%', height: 'auto' }} />}
    </div>
  );
};

export default MessageItem;