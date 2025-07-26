import { HttpClient } from '../http/HttpClient';
import { Captcha } from '../types';

export class CaptchaService {
  constructor(private httpClient: HttpClient) {}

  async generate(): Promise<Captcha> {
    const response = await this.httpClient.get('/captcha/generate');
    return response.data;
  }
} 