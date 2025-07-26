// Test des Basketball-Bund SDK
// Führe aus mit: node examples/test-sdk.js

// ES Module Import (funktioniert in Node.js 14+)
import BasketballBundSDK from 'basketball-bund-sdk';

async function testSDK() {
  try {
    console.log('🚀 Initialisiere Basketball-Bund SDK...');
    
    // SDK initialisieren
    const sdk = new BasketballBundSDK({
      baseUrl: 'https://api.basketball-bund.net',
      timeout: 10000
    });
    
    console.log('✅ SDK erfolgreich initialisiert!');
    console.log('📋 Verfügbare Services:');
    console.log('- registration:', !!sdk.registration);
    console.log('- club:', !!sdk.club);
    console.log('- competition:', !!sdk.competition);
    console.log('- match:', !!sdk.match);
    console.log('- team:', !!sdk.team);
    console.log('- user:', !!sdk.user);
    console.log('- widget:', !!sdk.widget);
    console.log('- wam:', !!sdk.wam);
    console.log('- captcha:', !!sdk.captcha);
    
    // Test: Captcha abrufen (einfacher API-Call)
    console.log('\n🔍 Teste API-Verbindung...');
    const captcha = await sdk.captcha.generate();
    console.log('✅ API-Verbindung erfolgreich!');
    console.log('📊 Captcha Response:', captcha);
    
  } catch (error) {
    console.error('❌ Fehler beim Testen des SDK:', error.message);
    if (error.response) {
      console.error('📡 HTTP Status:', error.response.status);
      console.error('📄 Response:', error.response.data);
    }
  }
}

// Test ausführen
testSDK(); 