import { BkiSpsQuery, SyncShippingBkiSps, SyncShippingBkiSpsCommand } from './../../Model/Bkisps/BkispsModel';
import { ApiConfiguration } from "../HttpClient/Configuration/ApiConfiguration";
import HttpClient, { IHttpClient } from "../HttpClient/HttpClient";
import { GetItemFromLocalStorage } from "../Storage/LocalStorage/LocalStorageService";
import { CustomerRReports, CustomerRReportsResponse } from '../../Model/Report/ReportsModel';
import { Address } from '../../Model/Address/AddressModel';

export class OutScopeService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration(GetItemFromLocalStorage('token') !== null ? String(GetItemFromLocalStorage('token')) : undefined);
        this.httpClient = new HttpClient(this.httpConfig);

    }

   


    async GetBazargahKharidList(params:BkiSpsQuery): Promise<{bazarGahKharidList:Array<any>} | undefined> {

        return await this.httpClient.get<{bazarGahKharidList:Array<any>}>(
            `/OutScope/GetBazargahKharidList`, params
        );




    }
    
    async GetOutScopeShippingReportsFromImportedExcelFile(params:{filePath:string}): Promise<{reports:Array<CustomerRReports>} | undefined> {

        return await this.httpClient.get<{reports:Array<CustomerRReports>}>(
            `/OutScope/GetOutScopeShippingReportsFromImportedExcelFile`, params
        );




    }

    async SyncShippingReportsWithBazargahCommand (params:{reports:Array<CustomerRReports>}) :Promise<{result:Array<CustomerRReportsResponse>}|undefined>{


        return await this.httpClient.post('/OutScope/SyncShippingReportsWithBazargahCommand',params)
    }

    async SyncShippingsWithBazargah(params:SyncShippingBkiSpsCommand): Promise<{syncResult:Array<SyncShippingBkiSps>} | undefined> {

        return await this.httpClient.post(
            `/OutScope/SyncShippingsWithBazargah`, params
        );




    }

    async GetAddressWithPostalCode(params:{PostalCode:string}): Promise<{address:Address} | undefined> {

        return await this.httpClient.get<{address:Address}>(
            `/OutScope/GetAddressWithPostalCode`, params
        );




    }
}