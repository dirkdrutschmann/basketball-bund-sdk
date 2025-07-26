import { HttpClient } from '../http/HttpClient';
import { 
  SearchClubMetadata, 
  SearchClubResponseData,
  ClubModel,
  ClubMatches
} from '../types';

export class ClubService {
  constructor(private httpClient: HttpClient) {}

  async getSearchClubMetadata(): Promise<SearchClubMetadata> {
    const response = await this.httpClient.get('/club/searchMetadata');
    return response;
  }

  async searchClubs(params: {
    akjIdList: number[];
    eIdList: number[];
    gIdList: number[];
    plz: string;
    startAtIndex: number;
    umkreis: number;
  }): Promise<SearchClubResponseData> {
    const response = await this.httpClient.post('/club/search', params);
    return response;
  }

  async getClubsByFreetext(params: {
    freetext: string;
  }): Promise<ClubModel[]> {
    const response = await this.httpClient.get('/club/freetext', params);
    return response;
  }

  async getFeedBasedClubsByFreetext(params: {
    freetext: string;
  }): Promise<ClubModel[]> {
    const response = await this.httpClient.get('/club/fee-based-clubs/freetext', params);
    return response;
  }

  async getActualMatches(params: {
    clubId: number;
    justHome?: boolean;
    rangeDays?: number;
  }): Promise<ClubMatches> {
    const { clubId, ...queryParams } = params;
    const response = await this.httpClient.get(`/club/id/${clubId}/actualmatches`, queryParams);
    return response;
  }
} 