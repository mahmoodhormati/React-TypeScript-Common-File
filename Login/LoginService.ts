import { LoginCommand, LoginResponse, RefreshToken, VerificationCommand, VerificationResponse } from "../../Model/Login/LoginModel";
import { ApiConfiguration } from "../../Services/HttpClient/Configuration/ApiConfiguration";
import HttpClient, { IHttpClient } from "../../Services/HttpClient/HttpClient";

export class LoginService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration();
        this.httpClient = new HttpClient(this.httpConfig);

    }



    async Login(
        params: LoginCommand
      ): Promise<LoginResponse | undefined> {
        return await this.httpClient.post("/User/Login", params);
      }


      async Verify(
        params: VerificationCommand
      ): Promise<VerificationResponse | undefined> {
        return await this.httpClient.post("/User/Verify", params);
      }
      async RefreshToken(
        params: RefreshToken
      ): Promise<RefreshToken | undefined> {
        return await this.httpClient.post("/User/Refresh", params);
      }
}