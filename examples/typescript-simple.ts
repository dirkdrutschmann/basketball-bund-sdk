// Einfaches TypeScript Beispiel für das Basketball-Bund SDK
// Führe aus mit: npx ts-node examples/typescript-simple.ts

import BasketballBundSDK, { 
  BasketballBundSDKConfig,
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

    // Beispiel 1: Captcha generieren (einfacher API-Call)
    console.log('\n🔐 Generiere Captcha...');
    const captcha: Captcha = await sdk.captcha.generate();
    console.log('✅ Captcha generiert:', captcha);

    // Beispiel 2: Vereine abrufen
    console.log('\n🏀 Lade Vereine...');
    const clubs = await sdk.club.getSearchClubMetadata({});
    console.log('✅ Vereine-Metadaten geladen:', clubs);

    // Beispiel 3: Wettbewerbe abrufen
    console.log('\n🏆 Lade Wettbewerbe...');
    const competitions = await sdk.competition.getLigaList({});
    console.log('✅ Wettbewerbe geladen:', competitions);

    // Beispiel 4: Benutzer-Kontext abrufen
    console.log('\n👤 Lade Benutzer-Kontext...');
    const userContext = await sdk.user.getLoginContext();
    console.log('✅ Benutzer-Kontext geladen:', userContext);

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
  async function getTypedCaptcha(): Promise<ApiResponse<Captcha>> {
    const response = await sdk.captcha.generate();
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