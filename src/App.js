import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.on('update', ({ documentId, content }) => {
      setContent(content);
    });
  }, []);

  const handleEdit = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('edit', { documentId: 'example', content: newContent });
  };

  return (
    <div>
      <textarea value={content} onChange={handleEdit} />
    </div>
  );
}

export default App;
