export interface FloatiingLabel{
Label:string
Value?:string|number|null
Onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
Type:string,
InputMode:InputModeTypes,
OnInput?:string,
IsDisable?:boolean,
isTransible?:boolean,
inputGroupText?:string
}

export enum InputModeTypes{
   search= "search" ,
   text= "text" ,
   email= "email" ,
   tel= "tel" ,
   url= "url",
    none= "none" ,
    numeric= "numeric", 
    decimal= "decimal",
}


export interface PasswordInputProps{
    Label:string
    Value?:string|number
    Onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   
    OnInput?:string
    }


    export interface FloatiingChipsLabel{
        Label:string
        Chips:Array<any>,
        SetChips:React.Dispatch<React.SetStateAction<any>>,
     
        
        OnInput?:string,
        IsDisable?:boolean
        }
        