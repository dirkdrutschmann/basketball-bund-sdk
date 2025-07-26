// Einfaches Authentifizierungs-Beispiel für das Basketball-Bund SDK
// Führe aus mit: npx ts-node examples/auth-simple.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function simpleAuthExample() {
  console.log('🔐 Basketball-Bund SDK - Einfache Authentifizierung');
  console.log('==================================================');

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
      username: 'bbv_spt',
      password: 'BBVgs14053%21SPT'
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
        console.log('⚠️ API-Call fehlgeschlagen (normal für Demo):', error instanceof Error ? error.message : error);
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
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel ausführen
simpleAuthExample().then(() => {
  console.log('\n🎉 Authentifizierungs-Beispiel abgeschlossen!');
}); 