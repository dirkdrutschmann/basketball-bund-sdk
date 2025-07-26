// ES6 Module Import
import BasketballBundSDK from 'basketball-bund-sdk';

async function exampleUsage() {
  // SDK initialisieren
  const sdk = new BasketballBundSDK({
    timeout: 10000,
    headers: {
      'User-Agent': 'MyApp/1.0'
    }
  });

  try {
    console.log('🏀 Basketball-Bund SDK Beispiele (ES6 Modules)\n');

    // 1. Vereine suchen
    console.log('1. Vereine in Berlin suchen...');
    const clubs = await sdk.club.getClubsByFreetext('Berlin');
    console.log(`Gefunden: ${clubs.length} Vereine`);
    
    if (clubs.length > 0) {
      clubs.slice(0, 3).forEach(club => {
        console.log(`- ${club.vereinsname} (${club.vereinsnummer})`);
      });
    }

    // 2. Such-Metadaten abrufen
    console.log('\n2. Such-Metadaten abrufen...');
    const metadata = await sdk.club.getSearchClubMetadata();
    console.log(`Altersklassen verfügbar: ${metadata.akjList.length}`);

    console.log('\n✅ ES6 Module Beispiel erfolgreich!');

  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
}

// Beispiel ausführen
exampleUsage(); 