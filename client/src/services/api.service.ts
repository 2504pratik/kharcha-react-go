import { authService } from './auth.service';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  const { skipAuth = false, ...fetchOptions } = options;
  
  const makeRequest = async (token?: string) => {
    const headers = new Headers(fetchOptions.headers);
    
    if (!skipAuth && token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });
  };

  // First try with existing token
  let token: string | undefined = skipAuth ? undefined : authService.getAccessToken() ?? undefined;
  let response = await makeRequest(token);

  // If unauthorized, try to refresh token and retry
  if (response.status === 401 && !skipAuth) {
    try {
      token = await authService.refreshToken();
      if (!token) {
        throw new Error('Failed to refresh token');
      }
      response = await makeRequest(token);
    } catch (error) {
      authService.clearTokens();
      throw new Error('Authentication failed: Please log in again');
    }
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText || response.status}`);
  }

  return response;
}