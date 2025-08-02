# Basketball-Bund SDK

Ein TypeScript/JavaScript SDK für die Basketball-Bund.net REST API.

📖 **[Vollständige Dokumentation auf GitHub Pages](https://dirkdrutschmann.github.io/basketball-bund-sdk/)**

## Installation

```bash
npm install git+https://github.com/dirkdrutschmann/basketball-bund-sdk.git
```

## Schnellstart

### ES6 Modules (empfohlen)

```javascript
import BasketballBundSDK from 'basketball-bund-sdk';

// Initialisierung des SDK
const sdk = new BasketballBundSDK();

// Beispiel: Vereine suchen
const clubsResponse = await sdk.club.getClubsByFreetext({
  freetext: 'München'
});
if (clubsResponse.success && clubsResponse.data) {
  console.log('Anzahl Vereine:', clubsResponse.data.length);
}
```

### CommonJS (Node.js)

```javascript
const { default: BasketballBundSDK } = require('basketball-bund-sdk/cjs');

// Initialisierung des SDK  
const sdk = new BasketballBundSDK();

// Beispiel: Spielplan einer Liga abrufen
const competitionResponse = await sdk.competition.getSpielplan({
  competitionId: 12345
});
if (competitionResponse.success && competitionResponse.data) {
  console.log('Liga Name:', competitionResponse.data.competition.liganame);
}
```

### TypeScript (mit vollständiger Typisierung)

```typescript
import BasketballBundSDK from 'basketball-bund-sdk';

// SDK mit TypeScript-Typen konfigurieren
const sdk = new BasketballBundSDK({
  baseUrl: 'https://api.basketball-bund.net',
  timeout: 10000
});

// Beispiel: Captcha generieren
const captchaResponse = await sdk.captcha.generate();
if (captchaResponse.success && captchaResponse.data) {
  console.log('Captcha Code:', captchaResponse.data.captchaCode);
}

// Beispiel: Vereine suchen
const clubsResponse = await sdk.club.getClubsByFreetext({
  freetext: 'Berlin'
});
if (clubsResponse.success && clubsResponse.data) {
  console.log('Anzahl Vereine:', clubsResponse.data.length);
}

// Beispiel: Benutzer-Kontext abrufen
const userContextResponse = await sdk.user.getLoginContext();
if (userContextResponse.success && userContextResponse.data) {
  console.log('User Logged In:', userContextResponse.data.isLoggedIn);
}
```

### 🔐 Authentifizierung

```typescript
import BasketballBundSDK from 'basketball-bund-sdk';

// SDK mit Authentifizierung initialisieren
const sdk = new BasketballBundSDK({
  baseUrl: 'https://www.basketball-bund.net',
  timeout: 10000
});

// Login durchführen
const loginResult = await sdk.auth.login({
  username: 'your_username',
  password: 'your_password'
});

if (loginResult.success) {
  console.log('✅ Authentifiziert!');
  console.log('🍪 Session Cookie:', loginResult.sessionCookie);
  
  // 🎯 WICHTIG: Nach erfolgreichem Login verwenden ALLE API-Calls automatisch die SESSION-Cookie
  const userContextResponse = await sdk.user.getLoginContext();
  const clubsResponse = await sdk.club.getSearchClubMetadata();
  const matchesResponse = await sdk.match.getMatchInfo({
    matchId: 12345
  });
  
  if (userContextResponse.success && userContextResponse.data) {
    console.log('👤 Benutzer:', userContextResponse.data);
  }
} else {
  console.log('❌ Login fehlgeschlagen:', loginResult.error);
}

// Logout
await sdk.auth.logout();
```

## 📋 Direkte Daten-Rückgabe

Alle API-Calls geben direkt die Daten zurück, nicht in einem Response-Wrapper:

```typescript
// Captcha Service - Direkte Captcha-Daten
const captcha = await sdk.captcha.generate();
console.log(captcha.captchaCode);

// Club Service - Direkte Club-Array-Daten
const clubs = await sdk.club.getClubsByFreetext({ freetext: 'Berlin' });
console.log(clubs.length);

// Match Service - Direkte Match-Daten
const matchInfo = await sdk.match.getMatchInfo({ matchId: 12345 });
console.log(matchInfo.homeTeam.name);
```

### 🔍 API Response-Struktur

Die Basketball-Bund API gibt folgende Struktur zurück:

```json
{
  "appContext": "",
  "data": {},
  "dateFormat": "",
  "message": "",
  "serverInstance": "",
  "status": "",
  "timeFormat": "",
  "timeFormatShort": "",
  "timestamp": "",
  "username": "",
  "version": ""
}
```

**Unser SDK extrahiert automatisch die `data`-Property**, sodass Sie direkt auf die eigentlichen Daten zugreifen können:

```typescript
const wamData = await sdk.wam.getLigaList(params);
// wamData enthält direkt die inneren Daten
console.log(wamData.ligen); // Direkter Zugriff auf die eigentlichen Daten
```

### Beispiel für direkte Daten-Rückgabe

```typescript
// Captcha Service - Direkte Captcha-Daten
const captcha = await sdk.captcha.generate();
console.log('Captcha Code:', captcha.captchaCode);

// Club Service - Direkte Club-Array-Daten
const clubs = await sdk.club.getClubsByFreetext({
  freetext: 'Berlin'
});
console.log('Anzahl Vereine:', clubs.length);

// Match Service - Direkte Match-Daten
const matchInfo = await sdk.match.getMatchInfo({
  matchId: 12345
});
console.log('Home Team:', matchInfo.homeTeam.name);

// WAM Service - Direkte WAM-Daten
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
console.log('Anzahl Ligen:', wamData.ligen?.length || 0);
```

## Konfiguration

Das SDK kann mit verschiedenen Optionen konfiguriert werden:

```typescript
import BasketballBundSDK from 'basketball-bund-sdk';

const sdk = new BasketballBundSDK({
  baseUrl: 'https://www.basketball-bund.net/rest', // Standard-URL
  timeout: 30000, // Timeout in Millisekunden
  headers: {
    'User-Agent': 'MeineApp/1.0'
  }
});
```

## Services

Das SDK ist in verschiedene Services unterteilt:

### 🔐 AuthenticationService

Authentifizierung und Session-Management:

```typescript
// Login durchführen
const loginResult = await sdk.auth.login({
  username: 'your_username',
  password: 'your_password'
});

// Authentifizierungsstatus prüfen (asynchron)
const isAuthenticated = await sdk.isAuthenticated();

// 🍪 Nach Login verwenden ALLE API-Calls automatisch die SESSION-Cookie
if (loginResult.success) {
  // Diese Calls sind automatisch authentifiziert
  const userContext = await sdk.user.getLoginContext();
  const clubs = await sdk.club.getSearchClubMetadata();
}

// Logout durchführen
await sdk.auth.logout();
```

### 🔍 Asynchrone Authentifizierungsprüfung

Die `isAuthenticated()` Methode prüft jetzt den `/user/lc` Endpoint, um den echten Login-Status zu ermitteln:

```typescript
// Authentifizierungsstatus prüfen (asynchron)
const isAuthenticated = await sdk.isAuthenticated();

if (isAuthenticated) {
  console.log('Benutzer ist eingeloggt');
  const userContext = await sdk.user.getLoginContext();
  console.log('Willkommen,', userContext.username);
} else {
  console.log('Benutzer ist nicht eingeloggt');
}
```

**Vorteile:**

- ✅ Echte API-Prüfung statt nur Cookie-Prüfung
- ✅ Zuverlässigere Authentifizierungsprüfung
- ✅ Erkennt abgelaufene Sessions
- ✅ Prüft ob Benutzer wirklich eingeloggt ist

### 🏀 ClubService

Verwaltung von Vereinsinformationen:

```typescript
// Vereine nach Freitext suchen
const clubs = await sdk.club.getClubsByFreetext({
  freetext: 'Bayern'
});

// Erweiterte Vereinssuche
const searchResult = await sdk.club.searchClubs({
  plz: '80331',
  umkreis: 50,
  akjIdList: [1, 2],
  eIdList: [],
  gIdList: [],
  startAtIndex: 0
});

// Aktuelle Spiele eines Vereins
const matches = await sdk.club.getActualMatches({
  clubId: 12345,
  justHome: false,
  rangeDays: 7
});

// Such-Metadaten abrufen
const metadata = await sdk.club.getSearchClubMetadata();
```

### 🏆 CompetitionService

Liga- und Wettkampfinformationen:

```typescript
// Spielplan einer Liga
const spielplan = await sdk.competition.getSpielplan({
  competitionId: 12345
});

// Tabelle einer Liga
const tabelle = await sdk.competition.getTabelle({
  competitionId: 12345
});

// Aktuelle Spiele einer Liga
const actualMatches = await sdk.competition.getActual({
  competitionId: 12345,
  anzahlTage: 7
});

// Spiele nach Spieltag
const matchDay = await sdk.competition.getByMatchDay(12345, 5);

// Kreuztabelle
const crossTable = await sdk.competition.getCrosstable(12345);

// Team-Statistiken
const teamStats = await sdk.competition.getTeamStatistic(12345, true);

// Liga-Liste abrufen
const competitions = await sdk.competition.getLigaList({
  competitionIds: [12345, 67890]
});
```

### ⚽ MatchService

Spiel-Informationen:

```typescript
// Spiel-Details
const match = await sdk.match.getMatchById({
  matchId: 12345
});

// Spiel-Informationen
const matchInfo = await sdk.match.getMatchInfo({
  matchId: 12345
});

// Boxscore eines Spiels
const boxscore = await sdk.match.getBoxscore({
  matchId: 12345
});

// Play-by-Play Report
const playByPlay = await sdk.match.getPlayByPlayReport({
  matchId: 12345
});

// Spiele suchen
const searchResult = await sdk.match.searchMatches({
  fromDate: '2024-01-01',
  toDate: '2024-12-31',
  gIdList: [1, 2],
  akGruppeIdList: [],
  spielfeldPlz: '80331',
  spielfeldUmkreis: 50,
  startAtIndex: 0
});
```

### 👥 TeamService

Team-Informationen:

```typescript
// Spiele eines Teams
const teamMatches = await sdk.team.getMatches({
  teamId: 12345,
  justHome: false
});
```

### 👤 UserService

Benutzer-Informationen:

```typescript
// Login-Kontext abrufen
const loginContext = await sdk.user.getLoginContext();

// Prüfen ob Benutzer DBB-Geschäftsstelle ist
const isDBB = await sdk.user.isDBBGeschaeftsstelle();

// Prüfen ob Benutzer Geschäftsstelle ist
const isGeschaeftsstelle = await sdk.user.isGeschaeftsstelle();

// Geschäftsstellen-Zuordnungen
const assignments = await sdk.user.getGeschaeftsstelleFor();
```

### 📝 RegistrationService

Spieler-Registrierung:

```typescript
// Registrierungs-Informationen abrufen
const regInfo = await sdk.registration.getRegistrationInfo({
  type: 'data',
  registrationId: 12345,
  signature: 'signature'
});

// Spieler-Einladung initialisieren
const invitationForm = await sdk.registration.invitePlayerInit();

// Spieler einladen
const result = await sdk.registration.invitePlayer({
  captcha: {
    captchaCode: '1234',
    captchaImgSrc: 'base64...',
    captchaKeyId: 123,
    captchaToken: 'token'
  },
  invitationData: {
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    dateOfBirth: '1990-01-01',
    gender: 1,
    // weitere Felder...
  }
});
```

### 🏀 WamService

Wettkampf- und Altersklassen-Management:

```typescript
// Liga-Liste abrufen
const ligaList = await sdk.wam.getLigaList({
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

// WAM-Daten abrufen
const wamData = await sdk.wam.getWamDataList({
  akgGeschlechtIds: [],
  altersklasseIds: [],
  gebietIds: [],
  ligatypIds: [],
  sortBy: 0,
  spielklasseIds: [],
  token: "",
  verbandIds: [3]
});
```

### 🔐 CaptchaService

Captcha-Generierung:

```typescript
// Neues Captcha generieren
const captcha = await sdk.captcha.generate();
console.log(captcha.captchaImgSrc); // Base64-kodiertes Bild
```

### 🎯 WamService

WAM (Wettkampfangebote und -meldungen):

```typescript
// Liga-Liste mit WAM-Filter
const ligaList = await sdk.wam.getLigaList({
  akgGeschlechtIds: ['1'],
  altersklasseIds: [1, 2],
  gebietIds: [1],
  ligatypIds: [1],
  sortBy: 0,
  spielklasseIds: [1],
  token: '',
  verbandIds: [1]
});

// WAM-Daten abrufen
const wamData = await sdk.wam.getWamDataList({
  akgGeschlechtIds: ['1'],
  altersklasseIds: [1],
  gebietIds: [1],
  ligatypIds: [1],
  sortBy: 0,
  spielklasseIds: [1],
  token: '',
  verbandIds: [1]
});
```

### 🔧 WidgetService

Widget-Funktionen:

```typescript
// Widget-JavaScript abrufen
const widgetJS = await sdk.widget.getWidgetJS();
```

## TypeScript Support

Das SDK ist vollständig in TypeScript geschrieben und bietet vollständige Typsicherheit:

```typescript
import { ClubModel, MatchModel, CompetitionModel } from 'basketball-bund-sdk';

// Alle API-Responses sind typisiert
const club: ClubModel = await sdk.club.getClubsByFreetext('München')[0];
const match: MatchModel = await sdk.match.getMatchById(12345);
const competition: CompetitionModel = await sdk.competition.getSpielplan(12345);
```

## Fehlerbehandlung

Das SDK wirft typisierte Fehler:

```typescript
import { BasketballBundAPIError } from 'basketball-bund-sdk';

try {
  const match = await sdk.match.getMatchById(12345);
} catch (error) {
  if (error instanceof BasketballBundAPIError) {
    console.error('API Fehler:', error.message);
    console.error('Status Code:', error.status);
    console.error('Response:', error.response);
  }
}
```

## Erweiterte Konfiguration

### Custom Headers setzen

```typescript
// Globale Headers setzen
sdk.setHeaders({
  'Authorization': 'Bearer your-token',
  'X-Custom-Header': 'value'
});
```

### Base URL ändern

```typescript
// Für Tests oder andere Umgebungen
sdk.setBaseUrl('https://test.basketball-bund.net/rest');
```

## Beispiele

### Vereinssuche mit Umkreis

```typescript
async function findNearbyClubs(plz: string, radius: number) {
  const metadata = await sdk.club.getSearchClubMetadata();
  
  const result = await sdk.club.searchClubs({
    plz,
    umkreis: radius,
    akjIdList: metadata.akjList.map(ak => ak.id),
    eIdList: [],
    gIdList: [],
    startAtIndex: 0
  });
  
  return result.clubs;
}

const clubs = await findNearbyClubs('80331', 25);
```

### Aktuelle Spiele einer Liga anzeigen

```typescript
async function getCurrentMatches(competitionId: number) {
  const competition = await sdk.competition.getActual(competitionId, 7);
  
  return competition.matches?.map(match => ({
    date: match.matchDate,
    time: match.matchTime,
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    location: match.location
  }));
}
```

### Tabelle einer Liga abrufen

```typescript
async function getLeagueTable(competitionId: number) {
  const competition = await sdk.competition.getTabelle(competitionId);
  
  return competition.table?.map((entry, index) => ({
    position: index + 1,
    team: entry.team.name,
    games: entry.games,
    wins: entry.wins,
    losses: entry.losses,
    points: entry.points
  }));
}
```

## API-Referenz

Die vollständige API-Dokumentation finden Sie auf der [Basketball-Bund Website](https://www.basketball-bund.net/).

## Lizenz

MIT License

## Beitragen

Beiträge sind willkommen! Bitte erstellen Sie ein Issue oder einen Pull Request.

## Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im [GitHub Repository](https://github.com/ddrutschmann/basketball-bund-sdk/issues).

## Autor

### Dirk Drutschmann

- Website: [https://drutschmann.dev](https://drutschmann.dev)
- E-Mail: <mail@drutschmann.dev>
- GitHub: [@dirkdrutschmann](https://github.com/dirkdrutschmann)
