import { HttpClient } from '../http/HttpClient';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  sessionCookie?: string;
  error?: string;
}

export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const postData = new URLSearchParams({
        username: credentials.username,
        password: credentials.password
      });

      // Für Login verwenden wir die Basis-URL ohne /rest
      const loginUrl = 'https://www.basketball-bund.net/login.do?reqCode=login';
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData.toString()
      });

      const responseText = await response.text();

      // Prüfe auf Login-Fehler in der Response
      if (responseText.includes('Die Kombination aus Benutzername und Passwort ist nicht bekannt!')) {
        return {
          success: false,
          error: 'Invalid username or password'
        };
      }

      // Extrahiere SESSION-Cookie aus den Response-Headers
      const setCookieHeader = response.headers.get('set-cookie');
      let sessionCookie: string | undefined;

      if (setCookieHeader) {
        const cookies = setCookieHeader.split(',');
        const sessionCookieEntry = cookies.find(cookie => cookie.trim().startsWith('SESSION='));
        
        if (sessionCookieEntry) {
          sessionCookie = sessionCookieEntry.trim().split(';')[0];
        }
      }

      if (!sessionCookie) {
        return {
          success: false,
          error: 'No session cookie received'
        };
      }

      // Setze den SESSION-Cookie für zukünftige Requests
      this.httpClient.setHeaders({
        'Cookie': sessionCookie
      });

      return {
        success: true,
        sessionCookie
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post('/logout.do', '');
      // Entferne SESSION-Cookie
      this.httpClient.setHeaders({
        'Cookie': ''
      });
    } catch (error) {
      // Ignoriere Fehler beim Logout
    }
  }

  isAuthenticated(): boolean {
    const headers = this.httpClient.getHeaders();
    return headers.Cookie?.includes('SESSION=') || false;
  }
} 