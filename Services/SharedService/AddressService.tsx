import { AddressCommand, AddressQuery, AddressResponse, ProvincesResponse } from "../../Model/Address/AddressModel";
import { ApiConfiguration } from "../HttpClient/Configuration/ApiConfiguration";
import HttpClient, { IHttpClient } from "../HttpClient/HttpClient";
import { GetItemFromLocalStorage } from "../Storage/LocalStorage/LocalStorageService";

export class AddressService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration(GetItemFromLocalStorage('token') !== null ? String(GetItemFromLocalStorage('token')) : undefined);
        this.httpClient = new HttpClient(this.httpConfig);


    }

    async GetProvinces(params?: null): Promise<ProvincesResponse | undefined> {

        return await this.httpClient.get<ProvincesResponse>(`/Address/GetProvinces`, params)
    }

    async SetAddress (params:AddressCommand) :Promise<{}|undefined>{


        return await this.httpClient.post('/Address/SetAddress',params)
    }

    
    async GetAddresss(params:AddressQuery ): Promise<AddressResponse | undefined> {

        return await this.httpClient.get<AddressResponse>(`/Address/GetAddresss`, params)
    }


}