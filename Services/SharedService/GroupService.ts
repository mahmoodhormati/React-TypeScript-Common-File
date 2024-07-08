import { Group, GroupResponse, GroupsQuery } from '../../Model/Group/GroupModel';
import { ApiConfiguration } from '../HttpClient/Configuration/ApiConfiguration';
import { GetItemFromLocalStorage } from '../Storage/LocalStorage/LocalStorageService';
import HttpClient, { IHttpClient } from './../HttpClient/HttpClient';
export class GroupService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration(GetItemFromLocalStorage('token') !== null ? String(GetItemFromLocalStorage('token')) : undefined);
        this.httpClient = new HttpClient(this.httpConfig);


    }

    async GetGroups(params: GroupsQuery): Promise<GroupResponse | undefined> {

        return await this.httpClient.get<GroupResponse>(`/Group/GetGroups`, params)
    }

    async SetGroup (params:{group:Group}) :Promise<{}|undefined>{


        return await this.httpClient.post('/Group/SetGroup',params)
    }

    async GetGroup(params:{Id:number}): Promise<{group:Group} | undefined> {

        return await this.httpClient.get<{group:Group}>(`/Group/GetGroup`, params)
    }

}