import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ToastProps {
  message: string;
  duration?: number;
}

export default function Toast({ message, duration = 2000 }: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-14 inset-x-0 mx-auto z-50 w-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg text-center">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,

    document.body,
  );
}
