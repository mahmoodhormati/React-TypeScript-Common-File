export interface AccordionProps{
    Label:string,
    Id:string,
    Value?:boolean,
    SetValue:React.Dispatch<React.SetStateAction<any>>
}