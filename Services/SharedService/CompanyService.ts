import { CompaniesResponse } from "../../Model/Company/CompnayModel";
import { ApiConfiguration } from "../HttpClient/Configuration/ApiConfiguration";
import HttpClient, { IHttpClient } from "../HttpClient/HttpClient";
import { GetItemFromLocalStorage } from "../Storage/LocalStorage/LocalStorageService";

export class CompanyService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration(GetItemFromLocalStorage('token') !== null ? String(GetItemFromLocalStorage('token')) : undefined);
        this.httpClient = new HttpClient(this.httpConfig);


    }

    async GetChildCompanies(params?: null): Promise<CompaniesResponse | undefined> {

        return await this.httpClient.get<CompaniesResponse>(`/Company/GetChildCompanies`, params)
    }

}