import { RegistrationService } from './services/RegistrationService';
import { ClubService } from './services/ClubService';
import { CompetitionService } from './services/CompetitionService';
import { MatchService } from './services/MatchService';
import { TeamService } from './services/TeamService';
import { UserService } from './services/UserService';
import { WidgetService } from './services/WidgetService';
import { WamService } from './services/WamService';
import { CaptchaService } from './services/CaptchaService';
import { AuthenticationService } from './auth/AuthenticationService';
import { HttpClient } from './http/HttpClient';

export interface BasketballBundSDKConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
  username?: string;
  password?: string;
}

export class BasketballBundSDK {
  private httpClient: HttpClient;
  
  public readonly registration: RegistrationService;
  public readonly club: ClubService;
  public readonly competition: CompetitionService;
  public readonly match: MatchService;
  public readonly team: TeamService;
  public readonly user: UserService;
  public readonly widget: WidgetService;
  public readonly wam: WamService;
  public readonly captcha: CaptchaService;
  public readonly auth: AuthenticationService;

  constructor(config: BasketballBundSDKConfig = {}) {
    const defaultConfig = {
      baseUrl: 'https://www.basketball-bund.net/rest',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const finalConfig = { ...defaultConfig, ...config };
    this.httpClient = new HttpClient(finalConfig);

    this.registration = new RegistrationService(this.httpClient);
    this.club = new ClubService(this.httpClient);
    this.competition = new CompetitionService(this.httpClient);
    this.match = new MatchService(this.httpClient);
    this.team = new TeamService(this.httpClient);
    this.user = new UserService(this.httpClient);
    this.widget = new WidgetService(this.httpClient);
    this.wam = new WamService(this.httpClient);
    this.captcha = new CaptchaService(this.httpClient);
    this.auth = new AuthenticationService(this.httpClient);

    // Automatische Authentifizierung wenn Credentials bereitgestellt werden
    if (config.username && config.password) {
      this.authenticate(config.username, config.password);
    }
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      const result = await this.auth.login({ username, password });
      if (!result.success) {
        throw new Error(result.error || 'Authentication failed');
      }
      return true;
    } catch (error) {
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    return this.auth.isAuthenticated();
  }

  setHeaders(headers: Record<string, string>): void {
    this.httpClient.setHeaders(headers);
  }

  setBaseUrl(baseUrl: string): void {
    this.httpClient.setBaseUrl(baseUrl);
  }
}

export * from './types';
export * from './services';
export * from './auth/AuthenticationService';
export default BasketballBundSDK; 