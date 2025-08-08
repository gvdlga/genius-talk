
import { StateCreator } from 'zustand';

export interface SessionState {
  userId: string | null;
  userName: string | null;
  setSession: (userId: string, userName: string) => void;
  clearSession: () => void;
}

export const createSessionSlice: StateCreator<SessionState> = (set) => ({
  userId: null,
  userName: null,
  setSession: (userId, userName) => set({ userId, userName }),
  clearSession: () => set({ userId: null, userName: null }),
});
