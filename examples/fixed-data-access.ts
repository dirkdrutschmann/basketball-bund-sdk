// Beispiel für den Zugriff auf die korrigierten Daten
// Führe aus mit: npx ts-node examples/fixed-data-access.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function fixedDataAccessExample() {
  console.log('🎯 Basketball-Bund SDK - Korrigierter Datenzugriff');
  console.log('================================================');

  const sdk = new BasketballBundSDK({
    baseUrl: 'https://www.basketball-bund.net',
    timeout: 10000
  });

  try {
    console.log('✅ SDK initialisiert');

    // 🔐 Login durchführen
    console.log('\n🔑 Login...');
    const loginResult = await sdk.auth.login({
      username: 'bbv_spt',
      password: 'BBVgs14053%21SPT'
    });

    if (loginResult.success) {
      console.log('✅ Login erfolgreich!');

      // 🏀 WAM Service - Korrigierter Datenzugriff
      console.log('\n🏀 WAM Service - Korrigierter Datenzugriff:');
      const wamResponse = await sdk.wam.getLigaList({
        akgGeschlechtIds: [],
        altersklasseIds: [],
        gebietIds: [],
        ligatypIds: [],
        sortBy: 0,
        spielklasseIds: [],
        token: "",
        verbandIds: [3],
        startAtIndex: 0
      });

      if (wamResponse.success && wamResponse.data) {
        console.log('✅ WAM Response erfolgreich');
        
        // Jetzt können wir direkt auf die Daten zugreifen
        if ('ligen' in wamResponse.data) {
          console.log('✅ Ligen gefunden:', wamResponse.data.ligen?.length || 0);
          
          // Beispiel für den Zugriff auf die ersten Liga-Daten
          if (wamResponse.data.ligen && wamResponse.data.ligen.length > 0) {
            const firstLiga = wamResponse.data.ligen[0];
            console.log('📋 Erste Liga:', {
              id: firstLiga.id,
              name: firstLiga.name,
              // weitere Eigenschaften...
            });
          }
        }
        
        if ('hasMoreData' in wamResponse.data) {
          console.log('📊 Mehr Daten verfügbar:', wamResponse.data.hasMoreData);
        }
        
        if ('size' in wamResponse.data) {
          console.log('📏 Anzahl Ergebnisse:', wamResponse.data.size);
        }
      } else {
        console.log('❌ WAM Response fehlgeschlagen');
        if (wamResponse.errors) {
          console.log('Fehler:', wamResponse.errors);
        }
      }

      // 🏆 Competition Service - Korrigierter Datenzugriff
      console.log('\n🏆 Competition Service - Korrigierter Datenzugriff:');
      const competitionResponse = await sdk.competition.getSpielplan({
        competitionId: 12345
      });

      if (competitionResponse.success && competitionResponse.data) {
        console.log('✅ Competition Response erfolgreich');
        
        // Direkter Zugriff auf die Competition-Daten
        if ('competition' in competitionResponse.data) {
          const competition = competitionResponse.data.competition;
          console.log('🏆 Competition:', {
            id: competition.ligaId,
            name: competition.liganame,
            season: competition.seasonName,
            verband: competition.verbandName
          });
        }
        
        if ('matches' in competitionResponse.data) {
          console.log('⚽ Anzahl Spiele:', competitionResponse.data.matches?.length || 0);
        }
      }

    } else {
      console.log('❌ Login fehlgeschlagen:', loginResult.error);
    }

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für die Verwendung der korrigierten Daten
function correctedDataUsage() {
  console.log('\n🎯 Verwendung der korrigierten Daten:');
  console.log('=====================================');
  
  console.log('✅ Vorher (mit doppelter data-Struktur):');
  console.log('```typescript');
  console.log('const response = await sdk.wam.getLigaList(params);');
  console.log('// Fehler: Cannot read properties of undefined (reading \'0\')');
  console.log('console.log(response.data.data.ligen[0]); // Doppelte data-Struktur');
  console.log('```');
  
  console.log('\n✅ Nachher (korrigiert):');
  console.log('```typescript');
  console.log('const response = await sdk.wam.getLigaList(params);');
  console.log('if (response.success && response.data) {');
  console.log('  // Direkter Zugriff auf die eigentlichen Daten');
  console.log('  console.log(response.data.ligen[0]);');
  console.log('  console.log(response.data.hasMoreData);');
  console.log('  console.log(response.data.size);');
  console.log('}');
  console.log('```');
  
  console.log('\n✅ Vorteile der Korrektur:');
  console.log('- Keine doppelte data-Struktur mehr');
  console.log('- Direkter Zugriff auf die eigentlichen Daten');
  console.log('- Bessere TypeScript-Unterstützung');
  console.log('- Einfachere API-Nutzung');
}

// Beispiele ausführen
fixedDataAccessExample().then(() => {
  correctedDataUsage();
  console.log('\n🎉 Korrigierter Datenzugriff Beispiel abgeschlossen!');
}); 