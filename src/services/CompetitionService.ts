import { HttpClient } from '../http/HttpClient';
import { CompetitionModel, CompetitionDesc, Response } from '../types';

export class CompetitionService {
  constructor(private httpClient: HttpClient) {}

  async getSpielplan(params: {
    competitionId: number;
  }): Promise<Response<CompetitionModel>> {
    const response = await this.httpClient.get(`/competition/spielplan/id/${params.competitionId}`);
    return response;
  }

  async getLigaList(params: {
    competitionIds: number[];
  }): Promise<Response<CompetitionDesc[]>> {
    const response = await this.httpClient.post('/competition/list', params.competitionIds);
    return response;
  }

  async getByMatchDay(params: {
    competitionId: number;
    matchDay?: number;
  }): Promise<Response<CompetitionModel>> {
    const endpoint = params.matchDay 
      ? `/competition/id/${params.competitionId}/matchday/${params.matchDay}`
      : `/competition/id/${params.competitionId}/matchday`;
    
    const response = await this.httpClient.get(endpoint);
    return response;
  }

  async getActual(params: {
    competitionId: number;
    anzahlTage?: number;
  }): Promise<Response<CompetitionModel>> {
    const queryParams: any = {};
    if (params.anzahlTage !== undefined) queryParams.anzahlTage = params.anzahlTage;
    
    const response = await this.httpClient.get(`/competition/actual/id/${params.competitionId}`, queryParams);
    return response;
  }

  async getActualByCompNo(params: {
    competitionNumber: number;
    rangeDays?: number;
  }): Promise<Response<CompetitionModel>> {
    const queryParams: any = {};
    if (params.rangeDays !== undefined) queryParams.rangeDays = params.rangeDays;
    
    const response = await this.httpClient.get(`/competition/number/${params.competitionNumber}/actual`, queryParams);
    return response;
  }

  async getTabelle(params: {
    competitionId: number;
  }): Promise<Response<CompetitionModel>> {
    const response = await this.httpClient.get(`/competition/table/id/${params.competitionId}`);
    return response;
  }

  async getByMatchDate(params: {
    competitionId: number;
    matchDate: string;
  }): Promise<Response<CompetitionModel>> {
    const response = await this.httpClient.get(`/competition/id/${params.competitionId}/matchdate/${params.matchDate}`);
    return response;
  }

  async getCrosstable(params: {
    competitionId: number;
  }): Promise<Response<CompetitionModel>> {
    const response = await this.httpClient.get(`/competition/crosstable/id/${params.competitionId}`);
    return response;
  }

  async getTeamStatistic(params: {
    competitionId: number;
    perMatch?: boolean;
  }): Promise<Response<CompetitionModel>> {
    const queryParams: any = {};
    if (params.perMatch !== undefined) queryParams.perMatch = params.perMatch;
    
    const response = await this.httpClient.get(`/competition/teamstatistic/id/${params.competitionId}`, queryParams);
    return response;
  }
} 