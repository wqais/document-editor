import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://document-backend.vercel.app/'); // Replace with your backend URL

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.on('update', ({ documentId, content }) => {
      console.log('Received update event:', { documentId, content });
      setContent(content);
    });
  }, []);

  const handleEdit = (e) => {
    const newContent = e.target.value;
    console.log('Sending edit event:', newContent);
    setContent(newContent);
    socket.emit('edit', { documentId: 'example', content: newContent });
  };

  return (
    <div>
      <h1>Collaborative Document Editor</h1>
      <textarea value={content} onChange={handleEdit} />
    </div>
  );
}

export default App;
