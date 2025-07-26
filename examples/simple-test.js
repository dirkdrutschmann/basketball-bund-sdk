// Einfacher Test des Basketball-Bund SDK
// Führe aus mit: node examples/simple-test.js

// ES Module Import
import BasketballBundSDK from 'basketball-bund-sdk';

console.log('🚀 Basketball-Bund SDK Test');
console.log('========================');

// SDK initialisieren
const sdk = new BasketballBundSDK({
  baseUrl: 'https://api.basketball-bund.net',
  timeout: 10000
});

console.log('✅ SDK erfolgreich initialisiert!');
console.log('📋 Verfügbare Services:');

// Alle Services auflisten
const services = [
  'registration', 'club', 'competition', 'match', 
  'team', 'user', 'widget', 'wam', 'captcha'
];

services.forEach(service => {
  const serviceInstance = sdk[service];
  console.log(`- ${service}: ${serviceInstance ? '✅' : '❌'}`);
  
  if (serviceInstance) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(serviceInstance))
      .filter(name => name !== 'constructor' && typeof serviceInstance[name] === 'function');
    console.log(`  Methoden: ${methods.join(', ')}`);
  }
});

console.log('\n🎉 SDK ist bereit für die Verwendung!');
console.log('\nBeispiel für die Verwendung:');
console.log('const sdk = new BasketballBundSDK();');
console.log('const clubs = await sdk.club.getClubs();');
console.log('const matches = await sdk.match.getMatches();'); 