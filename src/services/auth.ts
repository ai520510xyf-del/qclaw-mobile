import { Preferences } from '@capacitor/preferences';

const GATEWAY_URL_KEY = 'gateway_url';
const AUTH_TOKEN_KEY = 'auth_token';

export interface AuthConfig {
  gatewayUrl: string;
  token: string;
}

export async function saveAuth(config: AuthConfig): Promise<void> {
  await Preferences.set({ key: GATEWAY_URL_KEY, value: config.gatewayUrl });
  await Preferences.set({ key: AUTH_TOKEN_KEY, value: config.token });
}

export async function getAuth(): Promise<AuthConfig | null> {
  const { value: gatewayUrl } = await Preferences.get({ key: GATEWAY_URL_KEY });
  const { value: token } = await Preferences.get({ key: AUTH_TOKEN_KEY });
  
  if (gatewayUrl && token) {
    return { gatewayUrl, token };
  }
  return null;
}

export async function clearAuth(): Promise<void> {
  await Preferences.remove({ key: GATEWAY_URL_KEY });
  await Preferences.remove({ key: AUTH_TOKEN_KEY });
}

export function buildApiHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}
