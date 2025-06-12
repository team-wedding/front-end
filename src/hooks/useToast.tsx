import { useState, useCallback } from 'react';

export default function useToast() {
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(2000);

  const showToast = useCallback((msg: string, d: number = 2000) => {
    setMessage(msg);
    setDuration(d);
    setTimeout(() => setMessage(''), d);
  }, []);

  return { message, duration, showToast };
}
