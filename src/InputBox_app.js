// src/InputBox.js
import React, { useState } from 'react';

function InputBox({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-box fade">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask me anything..."
        autoFocus
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default InputBox;
