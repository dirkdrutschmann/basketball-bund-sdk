// Beispiel für die asynchrone isAuthenticated() Methode
// Führe aus mit: npx ts-node examples/async-authentication-check.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function asyncAuthenticationCheckExample() {
  console.log('🔐 Basketball-Bund SDK - Asynchrone Authentifizierungsprüfung');
  console.log('==========================================================');

  const sdk = new BasketballBundSDK({
    baseUrl: 'https://www.basketball-bund.net',
    timeout: 10000
  });

  try {
    console.log('✅ SDK initialisiert');

    // 🔍 Authentifizierungsstatus vor Login prüfen
    console.log('\n🔍 Authentifizierungsstatus vor Login:');
    const isAuthBefore = await sdk.isAuthenticated();
    console.log('Eingeloggt:', isAuthBefore);

    // 🔐 Login durchführen
    console.log('\n🔑 Login...');
    const loginResult = await sdk.auth.login({
      username: 'bbv_spt',
      password: 'BBVgs14053%21SPT'
    });

    if (loginResult.success) {
      console.log('✅ Login erfolgreich!');
      console.log('🍪 Session Cookie:', loginResult.sessionCookie);

      // 🔍 Authentifizierungsstatus nach Login prüfen
      console.log('\n🔍 Authentifizierungsstatus nach Login:');
      const isAuthAfter = await sdk.isAuthenticated();
      console.log('Eingeloggt:', isAuthAfter);

      // 👤 Benutzer-Kontext abrufen
      console.log('\n👤 Benutzer-Kontext:');
      const userContext = await sdk.user.getLoginContext();
      console.log('User Context:', {
        username: userContext?.username,
        isLoggedIn: userContext?.isLoggedIn,
        userId: userContext?.userId
      });

      // 🔍 Erneute Authentifizierungsprüfung
      console.log('\n🔍 Erneute Authentifizierungsprüfung:');
      const isAuthFinal = await sdk.isAuthenticated();
      console.log('Eingeloggt:', isAuthFinal);

      // 🚪 Logout
      console.log('\n🚪 Logout...');
      await sdk.auth.logout();

      // 🔍 Authentifizierungsstatus nach Logout prüfen
      console.log('\n🔍 Authentifizierungsstatus nach Logout:');
      const isAuthAfterLogout = await sdk.isAuthenticated();
      console.log('Eingeloggt:', isAuthAfterLogout);

    } else {
      console.log('❌ Login fehlgeschlagen:', loginResult.error);
    }

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für die Verwendung der asynchronen isAuthenticated()
function asyncAuthUsage() {
  console.log('\n🎯 Verwendung der asynchronen isAuthenticated():');
  console.log('===============================================');
  
  console.log('✅ Vorher (synchron, nur Cookie-Prüfung):');
  console.log('```typescript');
  console.log('const isAuth = sdk.auth.isAuthenticated();');
  console.log('// Prüfte nur ob SESSION-Cookie gesetzt ist');
  console.log('```');
  
  console.log('\n✅ Nachher (asynchron, echte API-Prüfung):');
  console.log('```typescript');
  console.log('const isAuth = await sdk.isAuthenticated();');
  console.log('// Prüft /user/lc Endpoint um echten Login-Status zu ermitteln');
  console.log('');
  console.log('// Beispiel für sichere Authentifizierungsprüfung');
  console.log('async function checkAuth() {');
  console.log('  const isAuthenticated = await sdk.isAuthenticated();');
  console.log('  if (isAuthenticated) {');
  console.log('    // Benutzer ist wirklich eingeloggt');
  console.log('    const userContext = await sdk.user.getLoginContext();');
  console.log('    console.log("Willkommen,", userContext.username);');
  console.log('  } else {');
  console.log('    // Benutzer ist nicht eingeloggt');
  console.log('    console.log("Bitte einloggen");');
  console.log('  }');
  console.log('}');
  console.log('```');
  
  console.log('\n✅ Vorteile der asynchronen Authentifizierungsprüfung:');
  console.log('- Echte API-Prüfung statt nur Cookie-Prüfung');
  console.log('- Zuverlässigere Authentifizierungsprüfung');
  console.log('- Erkennt abgelaufene Sessions');
  console.log('- Prüft ob Benutzer wirklich eingeloggt ist');
}

// Beispiele ausführen
asyncAuthenticationCheckExample().then(() => {
  asyncAuthUsage();
  console.log('\n🎉 Asynchrone Authentifizierungsprüfung Beispiel abgeschlossen!');
}); 