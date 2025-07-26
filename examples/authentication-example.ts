// Authentifizierungs-Beispiel für das Basketball-Bund SDK
// Führe aus mit: npx ts-node examples/authentication-example.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function authenticationExample() {
  console.log('🔐 Basketball-Bund SDK Authentifizierung');
  console.log('========================================');

  try {
    // Methode 1: Automatische Authentifizierung beim Initialisieren
    console.log('\n1️⃣ Automatische Authentifizierung:');
    const sdk1 = new BasketballBundSDK({
      username: 'your_username',
      password: 'your_password',
      baseUrl: 'https://www.basketball-bund.net',
      timeout: 10000
    });

    // Authentifizierung durchführen
    await sdk1.authenticate('your_username', 'your_password');
    console.log('✅ Automatisch authentifiziert!');

    // Prüfe Authentifizierungsstatus
    console.log('🔍 Authentifiziert:', sdk1.auth.isAuthenticated());

    // Methode 2: Manuelle Authentifizierung
    console.log('\n2️⃣ Manuelle Authentifizierung:');
    const sdk2 = new BasketballBundSDK({
      baseUrl: 'https://www.basketball-bund.net',
      timeout: 10000
    });

    // Login durchführen
    const loginResult = await sdk2.auth.login({
      username: 'your_username',
      password: 'your_password'
    });

    if (loginResult.success) {
      console.log('✅ Manuell authentifiziert!');
      console.log('🍪 Session Cookie:', loginResult.sessionCookie);
    } else {
      console.log('❌ Authentifizierung fehlgeschlagen:', loginResult.error);
    }

    // Beispiel für authentifizierte API-Calls
    console.log('\n3️⃣ Authentifizierte API-Calls:');
    
    if (sdk1.auth.isAuthenticated()) {
      // Diese Calls verwenden automatisch die SESSION-Cookie
      const userContext = await sdk1.user.getLoginContext();
      console.log('👤 Benutzer-Kontext:', userContext);
      
      const isGeschaeftsstelle = await sdk1.user.isGeschaeftsstelle();
      console.log('🏢 Ist Geschäftsstelle:', isGeschaeftsstelle);
    }

    // Logout
    console.log('\n4️⃣ Logout:');
    await sdk1.auth.logout();
    console.log('✅ Ausgeloggt!');
    console.log('🔍 Authentifiziert:', sdk1.auth.isAuthenticated());

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für Fehlerbehandlung
async function errorHandlingExample() {
  console.log('\n🚨 Fehlerbehandlung:');
  
  try {
    const sdk = new BasketballBundSDK();
    
    // Falsche Credentials
    await sdk.authenticate('wrong_username', 'wrong_password');
    
  } catch (error) {
    console.log('✅ Fehler abgefangen:', error instanceof Error ? error.message : error);
  }
}

// Beispiele ausführen
authenticationExample().then(() => {
  errorHandlingExample();
  console.log('\n🎉 Authentifizierungs-Beispiel abgeschlossen!');
}); 