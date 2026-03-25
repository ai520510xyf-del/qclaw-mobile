import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  gatewayUrl: string;
  token: string;
  isConnected: boolean;
  setGatewayUrl: (url: string) => void;
  setToken: (token: string) => void;
  setConnected: (connected: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      gatewayUrl: 'http://localhost:8080',
      token: '',
      isConnected: false,
      setGatewayUrl: (url) => set({ gatewayUrl: url }),
      setToken: (token) => set({ token }),
      setConnected: (connected) => set({ isConnected: connected }),
    }),
    {
      name: 'qclaw-settings',
    }
  )
);
