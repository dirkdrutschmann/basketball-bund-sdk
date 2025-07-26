// TypeScript Verwendung des Basketball-Bund SDK
// Führe aus mit: npx ts-node examples/typescript-usage.ts

import BasketballBundSDK, { 
  BasketballBundSDKConfig,
  ClubModel,
  CompetitionModel,
  Captcha
} from 'basketball-bund-sdk';

async function typescriptExample() {
  console.log('🚀 Basketball-Bund SDK TypeScript Beispiel');
  console.log('==========================================');

  // SDK mit TypeScript-Typen konfigurieren
  const config: BasketballBundSDKConfig = {
    baseUrl: 'https://api.basketball-bund.net',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  // SDK initialisieren
  const sdk = new BasketballBundSDK(config);

  try {
    console.log('✅ SDK erfolgreich initialisiert!');

    // Beispiel 1: Vereine suchen mit TypeScript-Typen
    console.log('\n🔍 Suche nach Vereinen...');
    const clubs: SearchClubResponseData = await sdk.club.getClubsByFreetext('Berlin');
    console.log(`📊 Vereine gefunden:`, clubs);

    // Beispiel 2: Spielplan abrufen
    console.log('\n🏀 Lade Spielplan...');
    const competition: CompetitionModel = await sdk.competition.getSpielplan(12345);
    console.log('📅 Spielplan geladen:', competition);

    // Beispiel 3: Captcha generieren
    console.log('\n🔐 Generiere Captcha...');
    const captcha: Captcha = await sdk.captcha.generate();
    console.log('✅ Captcha generiert:', captcha);

    // Beispiel 4: Spiele suchen
    console.log('\n⚽ Suche nach Spielen...');
    const matches: SearchMatchResponseData = await sdk.match.searchMatches({});
    console.log(`🎯 Spiele gefunden:`, matches);

    // Beispiel 5: Benutzer-Kontext abrufen
    console.log('\n👤 Lade Benutzer-Kontext...');
    const userContext = await sdk.user.getLoginContext();
    console.log('✅ Benutzer-Kontext geladen');

  } catch (error) {
    console.error('❌ Fehler:', error instanceof Error ? error.message : error);
  }
}

// Beispiel für erweiterte TypeScript-Funktionen
function advancedTypeScriptFeatures() {
  console.log('\n🔧 Erweiterte TypeScript-Features:');
  
  // SDK mit partieller Konfiguration
  const sdk = new BasketballBundSDK({
    timeout: 5000 // Nur timeout setzen, Rest sind Defaults
  });

  // TypeScript-Typen für API-Responses
  type ApiResponse<T> = {
    data: T;
    status: number;
    message?: string;
  };

  // Beispiel für typisierte API-Calls
  async function getTypedClubs(): Promise<ApiResponse<ClubModel[]>> {
    const response = await sdk.club.searchClubs('München');
    return {
      data: response,
      status: 200
    };
  }

  console.log('✅ TypeScript-Typen sind verfügbar');
}

// Beispiele ausführen
typescriptExample().then(() => {
  advancedTypeScriptFeatures();
  console.log('\n🎉 TypeScript-Beispiel abgeschlossen!');
}); 