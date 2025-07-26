import { HttpClient } from '../http/HttpClient';
import { Wam, LigaList, WamResponseData } from '../types';

export class WamService {
  constructor(private httpClient: HttpClient) {}

  async getLigaList(wam: Wam, startAtIndex?: number): Promise<LigaList> {
    const params: any = {};
    if (startAtIndex !== undefined) params.startAtIndex = startAtIndex;
    
    const response = await this.httpClient.post('/wam/liga/list', wam, params);
    return response.data;
  }

  async getWamDataList(wam: Wam): Promise<WamResponseData> {
    const response = await this.httpClient.post('/wam/data', wam);
    return response.data;
  }
} 