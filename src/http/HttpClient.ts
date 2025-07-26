export interface HttpClientConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export class BasketballBundAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'BasketballBundAPIError';
  }
}

export class HttpClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
  }

  setHeaders(headers: Record<string, string>): void {
    this.config.headers = { ...this.config.headers, ...headers };
  }

  getHeaders(): Record<string, string> {
    return this.config.headers;
  }

  setBaseUrl(baseUrl: string): void {
    this.config.baseUrl = baseUrl;
  }

  async get<T = any>(path: string, params?: Record<string, any>): Promise<HttpResponse<T>> {
    return this.request<T>('GET', path, undefined, params);
  }

  async post<T = any>(path: string, data?: any, params?: Record<string, any>): Promise<HttpResponse<T>> {
    return this.request<T>('POST', path, data, params);
  }

  async put<T = any>(path: string, data?: any, params?: Record<string, any>): Promise<HttpResponse<T>> {
    return this.request<T>('PUT', path, data, params);
  }

  async delete<T = any>(path: string, params?: Record<string, any>): Promise<HttpResponse<T>> {
    return this.request<T>('DELETE', path, undefined, params);
  }

  private async request<T = any>(
    method: string,
    path: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.buildUrl(path, params);
      const options: RequestInit = {
        method,
        headers: this.config.headers,
        signal: AbortSignal.timeout(this.config.timeout)
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let responseData: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          responseData = await response.json();
        } catch (e) {
          responseData = null as T;
        }
      } else {
        responseData = (await response.text()) as T;
      }

      if (!response.ok) {
        throw new BasketballBundAPIError(
          `HTTP Error: ${response.status} ${response.statusText}`,
          response.status,
          responseData
        );
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      };
    } catch (error) {
      if (error instanceof BasketballBundAPIError) {
        throw error;
      }
      
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new BasketballBundAPIError('Request timeout');
      }
      
      throw new BasketballBundAPIError(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const baseUrl = this.config.baseUrl.endsWith('/') 
      ? this.config.baseUrl.slice(0, -1) 
      : this.config.baseUrl;
    
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    let url = `${baseUrl}${fullPath}`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return url;
  }
} 