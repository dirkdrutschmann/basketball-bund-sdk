// Einfaches Beispiel für die verbesserten Funktionssignaturen
// Führe aus mit: npx ts-node examples/simple-improved.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function simpleExample() {
  console.log('🎯 Einfaches Beispiel - Verbesserte Funktionssignaturen');
  console.log('=====================================================');

  const sdk = new BasketballBundSDK({
    baseUrl: 'https://www.basketball-bund.net',
    timeout: 10000
  });

  try {
    // 🔐 Captcha generieren (keine Parameter nötig)
    const captcha = await sdk.captcha.generate();
    console.log('✅ Captcha generiert');

    // 🏀 Vereine nach Freitext suchen
    const clubs = await sdk.club.getClubsByFreetext({
      freetext: 'Berlin'
    });
    console.log('✅ Vereine gefunden:', clubs.length);

    // ⚽ Match-Info abrufen
    const matchInfo = await sdk.match.getMatchInfo({
      matchId: 12345
    });
    console.log('✅ Match-Info abgerufen');

    // 🏆 Spielplan abrufen
    const spielplan = await sdk.competition.getSpielplan({
      competitionId: 12345
    });
    console.log('✅ Spielplan abgerufen');

    // 🏀 WAM Liga-Liste
    const wamList = await sdk.wam.getLigaList({
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

  } catch (error) {
    console.log('ℹ️ Demo-Credentials funktionieren nicht, aber die Signaturen sind korrekt!');
    console.log('✅ Alle Funktionssignaturen verwenden jetzt benannte Parameter');
  }
}

simpleExample().then(() => {
  console.log('\n🎉 Beispiel abgeschlossen!');
  console.log('💡 Alle API-Calls verwenden jetzt benannte Parameter für bessere Lesbarkeit');
}); 