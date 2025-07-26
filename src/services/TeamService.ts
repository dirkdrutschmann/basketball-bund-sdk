import { HttpClient } from '../http/HttpClient';
import { TeamMatches, Response } from '../types';

export class TeamService {
  constructor(private httpClient: HttpClient) {}

  async getMatches(params: {
    teamId: number;
    justHome?: boolean;
  }): Promise<Response<TeamMatches>> {
    const queryParams: any = {};
    if (params.justHome !== undefined) queryParams.justHome = params.justHome;
    
    const response = await this.httpClient.get(`/team/id/${params.teamId}/matches`, queryParams);
    return response;
  }
} 