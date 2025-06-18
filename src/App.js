import React, { useEffect, useState } from 'react';
import './App.css';
import InputBox from './InputBox_app.js';
import TypewriterText from './TypewriterText';

function App() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Show the input after a short welcome delay
    if (messages.length === 0) {
      setTyping(false);
    }
  }, [messages.length]);

  const handleQuery = async (query) => {
    setTyping(true);
    setMessages((prev) => [...prev, { question: query, answer: "" }]);

    try {
      const res = await fetch('http://localhost:8080/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });
      const data = await res.json();
      const answer = data.answer || "I couldn't come up with something witty. Try again.";

      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, answer } : m))
      );
    } catch {
      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, answer: "Error fetching answer." } : m))
      );
    }
  };

  return (
    <div className="terminal">
      {messages.length === 0 && <h1 className="fade">Welcome Twit!</h1>}

      {messages.map((m, i) => (
        <div key={i} className="block fade">
          <div className="question">&gt; {m.question}</div>
          <div className="answer">
            {m.answer
              ? (
                i === messages.length - 1 && typing
                  ? (
                      <TypewriterText
                        text={m.answer}
                        onDone={() => setTyping(false)}
                      />
                    )
                  : m.answer
              )
              : <span style={{ opacity: 0.6 }}>Thinking...</span>
            }
          </div>
        </div>
      ))}

      {/* Show input only if not typewriting */}
      {!typing && <InputBox onSubmit={handleQuery} />}
    </div>
  );
}

export default App;
