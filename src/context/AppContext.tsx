import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Apartment, Location, Booking, GuestArchive } from '@/types';

export type ViewName = 'dashboard' | 'schedule' | 'checkout' | 'archive';

interface DataCache {
  locations: Location[];
  apartments: Apartment[];
  bookings: Booking[];
  archive: GuestArchive[];
}

interface AppContextValue {
  view: ViewName;
  setView: (v: ViewName) => void;
  refreshKey: number;
  triggerRefresh: () => void;
  data: DataCache;
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// Load synchronously from localStorage — no network, instant display.
function loadInitialData(): DataCache {
  const { locations, apartments, bookings, guests_archive } = supabase.fetchAllSync();
  return {
    locations,
    apartments,
    bookings,
    archive: guests_archive,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewName>('schedule');
  const [refreshKey, setRefreshKey] = useState(0);
  // Synchronous initial load — never shows a spinner
  const [data, setData] = useState<DataCache>(loadInitialData);
  const loading = false;
  const error = null;

  const triggerRefresh = useCallback(() => {
    setData(loadInitialData());
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <AppContext.Provider value={{ view, setView, refreshKey, triggerRefresh, data, loading, error }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
