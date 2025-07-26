// JavaScript Authentifizierungs-Beispiel für das Basketball-Bund SDK
// Führe aus mit: node examples/auth-javascript.js

import BasketballBundSDK from 'basketball-bund-sdk';

async function authExample() {
  console.log('🔐 Basketball-Bund SDK - JavaScript Authentifizierung');
  console.log('=====================================================');

  try {
    // SDK initialisieren
    const sdk = new BasketballBundSDK({
      baseUrl: 'https://www.basketball-bund.net',
      timeout: 10000
    });

    console.log('✅ SDK initialisiert');

    // Login durchführen
    console.log('\n🔑 Login...');
    const loginResult = await sdk.auth.login({
      username: 'your_username',
      password: 'your_password'
    });

    if (loginResult.success) {
      console.log('✅ Login erfolgreich!');
      console.log('🍪 Session Cookie:', loginResult.sessionCookie);
      console.log('🔍 Authentifiziert:', sdk.auth.isAuthenticated());

      // Beispiel für authentifizierte API-Calls
      console.log('\n📡 Authentifizierte API-Calls...');
      try {
        const userContext = await sdk.user.getLoginContext();
        console.log('👤 Benutzer-Kontext:', userContext);
      } catch (error) {
        console.log('⚠️ API-Call fehlgeschlagen (normal für Demo):', error.message);
      }

      // Logout
      console.log('\n🚪 Logout...');
      await sdk.auth.logout();
      console.log('✅ Ausgeloggt!');
      console.log('🔍 Authentifiziert:', sdk.auth.isAuthenticated());

    } else {
      console.log('❌ Login fehlgeschlagen:', loginResult.error);
    }

  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
}

// Beispiel ausführen
authExample().then(() => {
  console.log('\n🎉 JavaScript Authentifizierungs-Beispiel abgeschlossen!');
}); 