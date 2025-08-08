
import { create } from 'zustand';
import { createSessionSlice, SessionState } from './sessionSlice';

export const useStore = create<SessionState>()((...a) => ({
  ...createSessionSlice(...a),
}));
