import { from, fetchAllSync } from '@/lib/store';
import type { Apartment, Booking, GuestArchive, Location } from '@/types';

type TableMap = {
  locations: Location;
  apartments: Apartment;
  bookings: Booking;
  guests_archive: GuestArchive;
};

type TableNames = keyof TableMap;

function typedFrom<T extends TableNames>(table: T) {
  return from<TableMap[T]>(table);
}

export const supabase = {
  from: typedFrom,
  fetchAllSync,
};
