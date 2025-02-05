import { BASE_URL } from "@/main";

  
let accessToken: string | null = null;
  
export const authService = {
    getAccessToken: () => accessToken,
    
    setAccessToken: (token: string) => {
      accessToken = token;
    },
  
    clearTokens: () => {
      accessToken = null;
    },
  
    async refreshToken(): Promise<string> {
      try {
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include', // Important for cookies
        });
        
        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }
        
        const data = await response.json();
        this.setAccessToken(data.access_token);
        return data.access_token;
      } catch (error) {
        this.clearTokens();
        throw error;
      }
    }
};