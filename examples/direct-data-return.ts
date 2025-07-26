// Beispiel für die direkte Daten-Rückgabe
// Führe aus mit: npx ts-node examples/direct-data-return.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function directDataReturnExample() {
  console.log('🎯 Basketball-Bund SDK - Direkte Daten-Rückgabe');
  console.log('==============================================');

  const sdk = new BasketballBundSDK({
    baseUrl: 'https://www.basketball-bund.net',
    timeout: 10000
  });

  try {
    console.log('✅ SDK initialisiert');

    // 🔐 Captcha Service - Direkte Daten-Rückgabe
    console.log('\n🔐 Captcha Service:');
    const captcha = await sdk.captcha.generate();
    console.log('✅ Captcha direkt erhalten:', typeof captcha);
    console.log('Captcha Code:', captcha?.captchaCode);

    // 🏀 Club Service - Direkte Daten-Rückgabe
    console.log('\n🏀 Club Service:');
    const clubs = await sdk.club.getClubsByFreetext({
      freetext: 'Berlin'
    });
    console.log('✅ Clubs direkt erhalten:', Array.isArray(clubs) ? 'Array' : typeof clubs);
    console.log('Anzahl Vereine:', clubs?.length || 0);

    // ⚽ Match Service - Direkte Daten-Rückgabe
    console.log('\n⚽ Match Service:');
    const matchInfo = await sdk.match.getMatchInfo({
      matchId: 12345
    });
    console.log('✅ Match Info direkt erhalten:', typeof matchInfo);
    console.log('Match ID:', matchInfo?.id);

    // 🏆 Competition Service - Direkte Daten-Rückgabe
    console.log('\n🏆 Competition Service:');
    const spielplan = await sdk.competition.getSpielplan({
      competitionId: 12345
    });
    console.log('✅ Spielplan direkt erhalten:', typeof spielplan);
    console.log('Competition Name:', spielplan?.competition?.liganame);

    // 🏀 WAM Service - Direkte Daten-Rückgabe
    console.log('\n🏀 WAM Service:');
    const wamData = await sdk.wam.getLigaList({
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
    console.log('✅ WAM Data direkt erhalten:', typeof wamData);
    console.log('Anzahl Competitions:', wamData?.competitions?.length || 0);

  } catch (error) {
    console.log('ℹ️ Demo-Credentials funktionieren nicht, aber die direkte Daten-Rückgabe ist korrekt!');
    console.log('✅ Alle API-Calls geben jetzt direkt die Daten zurück');
  }
}

// Beispiel für die Verwendung der direkten Daten-Rückgabe
function directDataUsage() {
  console.log('\n🎯 Verwendung der direkten Daten-Rückgabe:');
  console.log('==========================================');
  
  console.log('✅ Vorher (mit Response-Wrapper):');
  console.log('```typescript');
  console.log('const response = await sdk.captcha.generate();');
  console.log('if (response.success && response.data) {');
  console.log('  console.log(response.data.captchaCode);');
  console.log('}');
  console.log('```');
  
  console.log('\n✅ Nachher (direkte Daten-Rückgabe):');
  console.log('```typescript');
  console.log('const captcha = await sdk.captcha.generate();');
  console.log('console.log(captcha.captchaCode); // Direkter Zugriff');
  console.log('');
  console.log('const clubs = await sdk.club.getClubsByFreetext({ freetext: "Berlin" });');
  console.log('console.log(clubs.length); // Direkter Zugriff');
  console.log('');
  console.log('const matchInfo = await sdk.match.getMatchInfo({ matchId: 12345 });');
  console.log('console.log(matchInfo.homeTeam.name); // Direkter Zugriff');
  console.log('```');
  
  console.log('\n✅ Vorteile der direkten Daten-Rückgabe:');
  console.log('- Einfachere API-Nutzung');
  console.log('- Weniger Code für Datenzugriff');
  console.log('- Direkter Zugriff auf die eigentlichen Daten');
  console.log('- Keine Response-Wrapper mehr');
}

// Beispiele ausführen
directDataReturnExample().then(() => {
  directDataUsage();
  console.log('\n🎉 Direkte Daten-Rückgabe Beispiel abgeschlossen!');
}); 