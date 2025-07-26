import { RegistrationService } from './services/RegistrationService';
import { ClubService } from './services/ClubService';
import { CompetitionService } from './services/CompetitionService';
import { MatchService } from './services/MatchService';
import { TeamService } from './services/TeamService';
import { UserService } from './services/UserService';
import { WidgetService } from './services/WidgetService';
import { WamService } from './services/WamService';
import { CaptchaService } from './services/CaptchaService';
import { HttpClient } from './http/HttpClient';

export interface BasketballBundSDKConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
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
export default BasketballBundSDK; 