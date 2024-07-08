import { Attachment } from "../../Model/Attachment/AttachmentModel";

export interface ImageUploaderWithPreviewProps{
    file:any,
    setFile:React.Dispatch<React.SetStateAction<any>>,
    entityTypeId?:number,
    entityId?:number,
    update?:()=>void,
    urlFromServer?:Attachment,
   
}