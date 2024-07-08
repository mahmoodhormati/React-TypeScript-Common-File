export interface ToastInterface{
    Mode ?: ToastMode;
    Message?: string;
}


export enum ToastMode{
    Success = 1,
    Warning,
    Error
}

