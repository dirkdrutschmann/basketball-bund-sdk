import { HttpClient } from '../http/HttpClient';
import { MatchModel, SearchMatchResponseData } from '../types';

export class MatchService {
  constructor(private httpClient: HttpClient) {}

  async getMatchInfo(params: {
    matchId: number;
  }): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${params.matchId}/matchInfo`);
    return response;
  }

  async getMatchById(params: {
    matchId: number;
  }): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${params.matchId}`);
    return response;
  }

  async getBoxscore(params: {
    matchId: number;
  }): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${params.matchId}/boxscore`);
    return response;
  }

  async getPlayByPlayReport(params: {
    matchId: number;
  }): Promise<MatchModel> {
    const response = await this.httpClient.get(`/match/id/${params.matchId}/playbyplay`);
    return response;
  }

  async searchMatches(params: {
    akGruppeIdList: number[];
    fromDate: Date | string;
    gIdList: number[];
    spielfeldPlz: string;
    spielfeldUmkreis: number;
    startAtIndex: number;
    toDate: Date | string;
  }): Promise<SearchMatchResponseData> {
    const response = await this.httpClient.post('/match/search', params);
    return response;
  }
} 