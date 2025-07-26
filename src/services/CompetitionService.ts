import { HttpClient } from '../http/HttpClient';
import { CompetitionModel, CompetitionDesc } from '../types';

export class CompetitionService {
  constructor(private httpClient: HttpClient) {}

  async getSpielplan(competitionId: number): Promise<CompetitionModel> {
    const response = await this.httpClient.get(`/competition/spielplan/id/${competitionId}`);
    return response.data;
  }

  async getLigaList(competitionIds: number[]): Promise<CompetitionDesc[]> {
    const response = await this.httpClient.post('/competition/list', competitionIds);
    return response.data;
  }

  async getByMatchDay(competitionId: number, matchDay?: number): Promise<CompetitionModel> {
    const endpoint = matchDay 
      ? `/competition/id/${competitionId}/matchday/${matchDay}`
      : `/competition/id/${competitionId}/matchday`;
    
    const response = await this.httpClient.get(endpoint);
    return response.data;
  }

  async getActual(competitionId: number, anzahlTage?: number): Promise<CompetitionModel> {
    const params: any = {};
    if (anzahlTage !== undefined) params.anzahlTage = anzahlTage;
    
    const response = await this.httpClient.get(`/competition/actual/id/${competitionId}`, params);
    return response.data;
  }

  async getActualByCompNo(competitionNumber: number, rangeDays?: number): Promise<CompetitionModel> {
    const params: any = {};
    if (rangeDays !== undefined) params.rangeDays = rangeDays;
    
    const response = await this.httpClient.get(`/competition/number/${competitionNumber}/actual`, params);
    return response.data;
  }

  async getTabelle(competitionId: number): Promise<CompetitionModel> {
    const response = await this.httpClient.get(`/competition/table/id/${competitionId}`);
    return response.data;
  }

  async getByMatchDate(competitionId: number, matchDate: string): Promise<CompetitionModel> {
    const response = await this.httpClient.get(`/competition/id/${competitionId}/matchdate/${matchDate}`);
    return response.data;
  }

  async getCrosstable(competitionId: number): Promise<CompetitionModel> {
    const response = await this.httpClient.get(`/competition/crosstable/id/${competitionId}`);
    return response.data;
  }

  async getTeamStatistic(competitionId: number, perMatch?: boolean): Promise<CompetitionModel> {
    const params: any = {};
    if (perMatch !== undefined) params.perMatch = perMatch;
    
    const response = await this.httpClient.get(`/competition/teamstatistic/id/${competitionId}`, params);
    return response.data;
  }
} 