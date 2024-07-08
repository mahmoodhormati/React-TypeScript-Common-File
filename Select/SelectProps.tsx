export interface SelectProps{

    Multi?:boolean,
    Name?:string,
    PlaceHolder:string,
    Value:any,
    Option:valueOfSelect[]|GroupvalueOfSelect[],
    HandelChange:(option:Object)=>void
    IsGrouping?:boolean,
    IsDisabel?:boolean,
    minHeight?:number



}


export interface valueOfSelect{
    label?:string,
    value:string | number|boolean|undefined|null
}

export interface GroupvalueOfSelect{
    label:string,
    option:valueOfSelect[]
}