# Basketball-Bund SDK

Ein TypeScript/JavaScript SDK für die Basketball-Bund.net REST API.

## Installation

```bash
npm install basketball-bund-sdk
```

## Schnellstart

```typescript
import BasketballBundSDK from 'basketball-bund-sdk';

// Initialisierung des SDK
const sdk = new BasketballBundSDK();

// Beispiel: Vereine suchen
const clubs = await sdk.club.getClubsByFreetext('München');
console.log(clubs);

// Beispiel: Spielplan einer Liga abrufen
const competition = await sdk.competition.getSpielplan(12345);
console.log(competition);
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

### 🏀 ClubService

Verwaltung von Vereinsinformationen:

```typescript
// Vereine nach Freitext suchen
const clubs = await sdk.club.getClubsByFreetext('Bayern');

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
const matches = await sdk.club.getActualMatches(
  12345, // Vereins-ID
  false, // nur Heimspiele?
  7 // Anzahl Tage
);

// Such-Metadaten abrufen
const metadata = await sdk.club.getSearchClubMetadata();
```

### 🏆 CompetitionService

Liga- und Wettkampfinformationen:

```typescript
// Spielplan einer Liga
const spielplan = await sdk.competition.getSpielplan(12345);

// Tabelle einer Liga
const tabelle = await sdk.competition.getTabelle(12345);

// Aktuelle Spiele einer Liga
const actualMatches = await sdk.competition.getActual(12345, 7);

// Spiele nach Spieltag
const matchDay = await sdk.competition.getByMatchDay(12345, 5);

// Kreuztabelle
const crossTable = await sdk.competition.getCrosstable(12345);

// Team-Statistiken
const teamStats = await sdk.competition.getTeamStatistic(12345, true);

// Liga-Liste abrufen
const competitions = await sdk.competition.getLigaList([12345, 67890]);
```

### ⚽ MatchService

Spiel-Informationen:

```typescript
// Spiel-Details
const match = await sdk.match.getMatchById(12345);

// Spiel-Informationen
const matchInfo = await sdk.match.getMatchInfo(12345);

// Boxscore eines Spiels
const boxscore = await sdk.match.getBoxscore(12345);

// Play-by-Play Report
const playByPlay = await sdk.match.getPlayByPlayReport(12345);

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
const teamMatches = await sdk.team.getMatches(
  12345, // Team-ID
  false  // nur Heimspiele?
);
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
const regInfo = await sdk.registration.getRegistrationInfo(
  'data', 
  12345, 
  'signature'
);

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

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im [GitHub Repository](https://github.com/yourusername/basketball-bund-sdk/issues). 