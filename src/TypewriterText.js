import React, { useEffect, useState } from "react";

export default function TypewriterText({ text, onDone }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplay("");
      onDone && onDone();
      return;
    }
    setDisplay(""); // Always reset at the start

    let i = 0;
    const timer = setInterval(() => {
      setDisplay(text.slice(0, i + 1)); // Always show up to i+1 characters
      i++;
      if (i === text.length) {
        clearInterval(timer);
        onDone && onDone();
      }
    }, 18);

    return () => clearInterval(timer);
  }, [text, onDone]);

  return <span>{display}</span>;
}
