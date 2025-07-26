import { HttpClient } from '../http/HttpClient';
import { 
  ValidableResponse, 
  PlayerRegistrationStep1Form, 
  PlayerRegistrationStep2Form,
  InvitationForm,
  InvitationSelfForm,
  InvitationReactivateForm,
  Response
} from '../types';

export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  async dispatch(data: string, keyId: number, signature: string): Promise<void> {
    await this.httpClient.get(`/register-player/disp/${data}/${keyId}/${signature}`);
  }

  async getRegistrationInfo(params: {
    type: string;
    registrationId: number;
    signature: string;
  }): Promise<Response<ValidableResponse<PlayerRegistrationStep2Form>>> {
    const response = await this.httpClient.get(`/register-player/info/${params.type}/${params.registrationId}/${params.signature}`);
    return response;
  }

  async registerPlayerStep2Init(data: string, keyId: number, signature: string): Promise<ValidableResponse<PlayerRegistrationStep2Form>> {
    const response = await this.httpClient.get(`/register-player/register/step2/init/${data}/${keyId}/${signature}`);
    return response.data;
  }

  async registerPlayerStep2NewRegist(form: PlayerRegistrationStep2Form): Promise<ValidableResponse<PlayerRegistrationStep2Form>> {
    const response = await this.httpClient.post('/register-player/register/step2/newRegist', form);
    return response.data;
  }

  async registerPlayerStep2ChangeClub(form: PlayerRegistrationStep2Form): Promise<ValidableResponse<PlayerRegistrationStep2Form>> {
    const response = await this.httpClient.post('/register-player/register/step2/changeClub', form);
    return response.data;
  }

  async registerPlayerStep2Reactivate(form: PlayerRegistrationStep2Form): Promise<ValidableResponse<PlayerRegistrationStep2Form>> {
    const response = await this.httpClient.post('/register-player/register/step2/reactivate', form);
    return response.data;
  }

  async registerPlayerStep2SelfRegister(form: PlayerRegistrationStep2Form): Promise<ValidableResponse<PlayerRegistrationStep2Form>> {
    const response = await this.httpClient.post('/register-player/register/step2/selfregister', form);
    return response.data;
  }

  async invitePlayerInit(): Promise<InvitationForm> {
    const response = await this.httpClient.get('/register-player/invite/init');
    return response.data;
  }

  async invitePlayer(form: InvitationForm): Promise<ValidableResponse<InvitationForm>> {
    const response = await this.httpClient.post('/register-player/invite', form);
    return response.data;
  }

  async invitePlayerSelfInit(): Promise<InvitationSelfForm> {
    const response = await this.httpClient.get('/register-player/selfregister/init');
    return response.data;
  }

  async invitePlayerSelf(form: InvitationSelfForm): Promise<ValidableResponse<InvitationSelfForm>> {
    const response = await this.httpClient.post('/register-player/selfregister', form);
    return response.data;
  }

  async registerPlayerInit(data: string, keyId: number, signature: string): Promise<ValidableResponse<PlayerRegistrationStep1Form>> {
    const response = await this.httpClient.get(`/register-player/register/init/${data}/${keyId}/${signature}`);
    return response.data;
  }

  async registerPlayerCancelInit(data: string, keyId: number, signature: string): Promise<ValidableResponse<PlayerRegistrationStep1Form>> {
    const response = await this.httpClient.get(`/register-player/cancel/init/${data}/${keyId}/${signature}`);
    return response.data;
  }

  async registerPlayer(form: PlayerRegistrationStep1Form): Promise<ValidableResponse<PlayerRegistrationStep1Form>> {
    const response = await this.httpClient.post('/register-player/register', form);
    return response.data;
  }

  async registerPlayerCancel(form: PlayerRegistrationStep1Form): Promise<ValidableResponse<PlayerRegistrationStep1Form>> {
    const response = await this.httpClient.post('/register-player/cancel', form);
    return response.data;
  }

  async invitePlayerInitTNA(tna: number): Promise<InvitationReactivateForm> {
    const response = await this.httpClient.get(`/register-player/invite/init/${tna}`);
    return response.data;
  }

  async reinvitePlayerInitByRegistrationId(registrationId: number): Promise<InvitationForm> {
    const response = await this.httpClient.get(`/register-player/reinvite/init/${registrationId}`);
    return response.data;
  }

  async invitePlayerTNA(form: InvitationReactivateForm): Promise<ValidableResponse<InvitationReactivateForm>> {
    const response = await this.httpClient.post('/register-player/inviteTNA', form);
    return response.data;
  }
} 