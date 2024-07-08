import { AttachmentDelete, AttachmentQuery, AuthAttachmentResponse, FileUploadResponse } from "../../Model/Attachment/AttachmentModel";
import { UserInfoQuery, UserInfoResponse } from "../../Model/Customer/CustomerModel";
import { ApiConfiguration } from "../HttpClient/Configuration/ApiConfiguration";
import { HttpHeaders } from "../HttpClient/Configuration/RequestConfig";
import HttpClient, { IHttpClient } from "../HttpClient/HttpClient";
import { GetItemFromLocalStorage } from "../Storage/LocalStorage/LocalStorageService";

export class SharedUserService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration(GetItemFromLocalStorage('token') !== null ? String(GetItemFromLocalStorage('token')) : undefined);
        this.httpClient = new HttpClient(this.httpConfig);

    }

     config:HttpHeaders={
        ["Content-Type"]:"multipart/form-data"
    }


    async getAttachments(attachmentquery: AttachmentQuery): Promise<AuthAttachmentResponse | undefined> {

        return await this.httpClient.get<AuthAttachmentResponse>(
            `/Attachment/GetAttachments`, attachmentquery
        );


    }
    async DeleteAttachments(params: AttachmentDelete): Promise<{} | undefined> {

        return await this.httpClient.delete(
            `/Attachment/DeleteAttachments`, params
        );




    }
    async UploadAattachment(params:FormData): Promise<{result:Array<FileUploadResponse>} | undefined> {

       
        return await this.httpClient.post(
            `/Attachment/Upload`, params,{headers:this.config}
               
            
        );




    }


    async GetUserInfo(params: UserInfoQuery | null): Promise<UserInfoResponse | undefined> {
        return await this.httpClient.get<UserInfoResponse>(
            `/AuthenticatedUser/GetUserInfo`, params
        );

    }
    
    async GetUserRoles(params:{UserId:number}): Promise<{userRoleIds:[number]} | undefined> {
        return await this.httpClient.get<{userRoleIds:[number]}>(
            `/AuthenticatedUser/GetUserRoles`, params
        );

    }
}