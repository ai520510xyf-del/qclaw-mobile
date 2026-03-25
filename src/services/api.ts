import axios, { AxiosInstance } from 'axios';
import { useSettingsStore } from '../stores/settingsStore';

const createApiClient = (): AxiosInstance => {
  const { gatewayUrl, token } = useSettingsStore.getState();
  
  return axios.create({
    baseURL: gatewayUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

export const api = createApiClient();

export const refreshApiClient = () => {
  // Re-create the API client with updated settings
  return createApiClient();
};
