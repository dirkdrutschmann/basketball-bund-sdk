// CommonJS Import (Node.js mit .cjs-Dateien)
const { default: BasketballBundSDK } = require('basketball-bund-sdk/dist/index.cjs');

async function exampleUsage() {
  // SDK initialisieren
  const sdk = new BasketballBundSDK({
    timeout: 10000,
    headers: {
      'User-Agent': 'MyApp/1.0'
    }
  });

  try {
    console.log('🏀 Basketball-Bund SDK Beispiele\n');

    // 1. Vereine suchen
    console.log('1. Vereine in München suchen...');
    const clubs = await sdk.club.getClubsByFreetext('München');
    console.log(`Gefunden: ${clubs.length} Vereine`);
    
    if (clubs.length > 0) {
      clubs.slice(0, 3).forEach(club => {
        console.log(`- ${club.vereinsname} (${club.vereinsnummer})`);
      });
    }

    // 2. Captcha generieren
    console.log('\n2. Captcha generieren...');
    const captcha = await sdk.captcha.generate();
    console.log(`Captcha ID: ${captcha.captchaKeyId}`);

    // 3. Login-Status prüfen
    console.log('\n3. Login-Status prüfen...');
    const loginContext = await sdk.user.getLoginContext();
    console.log(`Eingeloggt: ${loginContext.isLoggedIn}`);

    console.log('\n✅ Alle Beispiele erfolgreich ausgeführt!');

  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
}

// Nur ausführen wenn direkt aufgerufen
if (require.main === module) {
  exampleUsage();
}

module.exports = { exampleUsage }; 