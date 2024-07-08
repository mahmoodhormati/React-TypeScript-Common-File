import { ProductSupplyConidtion } from "../../Model/ProductSupply/ProductSupplyConditionModel";
import { ProductSupply } from "../../Model/ProductSupply/ProductSupplyModel";

export interface QuantityCartProps{
ProductSupply?:ProductSupply,
Condition?:ProductSupplyConidtion
}

export interface CartProps{
    SetcartLenght:React.Dispatch<React.SetStateAction<number>>,
    Setshow:React.Dispatch<React.SetStateAction<boolean>>,
    show:boolean,
    cartLenght:number


}