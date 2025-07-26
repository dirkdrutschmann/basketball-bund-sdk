import { HttpClient } from '../http/HttpClient';
import { LigaList, WamResponseData } from '../types';

export class WamService {
  constructor(private httpClient: HttpClient) {}

  async getLigaList(params: {
    akgGeschlechtIds: string[];
    altersklasseIds: number[];
    gebietIds: number[];
    ligatypIds: number[];
    sortBy: number;
    spielklasseIds: number[];
    token: string;
    verbandIds: number[];
    startAtIndex?: number;
  }): Promise<LigaList> {
    const { startAtIndex, ...wamParams } = params;
    const requestParams: any = {};
    if (startAtIndex !== undefined) requestParams.startAtIndex = startAtIndex;
    
    const response = await this.httpClient.post('/wam/liga/list', wamParams, requestParams);
    return response;
  }

  async getWamDataList(params: {
    akgGeschlechtIds: string[];
    altersklasseIds: number[];
    gebietIds: number[];
    ligatypIds: number[];
    sortBy: number;
    spielklasseIds: number[];
    token: string;
    verbandIds: number[];
  }): Promise<WamResponseData> {
    const response = await this.httpClient.post('/wam/data', params);
    return response;
  }
} 