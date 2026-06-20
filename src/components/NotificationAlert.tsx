import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type NotificationAlertProps = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  onClose?: () => void;
};

export default function NotificationAlert({ type, message, duration = 4000, onClose }: NotificationAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'from-emerald-500 to-teal-500',
    error: 'from-rose-500 to-pink-500',
    info: 'from-indigo-500 to-purple-500',
    warning: 'from-amber-500 to-orange-500',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`fixed top-4 right-4 z-50 rounded-2xl bg-gradient-to-r ${colors[type]} px-6 py-3 text-white shadow-lg flex items-center gap-3`}
        >
          <span className="text-xl font-bold">{icons[type]}</span>
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
