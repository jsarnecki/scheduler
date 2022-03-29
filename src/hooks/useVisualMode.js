import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {
    const newHistory = [...history];
    setHistory(newHistory);
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(mode);
    setMode(mode);
  }

  const back = () => {
    const newHistory = [...history];
    setHistory(newHistory);
    if (newHistory.length < 2) {
      return;
    }
    newHistory.pop()
    setMode(newHistory[newHistory.length - 1]);
  }

  return {
    mode,
    transition,
    back, 
    history
  }
}