import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    const newHistory = [...history];
    setHistory(newHistory);
    if (replace) {
      // Removes the previous history record, replacing it with this next mode
      newHistory.pop();
    }
    newHistory.push(mode);
    setMode(mode);
  }

  const back = () => {
    const newHistory = [...history];
    setHistory(newHistory);
    if (newHistory.length < 2) {
      // Doesn't allow to go beyond original history mode
      return;
    }
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
  }

  return {
    mode,
    transition,
    back
  }
}