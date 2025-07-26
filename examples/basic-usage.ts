import BasketballBundSDK from '../src/index';

async function basicUsageExample() {
  // SDK initialisieren
  const sdk = new BasketballBundSDK();

  try {
    console.log('🏀 Basketball-Bund SDK Beispiele\n');

    // 1. Vereine suchen
    console.log('1. Vereine in München suchen...');
    const clubs = await sdk.club.getClubsByFreetext('München');
    console.log(`Gefunden: ${clubs.length} Vereine`);
    clubs.slice(0, 3).forEach(club => {
      console.log(`- ${club.vereinsname} (${club.vereinsnummer})`);
    });
    console.log('');

    // 2. Such-Metadaten abrufen
    console.log('2. Such-Metadaten abrufen...');
    const metadata = await sdk.club.getSearchClubMetadata();
    console.log(`Altersklassen: ${metadata.akjList.length}`);
    console.log(`Ebenen: ${metadata.eList.length}`);
    console.log(`Gebiete: ${metadata.gList.length}`);
    console.log('');

    // 3. Erweiterte Vereinssuche
    if (clubs.length > 0) {
      const firstClub = clubs[0];
      console.log(`3. Aktuelle Spiele von ${firstClub.vereinsname}...`);
      
      try {
        const matches = await sdk.club.getActualMatches(firstClub.vereinId, false, 14);
        console.log(`Spiele gefunden: ${matches.matches.length}`);
        
        matches.matches.slice(0, 3).forEach(match => {
          console.log(`- ${match.homeTeam.name} vs ${match.awayTeam.name} (${match.matchDate})`);
        });
      } catch (error) {
        console.log('Keine aktuellen Spiele verfügbar');
      }
      console.log('');
    }

    // 4. Captcha generieren
    console.log('4. Captcha generieren...');
    try {
      const captcha = await sdk.captcha.generate();
      console.log(`Captcha ID: ${captcha.captchaKeyId}`);
      console.log(`Captcha Token: ${captcha.captchaToken}`);
    } catch (error) {
      console.log('Captcha-Generierung fehlgeschlagen');
    }
    console.log('');

    // 5. Login-Kontext prüfen
    console.log('5. Login-Kontext prüfen...');
    try {
      const loginContext = await sdk.user.getLoginContext();
      console.log(`Eingeloggt: ${loginContext.isLoggedIn}`);
      if (loginContext.username) {
        console.log(`Benutzer: ${loginContext.username}`);
      }
    } catch (error) {
      console.log('Login-Kontext nicht verfügbar');
    }
    console.log('');

    console.log('✅ Alle Beispiele erfolgreich ausgeführt!');

  } catch (error) {
    console.error('❌ Fehler beim Ausführen der Beispiele:', error);
  }
}

// Beispiel ausführen
if (require.main === module) {
  basicUsageExample();
} 