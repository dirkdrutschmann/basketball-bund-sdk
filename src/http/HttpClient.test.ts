import { HttpClient, BasketballBundAPIError } from './HttpClient';

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient({
      baseUrl: 'https://api.example.com',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  describe('buildUrl', () => {
    test('should build correct URL without params', () => {
      // @ts-ignore - accessing private method for testing
      const url = httpClient.buildUrl('/test');
      expect(url).toBe('https://api.example.com/test');
    });

    test('should build correct URL with params', () => {
      // @ts-ignore - accessing private method for testing
      const url = httpClient.buildUrl('/test', { param1: 'value1', param2: 'value2' });
      expect(url).toBe('https://api.example.com/test?param1=value1&param2=value2');
    });

    test('should handle base URL with trailing slash', () => {
      const clientWithTrailingSlash = new HttpClient({
        baseUrl: 'https://api.example.com/',
        timeout: 5000,
        headers: {}
      });
      
      // @ts-ignore - accessing private method for testing
      const url = clientWithTrailingSlash.buildUrl('/test');
      expect(url).toBe('https://api.example.com/test');
    });
  });

  describe('setHeaders', () => {
    test('should update headers without throwing', () => {
      expect(() => {
        httpClient.setHeaders({ 'Authorization': 'Bearer token' });
      }).not.toThrow();
    });
  });

  describe('setBaseUrl', () => {
    test('should update base URL without throwing', () => {
      expect(() => {
        httpClient.setBaseUrl('https://newapi.example.com');
      }).not.toThrow();
    });
  });

  describe('BasketballBundAPIError', () => {
    test('should create error with message', () => {
      const error = new BasketballBundAPIError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('BasketballBundAPIError');
      expect(error.status).toBeUndefined();
      expect(error.response).toBeUndefined();
    });

    test('should create error with status and response', () => {
      const error = new BasketballBundAPIError('Test error', 404, { error: 'Not found' });
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.response).toEqual({ error: 'Not found' });
    });
  });
}); 