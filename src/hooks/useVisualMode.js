import react, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (mode) => {
    history.push(mode);
    setMode(mode);
  }

  const back = () => {
    history.pop()
    setMode(history[history.length - 1]);
  };

  return {
    mode,
    transition,
    back
  };
}