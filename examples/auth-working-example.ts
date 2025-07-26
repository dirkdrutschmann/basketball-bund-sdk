// Funktionsfähiges Authentifizierungs-Beispiel
// Führe aus mit: npx ts-node examples/auth-working-example.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function workingAuthExample() {
  console.log('🔐 Basketball-Bund SDK - Funktionsfähiges Beispiel');
  console.log('==================================================');

  try {
    // SDK initialisieren
    const sdk = new BasketballBundSDK({
      baseUrl: 'https://www.basketball-bund.net',
      timeout: 10000
    });

    console.log('✅ SDK initialisiert');
    console.log('🔍 Vor Login - Authentifiziert:', sdk.auth.isAuthenticated());

    // Login durchführen (ersetze mit echten Credentials)
    console.log('\n🔑 Login...');
    console.log('⚠️ Ersetze "your_username" und "your_password" mit echten Credentials');
    
    const loginResult = await sdk.auth.login({
      username: 'your_username', // Ersetze mit echtem Username
      password: 'your_password'  // Ersetze mit echtem Password
    });

    if (loginResult.success) {
      console.log('✅ Login erfolgreich!');
      console.log('🍪 Session Cookie:', loginResult.sessionCookie);
      console.log('🔍 Nach Login - Authentifiziert:', sdk.auth.isAuthenticated());

      // Zeige aktuelle Headers
      console.log('\n📋 Aktuelle Headers:');
      const headers = sdk['httpClient'].getHeaders();
      console.log('Cookie Header:', headers.Cookie ? 'Gesetzt' : 'Nicht gesetzt');

      // Jetzt sollten alle API-Calls automatisch die SESSION-Cookie verwenden
      console.log('\n🧪 Teste authentifizierte API-Calls...');

      // Test 1: Benutzer-Kontext (erfordert Authentifizierung)
      try {
        console.log('1️⃣ Benutzer-Kontext abrufen...');
        const userContext = await sdk.user.getLoginContext();
        console.log('✅ Benutzer-Kontext erfolgreich abgerufen');
        console.log('👤 Benutzer-Daten:', userContext);
      } catch (error) {
        console.log('❌ Benutzer-Kontext fehlgeschlagen:', error instanceof Error ? error.message : error);
      }

      // Test 2: Geschäftsstelle prüfen
      try {
        console.log('2️⃣ Geschäftsstelle prüfen...');
        const isGeschaeftsstelle = await sdk.user.isGeschaeftsstelle();
        console.log('✅ Geschäftsstelle-Status:', isGeschaeftsstelle);
      } catch (error) {
        console.log('❌ Geschäftsstelle-Prüfung fehlgeschlagen:', error instanceof Error ? error.message : error);
      }

      // Test 3: Vereine abrufen (sollte auch mit Auth funktionieren)
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
      console.log('💡 Tipp: Stelle sicher, dass die Credentials korrekt sind');
    }

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für die Verwendung mit echten Credentials
function realWorldExample() {
  console.log('\n🌍 Real-World Beispiel:');
  console.log('```typescript');
  console.log('const sdk = new BasketballBundSDK({');
  console.log('  baseUrl: "https://www.basketball-bund.net",');
  console.log('  timeout: 10000');
  console.log('});');
  console.log('');
  console.log('// Login durchführen');
  console.log('const loginResult = await sdk.auth.login({');
  console.log('  username: "dein_echter_username",');
  console.log('  password: "dein_echtes_password"');
  console.log('});');
  console.log('');
  console.log('if (loginResult.success) {');
  console.log('  // Jetzt verwenden ALLE API-Calls automatisch die SESSION-Cookie');
  console.log('  const userContext = await sdk.user.getLoginContext();');
  console.log('  const clubs = await sdk.club.getSearchClubMetadata();');
  console.log('  const matches = await sdk.match.getMatchInfo(12345);');
  console.log('}');
  console.log('```');
}

// Beispiele ausführen
workingAuthExample().then(() => {
  realWorldExample();
  console.log('\n🎉 Beispiel abgeschlossen!');
}); 