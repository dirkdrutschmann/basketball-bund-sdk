import { HttpClient } from '../http/HttpClient';
import { TeamMatches } from '../types';

export class TeamService {
  constructor(private httpClient: HttpClient) {}

  async getMatches(teamId: number, justHome?: boolean): Promise<TeamMatches> {
    const params: any = {};
    if (justHome !== undefined) params.justHome = justHome;
    
    const response = await this.httpClient.get(`/team/id/${teamId}/matches`, params);
    return response.data;
  }
} 