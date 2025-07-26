// Test-Beispiel: Cookies nach Login
// Führe aus mit: npx ts-node examples/auth-cookie-test.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function cookieTest() {
  console.log('🍪 Basketball-Bund SDK - Cookie Test nach Login');
  console.log('==============================================');

  try {
    // SDK initialisieren
    const sdk = new BasketballBundSDK({
      baseUrl: 'https://www.basketball-bund.net',
      timeout: 10000
    });

    console.log('✅ SDK initialisiert');
    console.log('🔍 Vor Login - Authentifiziert:', sdk.auth.isAuthenticated());

    // Login durchführen
    console.log('\n🔑 Login...');
    const loginResult = await sdk.auth.login({
      username: 'bbv_spt',
      password: 'BBVgs14053%21SPT'
    });

    if (loginResult.success) {
      console.log('✅ Login erfolgreich!');
      console.log('🍪 Session Cookie:', loginResult.sessionCookie);
      console.log('🔍 Nach Login - Authentifiziert:', sdk.auth.isAuthenticated());

      // Zeige aktuelle Headers
      console.log('\n📋 Aktuelle Headers:');
      const headers = sdk['httpClient'].getHeaders();
      console.log('Headers:', headers);

      // Teste verschiedene API-Calls die Cookies verwenden sollten
      console.log('\n🧪 Teste API-Calls mit Cookies...');

      // Test 1: Captcha (sollte ohne Auth funktionieren)
      try {
        console.log('1️⃣ Captcha generieren...');
        const captcha = await sdk.captcha.generate();
        console.log('✅ Captcha erfolgreich:', captcha);
      } catch (error) {
        console.log('❌ Captcha fehlgeschlagen:', error instanceof Error ? error.message : error);
      }

      // Test 2: Benutzer-Kontext (sollte mit Auth funktionieren)
      try {
        console.log('2️⃣ Benutzer-Kontext abrufen...');
        const userContext = await sdk.user.getLoginContext();
        console.log('✅ Benutzer-Kontext erfolgreich:', userContext);
      } catch (error) {
        console.log('❌ Benutzer-Kontext fehlgeschlagen:', error instanceof Error ? error.message : error);
      }

      // Test 3: Vereine abrufen
      try {
        console.log('3️⃣ Vereine abrufen...');
        const clubs = await sdk.club.getSearchClubMetadata();
        console.log('✅ Vereine erfolgreich abgerufen');
      } catch (error) {
        console.log('❌ Vereine fehlgeschlagen:', error instanceof Error ? error.message : error);
      }

      // Logout
      console.log('\n🚪 Logout...');
      await sdk.auth.logout();
      console.log('✅ Ausgeloggt!');
      console.log('🔍 Nach Logout - Authentifiziert:', sdk.auth.isAuthenticated());

    } else {
      console.log('❌ Login fehlgeschlagen:', loginResult.error);
    }

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel ausführen
cookieTest().then(() => {
  console.log('\n🎉 Cookie-Test abgeschlossen!');
}); 