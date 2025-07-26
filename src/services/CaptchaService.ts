import { HttpClient } from '../http/HttpClient';
import { Captcha, Response } from '../types';

export class CaptchaService {
  constructor(private httpClient: HttpClient) {}

  async generate(): Promise<Response<Captcha>> {
    const response = await this.httpClient.get('/captcha/generate');
    return response;
  }
} 