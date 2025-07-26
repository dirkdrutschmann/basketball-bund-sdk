// Beispiel für die verbesserten Funktionssignaturen
// Führe aus mit: npx ts-node examples/improved-signatures.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function improvedSignaturesExample() {
  console.log('🎯 Basketball-Bund SDK - Verbesserte Funktionssignaturen');
  console.log('======================================================');

  const sdk = new BasketballBundSDK({
    baseUrl: 'https://www.basketball-bund.net',
    timeout: 10000
  });

  try {
    console.log('✅ SDK initialisiert');

    // 🏀 WAM Service - Klare Parameter-Struktur
    console.log('\n🏀 WAM Service:');
    const wamLigaList = await sdk.wam.getLigaList({
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
    console.log('✅ WAM Liga-Liste abgerufen');

    const wamDataList = await sdk.wam.getWamDataList({
      akgGeschlechtIds: [],
      altersklasseIds: [],
      gebietIds: [],
      ligatypIds: [],
      sortBy: 0,
      spielklasseIds: [],
      token: "",
      verbandIds: [3]
    });
    console.log('✅ WAM Daten-Liste abgerufen');

    // 🏆 Competition Service - Klare Parameter-Struktur
    console.log('\n🏆 Competition Service:');
    const spielplan = await sdk.competition.getSpielplan({
      competitionId: 12345
    });
    console.log('✅ Spielplan abgerufen');

    const ligaList = await sdk.competition.getLigaList({
      competitionIds: [12345, 67890]
    });
    console.log('✅ Liga-Liste abgerufen');

    const actualMatches = await sdk.competition.getActual({
      competitionId: 12345,
      anzahlTage: 7
    });
    console.log('✅ Aktuelle Spiele abgerufen');

    const tabelle = await sdk.competition.getTabelle({
      competitionId: 12345
    });
    console.log('✅ Tabelle abgerufen');

    // ⚽ Match Service - Klare Parameter-Struktur
    console.log('\n⚽ Match Service:');
    const matchInfo = await sdk.match.getMatchInfo({
      matchId: 12345
    });
    console.log('✅ Match-Info abgerufen');

    const boxscore = await sdk.match.getBoxscore({
      matchId: 12345
    });
    console.log('✅ Boxscore abgerufen');

    const searchMatches = await sdk.match.searchMatches({
      akGruppeIdList: [1, 2, 3],
      fromDate: '2024-01-01',
      gIdList: [1, 2],
      spielfeldPlz: '80331',
      spielfeldUmkreis: 50,
      startAtIndex: 0,
      toDate: '2024-12-31'
    });
    console.log('✅ Spiele-Suche durchgeführt');

    // 🏀 Club Service - Klare Parameter-Struktur
    console.log('\n🏀 Club Service:');
    const clubsByFreetext = await sdk.club.getClubsByFreetext({
      freetext: 'Berlin'
    });
    console.log('✅ Vereine nach Freitext abgerufen');

    const searchClubs = await sdk.club.searchClubs({
      akjIdList: [1, 2],
      eIdList: [1],
      gIdList: [1],
      plz: '80331',
      startAtIndex: 0,
      umkreis: 50
    });
    console.log('✅ Vereine-Suche durchgeführt');

    const actualClubMatches = await sdk.club.getActualMatches({
      clubId: 12345,
      justHome: false,
      rangeDays: 7
    });
    console.log('✅ Aktuelle Vereins-Spiele abgerufen');

    // 🔐 Captcha Service
    console.log('\n🔐 Captcha Service:');
    const captcha = await sdk.captcha.generate();
    console.log('✅ Captcha generiert');

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für die Vorteile der neuen Signaturen
function signatureBenefits() {
  console.log('\n🎯 Vorteile der neuen Funktionssignaturen:');
  console.log('==========================================');
  
  console.log('✅ Klare Parameter-Struktur:');
  console.log('   - Alle Parameter sind benannt');
  console.log('   - Keine Verwechslung der Reihenfolge');
  console.log('   - IntelliSense zeigt alle verfügbaren Parameter');
  
  console.log('\n✅ Bessere Lesbarkeit:');
  console.log('   - Code ist selbsterklärend');
  console.log('   - Keine Magic Numbers oder Strings');
  console.log('   - Einfache Wartung und Debugging');
  
  console.log('\n✅ TypeScript-Unterstützung:');
  console.log('   - Vollständige Typsicherheit');
  console.log('   - Automatische Vervollständigung');
  console.log('   - Compile-Zeit-Fehlerprüfung');
  
  console.log('\n✅ Beispiel für WAM Service:');
  console.log('```typescript');
  console.log('// Vorher:');
  console.log('await sdk.wam.getLigaList(wamObject, 0);');
  console.log('');
  console.log('// Nachher:');
  console.log('await sdk.wam.getLigaList({');
  console.log('  akgGeschlechtIds: [],');
  console.log('  altersklasseIds: [],');
  console.log('  gebietIds: [],');
  console.log('  ligatypIds: [],');
  console.log('  sortBy: 0,');
  console.log('  spielklasseIds: [],');
  console.log('  token: "",');
  console.log('  verbandIds: [3],');
  console.log('  startAtIndex: 0');
  console.log('});');
  console.log('```');
}

// Beispiele ausführen
improvedSignaturesExample().then(() => {
  signatureBenefits();
  console.log('\n🎉 Verbesserte Signaturen Beispiel abgeschlossen!');
}); 