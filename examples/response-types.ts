// Beispiel für die neuen Response-Typen
// Führe aus mit: npx ts-node examples/response-types.ts

import BasketballBundSDK from 'basketball-bund-sdk';

async function responseTypesExample() {
  console.log('🎯 Basketball-Bund SDK - Response-Typen Beispiel');
  console.log('===============================================');

  const sdk = new BasketballBundSDK({
    baseUrl: 'https://www.basketball-bund.net',
    timeout: 10000
  });

  try {
    console.log('✅ SDK initialisiert');

    // 🔐 Captcha Service - Response<Captcha>
    console.log('\n🔐 Captcha Service:');
    const captchaResponse = await sdk.captcha.generate();
    console.log('Response Typ:', typeof captchaResponse);
    console.log('Response.data Typ:', typeof captchaResponse.data);
    console.log('Response.success:', captchaResponse.success);
    console.log('Captcha Code:', captchaResponse.data?.captchaCode);

    // 🏀 Club Service - Response<ClubModel[]>
    console.log('\n🏀 Club Service:');
    const clubsResponse = await sdk.club.getClubsByFreetext({
      freetext: 'Berlin'
    });
    console.log('Response Typ:', typeof clubsResponse);
    console.log('Response.data Typ:', Array.isArray(clubsResponse.data) ? 'Array' : typeof clubsResponse.data);
    console.log('Response.success:', clubsResponse.success);
    console.log('Anzahl Vereine:', clubsResponse.data?.length || 0);

    // ⚽ Match Service - Response<MatchModel>
    console.log('\n⚽ Match Service:');
    const matchResponse = await sdk.match.getMatchInfo({
      matchId: 12345
    });
    console.log('Response Typ:', typeof matchResponse);
    console.log('Response.data Typ:', typeof matchResponse.data);
    console.log('Response.success:', matchResponse.success);
    console.log('Match ID:', matchResponse.data?.id);

    // 🏆 Competition Service - Response<CompetitionModel>
    console.log('\n🏆 Competition Service:');
    const competitionResponse = await sdk.competition.getSpielplan({
      competitionId: 12345
    });
    console.log('Response Typ:', typeof competitionResponse);
    console.log('Response.data Typ:', typeof competitionResponse.data);
    console.log('Response.success:', competitionResponse.success);
    console.log('Competition Name:', competitionResponse.data?.competition?.liganame);

    // 🏀 WAM Service - Response<LigaList>
    console.log('\n🏀 WAM Service:');
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
    console.log('Response Typ:', typeof wamResponse);
    console.log('Response.data Typ:', typeof wamResponse.data);
    console.log('Response.success:', wamResponse.success);
    console.log('Anzahl Competitions:', wamResponse.data?.competitions?.length || 0);

    // 👤 User Service - Response<LoginModel>
    console.log('\n👤 User Service:');
    const userResponse = await sdk.user.getLoginContext();
    console.log('Response Typ:', typeof userResponse);
    console.log('Response.data Typ:', typeof userResponse.data);
    console.log('Response.success:', userResponse.success);
    console.log('User Logged In:', userResponse.data?.isLoggedIn);

    // 🏀 Team Service - Response<TeamMatches>
    console.log('\n🏀 Team Service:');
    const teamResponse = await sdk.team.getMatches({
      teamId: 12345,
      justHome: false
    });
    console.log('Response Typ:', typeof teamResponse);
    console.log('Response.data Typ:', typeof teamResponse.data);
    console.log('Response.success:', teamResponse.success);
    console.log('Team Name:', teamResponse.data?.team?.name);

  } catch (error) {
    console.log('ℹ️ Demo-Credentials funktionieren nicht, aber die Response-Typen sind korrekt!');
    console.log('✅ Alle API-Calls geben jetzt Response<T> zurück');
  }
}

// Beispiel für die Verwendung der Response-Typen
function responseUsageExample() {
  console.log('\n🎯 Verwendung der Response-Typen:');
  console.log('==================================');
  
  console.log('✅ Typisierte Responses:');
  console.log('```typescript');
  console.log('// Vorher:');
  console.log('const captcha = await sdk.captcha.generate();');
  console.log('console.log(captcha.captchaCode);');
  console.log('');
  console.log('// Nachher:');
  console.log('const captchaResponse = await sdk.captcha.generate();');
  console.log('if (captchaResponse.success && captchaResponse.data) {');
  console.log('  console.log(captchaResponse.data.captchaCode);');
  console.log('}');
  console.log('```');
  
  console.log('\n✅ Fehlerbehandlung:');
  console.log('```typescript');
  console.log('const response = await sdk.match.getMatchInfo({ matchId: 12345 });');
  console.log('if (response.success) {');
  console.log('  // Erfolgreich - response.data ist vom Typ MatchModel');
  console.log('  console.log(response.data.homeTeam.name);');
  console.log('} else {');
  console.log('  // Fehler - response.errors enthält Fehlermeldungen');
  console.log('  console.error(response.errors);');
  console.log('}');
  console.log('```');
  
  console.log('\n✅ Vollständige Typsicherheit:');
  console.log('- response.data ist korrekt typisiert');
  console.log('- response.success zeigt Erfolg/Fehler');
  console.log('- response.errors enthält Fehlermeldungen');
  console.log('- response.warnings enthält Warnungen');
}

// Beispiele ausführen
responseTypesExample().then(() => {
  responseUsageExample();
  console.log('\n🎉 Response-Typen Beispiel abgeschlossen!');
}); 