export interface Response<T = any> {
  data?: T;
  success?: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface ValidableResponse<T = any> extends Response<T> {
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface IdLabel {
  id: number;
  label: string;
}

export interface LabelValue {
  label: Record<string, any>;
  value: Record<string, any>;
}

export interface Captcha {
  captchaCode: string;
  captchaImgSrc: string;
  captchaKeyId: number;
  captchaToken: string;
}

export interface KontaktData {
  email: string;
  faxNr: string;
  faxNrVorwahl: string;
  name: string;
  ort: string;
  plz: string;
  strasse: string;
  telNr: string;
  telNrVorwahl: string;
  web: string;
}

export interface ClubModel {
  kontaktData: KontaktData;
  vereinId: number;
  vereinsname: string;
  vereinsnummer: string;
}

export interface InvitationData {
  dataProtectionAccepted: boolean;
  dateOfBirth: string;
  email: string;
  emailParent: string;
  firstName: string;
  firstNameParent: string;
  gender: number;
  lastName: string;
  lastNameParent: string;
  nationality: LabelValue;
  nationality2: LabelValue;
  reqistrationId: number;
  underage: boolean;
}

export interface RegistrationData {
  permanentStoringArchiveData: boolean;
  publishScouting: boolean;
  pwd1: string;
  pwd2: string;
  username: string;
}

export interface PlayerRegistrationStep1Form {
  captcha: Captcha;
  club: ClubModel;
  emailToConfirm: string;
  invitationData: InvitationData;
  nationalityList: IdLabel[];
  registrationStatus: string;
  registrationType: string;
  sigendData: any;
}

export interface PlayerRegistrationStep2Form<T = any> {
  captcha: Captcha;
  club: ClubModel;
  invitationData: InvitationData;
  registrationData: RegistrationData;
  registrationStatus: string;
  registrationType: string;
  sigendData: any;
  userExists: boolean;
  useraccountId: number;
}

export interface InvitationForm {
  captcha: Captcha;
  invitationData: InvitationData;
}

export interface InvitationSelfForm {
  captcha: Captcha;
  clubNumber: string;
  dateOfUse: string;
  invitationData: InvitationData;
  nationalityList: IdLabel[];
  taId: string;
}

export interface InvitationReactivateForm {
  captcha: Captcha;
  invitationData: InvitationData;
  taId: string;
}

export interface SearchClubMetadata {
  akjList: IdLabel[];
  eList: IdLabel[];
  gList: IdLabel[];
}

export interface SearchClubFilter {
  akjIdList: number[];
  eIdList: number[];
  gIdList: number[];
  plz: string;
  startAtIndex: number;
  umkreis: number;
}

export interface SearchClubResponseData {
  clubs: ClubModel[];
  totalCount: number;
  hasMore: boolean;
}

export interface ClubMatches {
  club: ClubModel;
  matches: MatchModel[];
}

export interface OfferContact {
  email: string;
  mobilnr: string;
  name: string;
  telefonnr: string;
  web: string;
}

export interface ClubOffer {
  akj: IdLabel;
  club: ClubModel;
  contact: OfferContact;
  experience: IdLabel;
  gender: IdLabel;
  plz: string;
}

export interface Spieltag {
  id: number;
  name: string;
  isActual: boolean;
}

export interface CompetitionDesc {
  actualMatchDay: Spieltag;
  akName: string;
  bezirkName: string;
  bezirknr: string;
  crossTableExists: boolean;
  geschlecht: string;
  geschlechtId: number;
  kreisname: string;
  kreisnr: string;
  ligaId: number;
  liganame: string;
  liganr: string;
  seasonId: number;
  seasonName: string;
  skEbeneId: number;
  skEbeneName: string;
  skName: string;
  skNameSmall: string;
  statisticType: string;
  tableExists: boolean;
  verbandId: number;
  verbandName: string;
  vorabliga: boolean;
}

export interface CompetitionModel {
  competition: CompetitionDesc;
  matches?: MatchModel[];
  table?: TableEntry[];
  crossTable?: CrossTableEntry[];
  teamStatistics?: TeamStatistic[];
}

export interface TableEntry {
  position: number;
  team: TeamModel;
  games: number;
  wins: number;
  losses: number;
  points: number;
  basketsFor: number;
  basketsAgainst: number;
  difference: number;
}

export interface CrossTableEntry {
  homeTeam: TeamModel;
  awayTeam: TeamModel;
  result: string;
}

export interface TeamStatistic {
  team: TeamModel;
  games: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
}

export interface TeamModel {
  id: number;
  name: string;
  club: ClubModel;
  season: string;
}

export interface MatchModel {
  id: number;
  homeTeam: TeamModel;
  awayTeam: TeamModel;
  competition: CompetitionDesc;
  matchDate: string;
  matchTime: string;
  location: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  matchDay?: number;
  referee?: string;
  spectators?: number;
  boxscore?: BoxScore;
  playByPlay?: PlayByPlayEntry[];
}

export interface BoxScore {
  homeTeam: TeamBoxScore;
  awayTeam: TeamBoxScore;
}

export interface TeamBoxScore {
  team: TeamModel;
  players: PlayerBoxScore[];
  teamStats: TeamStats;
}

export interface PlayerBoxScore {
  playerId: number;
  name: string;
  position: string;
  minutes: number;
  points: number;
  fieldGoals: string;
  threePointers: string;
  freeThrows: string;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
}

export interface TeamStats {
  points: number;
  fieldGoals: string;
  threePointers: string;
  freeThrows: string;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
}

export interface PlayByPlayEntry {
  time: string;
  quarter: number;
  team: 'home' | 'away';
  player?: string;
  action: string;
  points?: number;
}

export interface TeamMatches {
  team: TeamModel;
  matches: MatchModel[];
}

export interface SearchMatchFilter {
  akGruppeIdList: number[];
  fromDate: Date | string;
  gIdList: number[];
  spielfeldPlz: string;
  spielfeldUmkreis: number;
  startAtIndex: number;
  toDate: Date | string;
}

export interface SearchMatchResponseData {
  matches: MatchModel[];
  totalCount: number;
  hasMore: boolean;
}

export interface LoginModel {
  userId?: number;
  username?: string;
  roles?: string[];
  permissions?: string[];
  isLoggedIn: boolean;
}

export interface AkgGeschlecht {
  akg: string;
  geschlecht: string;
  hits: number;
  id: string;
}

export interface Wam {
  akgGeschlechtIds: string[];
  altersklasseIds: number[];
  gebietIds: number[];
  ligatypIds: number[];
  sortBy: number;
  spielklasseIds: number[];
  token: string;
  verbandIds: number[];
}

export interface WamResponseData {
  competitions: CompetitionDesc[];
  totalCount: number;
  hasMore: boolean;
}

export interface LigaList {
  competitions: CompetitionDesc[];
  metadata: {
    totalCount: number;
    hasMore: boolean;
  };
} 