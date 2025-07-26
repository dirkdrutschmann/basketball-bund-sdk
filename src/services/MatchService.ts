import { HttpClient } from '../http/HttpClient';
import { MatchModel, SearchMatchFilter, SearchMatchResponseData } from '../types';

export class MatchService {
  constructor(private httpClient: HttpClient) {}

  async getMatchInfo(matchId: number): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${matchId}/matchInfo`);
    return response.data;
  }

  async getMatchById(matchId: number): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${matchId}`);
    return response.data;
  }

  async getBoxscore(matchId: number): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${matchId}/boxscore`);
    return response.data;
  }

  async getPlayByPlayReport(matchId: number): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${matchId}/playbyplay`);
    return response.data;
  }

  async searchMatches(filter: SearchMatchFilter): Promise<SearchMatchResponseData> {
    const response = await this.httpClient.post('/match/search', filter);
    return response.data;
  }
} 