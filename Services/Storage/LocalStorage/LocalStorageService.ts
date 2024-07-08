export const GetItemFromLocalStorage=(name:string)=>{

return localStorage.getItem(name)



}



export const SetToLocalStorage=(key:string,value:string)=>{

localStorage.setItem(key,value)


}