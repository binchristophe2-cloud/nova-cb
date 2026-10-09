import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, AlertCircle, X } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationToastProps {
  notification: AppNotification | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onDismiss,
}) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 pointer-events-none max-w-md w-[calc(100%-2rem)] sm:w-96">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto p-4 sm:p-5 rounded-2xl shadow-2xl border bg-[#0e1935] text-white flex items-start gap-3.5 backdrop-blur-xl relative overflow-hidden"
            style={{
              borderColor:
                notification.type === 'success'
                  ? '#059669'
                  : notification.type === 'warning'
                  ? '#d97706'
                  : '#0284c7',
            }}
          >
            {/* Left accent pill */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                notification.type === 'success'
                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                  : notification.type === 'warning'
                  ? 'bg-amber-950/70 text-amber-400 border border-amber-500/30'
                  : 'bg-sky-950/70 text-sky-400 border border-sky-500/30'
              }`}
            >
              {notification.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {notification.type === 'warning' && <AlertCircle className="w-5 h-5" />}
              {notification.type === 'info' && <Sparkles className="w-5 h-5" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-6">
              <h4 className="text-sm font-bold text-white leading-snug">
                {notification.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {notification.message}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              onClick={onDismiss}
              aria-label="Fermer la notification"
              className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Animated auto-dismiss line at the bottom */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${
                notification.type === 'success'
                  ? 'bg-emerald-500'
                  : notification.type === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-sky-500'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
