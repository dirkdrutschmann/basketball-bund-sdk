import { HttpClient } from '../http/HttpClient';
import { LoginModel } from '../types';

export class UserService {
  constructor(private httpClient: HttpClient) {}

  async getLoginContext(): Promise<LoginModel> {
    const response = await this.httpClient.get('/user/lc');
    return response.data;
  }

  async isDBBGeschaeftsstelle(): Promise<boolean> {
    const response = await this.httpClient.get('/user/is-dbbgeschaeftsstelle');
    return response.data;
  }

  async isGeschaeftsstelle(): Promise<boolean> {
    const response = await this.httpClient.get('/user/is-geschaeftsstelle');
    return response.data;
  }

  async getGeschaeftsstelleFor(): Promise<number[]> {
    const response = await this.httpClient.get('/user/geschaeftsstellefor');
    return response.data;
  }
} 