import { BasketballBundSDK } from './index';

describe('BasketballBundSDK', () => {
  let sdk: BasketballBundSDK;

  beforeEach(() => {
    sdk = new BasketballBundSDK();
  });

  test('should initialize with default config', () => {
    expect(sdk).toBeInstanceOf(BasketballBundSDK);
    expect(sdk.registration).toBeDefined();
    expect(sdk.club).toBeDefined();
    expect(sdk.competition).toBeDefined();
    expect(sdk.match).toBeDefined();
    expect(sdk.team).toBeDefined();
    expect(sdk.user).toBeDefined();
    expect(sdk.widget).toBeDefined();
    expect(sdk.wam).toBeDefined();
    expect(sdk.captcha).toBeDefined();
  });

  test('should initialize with custom config', () => {
    const customSdk = new BasketballBundSDK({
      baseUrl: 'https://custom.api.com',
      timeout: 10000,
      headers: {
        'Custom-Header': 'value'
      }
    });

    expect(customSdk).toBeInstanceOf(BasketballBundSDK);
  });

  test('should have setHeaders method', () => {
    expect(typeof sdk.setHeaders).toBe('function');
    
    // Should not throw
    sdk.setHeaders({ 'Authorization': 'Bearer token' });
  });

  test('should have setBaseUrl method', () => {
    expect(typeof sdk.setBaseUrl).toBe('function');
    
    // Should not throw
    sdk.setBaseUrl('https://new.api.com');
  });
}); 