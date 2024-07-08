
import { AiFillPicture } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { FaCheck } from "react-icons/fa";
import { ImageUploaderWithPreviewProps } from './ImageUploaderProps';
import { ToastInterface, ToastMode } from '../../Services/Toast/ToastProps';
import { useTranslation } from 'react-i18next';
import ToastService from '../../Services/Toast/ToastService';
import './ImageUploader.scss'
import { SharedUserService } from '../../Services/SharedService/SharedUserService';
import { configure } from '../../Services/HttpClient/GlobalUrl';
import ButtonComponent from '../Button/ButtonComponent';
const ImageUploaderWithPreview = ({ file, setFile, entityId, entityTypeId, update, urlFromServer }: ImageUploaderWithPreviewProps) => {
    const { t: translate } = useTranslation()
    const attachmentService = new SharedUserService()
    const uploadFile = () => {
        if (entityId !== undefined && entityTypeId !== undefined && update) {
            
            const formData = new FormData()

            formData.append('Files', file[0][0])
            formData.append('EntityTypeId', `${entityTypeId}`)
            formData.append('EntityId', `${entityId}`)
            formData.append('AttchmentTypeId', '0')
            attachmentService.UploadAattachment(formData).then(res => {
                if (res) {
                    const toast: ToastInterface = {
                        Mode: ToastMode.Success,
                        Message: `${translate('hBadded')}`
                    }
                    ToastService(toast)
                    setFile([])
                    update()

                }
            })
        }
    }

    const DeleteAttachment=(id:number)=>{
        attachmentService.DeleteAttachments({attachmentId:id}).then(res=>{
            if(res && update){
                update()!
            }

        })
    }
    if (urlFromServer && urlFromServer.deleted !== true) {
        return (<div className='row '>
            <span className='text-center'  style={{ backgroundImage: `url(${configure}/Global/GetFile/${urlFromServer?.path}?w=200&h=200) `,backgroundRepeat:'no-repeat' , width: '200px',height:'200px' }}>
            <ButtonComponent Class={["border-0", "bg-transparent", "non-hover",'text-danger']} MyTooltip='delete' Icon='fa-close' Onclick={()=>DeleteAttachment(urlFromServer.id)}  /> 
            </span>
        </div>)
    }
    else {
        return (
            <div className='row'>
                <div className=''>
                    <div className=' text-center'>
                        {file && file?.length > 0 ? file?.map((i: any) => (

                            <img
                                src={URL.createObjectURL(i[0])}
                                className="img-fluid image-hover rounded text-center"
                                style={{ maxHeight: '10rem' }}
                            />



                        ))


                            : ''}

                    </div>
                </div>
                <div className='col-12 text-center mt-4 mb-4'>
                    {file?.length === 0 ? <>


                        <label className='btn btn-outline-warning ' >{translate('uploadImage')}<AiFillPicture /><input type="file" id="upload" accept='image/jpeg, image/png' style={{ visibility: 'hidden', display: 'none' }} onChange={
                            e => {
                                let ext = e.target.files && e.target.files[0].type ? e.target.files[0].type : '';
                                switch (ext) {
                                    case 'image/jpeg':
                                    case 'image/jpg':
                                    case 'image/png':
                                    case 'image/webp':
                                    case 'image/apng':
                                    case 'image/svg+xml':

                                        setFile([e.target.files])

                                        break;

                                    default:
                                        setFile([])
                                        const toast: ToastInterface = {
                                            Mode: ToastMode.Warning,
                                            Message: `${translate('mustBeApicture')}`
                                        }
                                        ToastService(toast)
                                }
                            }

                        } />

                        </label>

                    </>


                        :

                        <div className='text-center'>


                            <button

                                onClick={() => setFile([])}
                                className="border-0 bg-transparent non-hover"
                            >
                                <ImCross size="1rem" color="red" title={translate('delete')} />
                            </button>
                            {entityId !== undefined && entityTypeId !== undefined && <button

                                onClick={uploadFile}
                                className="border-0 bg-transparent non-hover"
                            >
                                <FaCheck size="1rem" color="green" title={translate('submit')} />
                            </button>}
                        </div>}
                </div>

            </div>
        )
    }
}

export default ImageUploaderWithPreview