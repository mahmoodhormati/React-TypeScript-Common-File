import { CategoryTreesResponse } from './../../Model/Category/CategoryModel';
import { GetMenuCommand, MenuItemResponse } from "../../Model/Menu/MenuModel";
import { GetItemFromLocalStorage } from "../Storage/LocalStorage/LocalStorageService";
import { ApiConfiguration } from "./Configuration/ApiConfiguration";
import HttpClient, { IHttpClient } from "./HttpClient";

export class GlobalMenuService {

    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration();
        this.httpClient = new HttpClient(this.httpConfig);

    }



    async GetMenu(): Promise<MenuItemResponse | undefined> {

        return await this.httpClient.get<MenuItemResponse>(
            `/Home/GetMenuItems`,null
        );

    }

    
    async GetCategoriesTree(): Promise<CategoryTreesResponse | undefined> {

        return await this.httpClient.get<CategoryTreesResponse>(
            `/Home/GetCategoriesTree`,null
        );

    }




}
export class AuthMenuService{
    
    httpClient: IHttpClient;
    httpConfig: ApiConfiguration;
    constructor() {
        this.httpConfig = new ApiConfiguration(  GetItemFromLocalStorage('token')!==null?String(GetItemFromLocalStorage('token')):undefined);
        this.httpClient = new HttpClient(this.httpConfig);

    }



    async GetMenu(params:GetMenuCommand): Promise<MenuItemResponse | undefined> {

        return await this.httpClient.get<MenuItemResponse>(
            `/AuthenticatedUser/GetMenuItems`,params
        );

    }
}