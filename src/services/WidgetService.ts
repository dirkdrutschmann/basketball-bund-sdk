import { HttpClient } from '../http/HttpClient';

export class WidgetService {
  constructor(private httpClient: HttpClient) {}

  async getWidgetJS(): Promise<string> {
    const response = await this.httpClient.get('/widget/widgetjs');
    return response.data;
  }
} 