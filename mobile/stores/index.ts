import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

interface SessionState {
  session: Session | null;
  setSession: (s: SessionState['session']) => void;
}


export const useAuthStore = create<SessionState>((set) => {
  return {
    session: null,
    setSession: (s) => set({ session: s })
  }
});

export const useAuth = () => useAuthStore(useShallow((state) => ({
  session: state.session,
  setSession: state.setSession
})))

