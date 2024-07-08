export interface StepInputProps{
    MaxValue:number,
    Value:number,
    SetValue:React.Dispatch<React.SetStateAction<number>>,
    Label:string,
    changeHandeler?:(e:InputEvent)=>void
}