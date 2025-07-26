import { HttpClient } from '../http/HttpClient';
import { LoginModel, Response } from '../types';

export class UserService {
  constructor(private httpClient: HttpClient) {}

  async getLoginContext(): Promise<Response<LoginModel>> {
    const response = await this.httpClient.get('/user/lc');
    return response;
  }

  async isDBBGeschaeftsstelle(): Promise<Response<boolean>> {
    const response = await this.httpClient.get('/user/is-dbbgeschaeftsstelle');
    return response;
  }

  async isGeschaeftsstelle(): Promise<Response<boolean>> {
    const response = await this.httpClient.get('/user/is-geschaeftsstelle');
    return response;
  }

  async getGeschaeftsstelleFor(): Promise<Response<number[]>> {
    const response = await this.httpClient.get('/user/geschaeftsstellefor');
    return response;
  }
} 