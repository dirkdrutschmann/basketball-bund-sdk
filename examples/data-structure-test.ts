// Test für die doppelte data-Struktur
// Führe aus mit: npx ts-node examples/data-structure-test.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function dataStructureTest() {
  console.log('🔍 Basketball-Bund SDK - Data-Struktur Test');
  console.log('==========================================');

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
      console.log('🍪 Session Cookie:', loginResult.sessionCookie);

      // 🏀 WAM Service testen
      console.log('\n🏀 WAM Service Test:');
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

      console.log('✅ WAM Response erhalten');
      console.log('Response Typ:', typeof wamResponse);
      console.log('Response.data Typ:', typeof wamResponse.data);
      console.log('Response.success:', wamResponse.success);

      if (wamResponse.data) {
        console.log('✅ Data erfolgreich extrahiert');
        console.log('Data Keys:', Object.keys(wamResponse.data));
        
        if ('competitions' in wamResponse.data) {
          console.log('✅ Competitions gefunden');
          console.log('Anzahl Competitions:', wamResponse.data.competitions?.length || 0);
        }
        
        if ('metadata' in wamResponse.data) {
          console.log('✅ Metadata gefunden');
          console.log('Metadata:', wamResponse.data.metadata);
        }
      } else {
        console.log('❌ Keine Data in Response');
      }

      // 🏆 Competition Service testen
      console.log('\n🏆 Competition Service Test:');
      const competitionResponse = await sdk.competition.getSpielplan({
        competitionId: 12345
      });

      console.log('✅ Competition Response erhalten');
      console.log('Response Typ:', typeof competitionResponse);
      console.log('Response.data Typ:', typeof competitionResponse.data);
      console.log('Response.success:', competitionResponse.success);

      if (competitionResponse.data) {
        console.log('✅ Competition Data erfolgreich extrahiert');
        console.log('Data Keys:', Object.keys(competitionResponse.data));
      }

    } else {
      console.log('❌ Login fehlgeschlagen:', loginResult.error);
    }

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für die API-Response-Struktur
function apiStructureExample() {
  console.log('\n📋 API Response-Struktur:');
  console.log('========================');
  
  console.log('Die API gibt folgende Struktur zurück:');
  console.log('```json');
  console.log('{');
  console.log('  "data": {');
  console.log('    "timestamp": "2025-07-26T21:24:38+0200",');
  console.log('    "status": "0",');
  console.log('    "message": "",');
  console.log('    "data": {');
  console.log('      "startAtIndex": 0,');
  console.log('      "ligen": [...],');
  console.log('      "hasMoreData": true,');
  console.log('      "size": 10');
  console.log('    },');
  console.log('    "version": "11.41.1-9c21751"');
  console.log('  },');
  console.log('  "status": 200,');
  console.log('  "statusText": "OK"');
  console.log('}');
  console.log('```');
  
  console.log('\nUnser SDK extrahiert automatisch die innere data-Property:');
  console.log('```typescript');
  console.log('const response = await sdk.wam.getLigaList(params);');
  console.log('// response.data enthält jetzt direkt die inneren Daten');
  console.log('console.log(response.data.ligen); // Zugriff auf die eigentlichen Daten');
  console.log('```');
}

// Beispiele ausführen
dataStructureTest().then(() => {
  apiStructureExample();
  console.log('\n🎉 Data-Struktur Test abgeschlossen!');
}); 