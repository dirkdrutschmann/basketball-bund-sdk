import { HttpClient } from '../http/HttpClient';
import { 
  SearchClubMetadata, 
  SearchClubFilter, 
  SearchClubResponseData,
  ClubModel,
  ClubMatches
} from '../types';

export class ClubService {
  constructor(private httpClient: HttpClient) {}

  async getSearchClubMetadata(): Promise<SearchClubMetadata> {
    const response = await this.httpClient.get('/club/searchMetadata');
    return response.data;
  }

  async searchClubs(filter: SearchClubFilter): Promise<SearchClubResponseData> {
    const response = await this.httpClient.post('/club/search', filter);
    return response.data;
  }

  async getClubsByFreetext(freetext?: string): Promise<ClubModel[]> {
    const response = await this.httpClient.get('/club/freetext', { freetext });
    return response.data;
  }

  async getFeedBasedClubsByFreetext(freetext?: string): Promise<ClubModel[]> {
    const response = await this.httpClient.get('/club/fee-based-clubs/freetext', { freetext });
    return response.data;
  }

  async getActualMatches(
    clubId: number, 
    justHome?: boolean, 
    rangeDays?: number
  ): Promise<ClubMatches> {
    const params: any = {};
    if (justHome !== undefined) params.justHome = justHome;
    if (rangeDays !== undefined) params.rangeDays = rangeDays;
    
    const response = await this.httpClient.get(`/club/id/${clubId}/actualmatches`, params);
    return response.data;
  }
} 