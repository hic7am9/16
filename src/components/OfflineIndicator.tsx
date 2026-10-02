import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner && isOnline) return null;

  return (
    <div
      className={`fixed bottom-24 sm:bottom-6 inset-x-4 lg:inset-x-auto lg:end-6 z-40 transition-all duration-300 ${
        showBanner ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg border max-w-sm lg:w-80 ${
          isOnline
            ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'
        }`}
      >
        {isOnline ? (
          <Wifi size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
        ) : (
          <WifiOff size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
        )}
        <span
          className={`text-sm font-semibold ${
            isOnline
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-amber-700 dark:text-amber-300'
          }`}
        >
          {isOnline ? 'أنت متصل بالإنترنت' : 'وضع عدم الاتصال — البيانات محفوظة محلياً'}
        </span>
      </div>
    </div>
  );
}
