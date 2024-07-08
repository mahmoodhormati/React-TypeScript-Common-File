
import { ResultModel } from "../../Model/ResultModel";
import ToastService from "../Toast/ToastService";
import { ToastInterface, ToastMode } from "../Toast/ToastProps";
import { RefreshToken } from "../../Model/Login/LoginModel";
import { GetItemFromLocalStorage, SetToLocalStorage } from "../Storage/LocalStorage/LocalStorageService";
import { LoginService } from "../../Components/Login/LoginService";
import axios from "axios";
export const handleServiceError = (error: any) => {

    let toast: ToastInterface;
    let refresh: RefreshToken = {
        token: GetItemFromLocalStorage('token') ? String(GetItemFromLocalStorage('token')) : '',
        refresh: GetItemFromLocalStorage('refresh') ? String(GetItemFromLocalStorage('refresh')) : ''
    }

    let refreshService = new LoginService()

    //set loading 
    let errorData = error.response.data as ResultModel



    if (error.response && error.response.status === 401) {


        refreshService.RefreshToken(refresh).then(result => {

            if (result) {
                SetToLocalStorage('refresh', result.refresh);
                SetToLocalStorage('token', result.token);

                window.location.reload()
            }
            else {
                delete axios.defaults.headers.common["Authorization"];
                window.location.replace('/logout')

            }
        })

    }
    else if (error.response && error.response.status !== 200) {

        if (errorData.error && errorData.error.errorCode >= 400 && errorData.error.errorCode <= 499) {
            toast = {
                Mode: ToastMode.Warning,
                Message: String(errorData.error.message)
            }

            ToastService(toast)


        }
        else if (errorData.error && errorData.error.errorCode === 500) {
            toast = {
                Mode: ToastMode.Warning,
                Message: String(errorData.error.message)
            }

            ToastService(toast);

        }



    }

    if (error.response && error.response.status === 500) {
        toast = {
            Mode: ToastMode.Error,
            Message: String(errorData?.error?.message)
        }

        ToastService(toast);
    }









}