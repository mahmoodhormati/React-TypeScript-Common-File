
import {useState,useEffect} from'react'
import { LandigCoponentProps } from './LandigComponentProps'
import './LandigComponent.scss'
import { Attachment, AttachmentQuery } from '../../../Model/Attachment/AttachmentModel'
import { HomeService } from '../../../../Landing/Home/HomeServices'
import { EntityTypes } from '../../../Enum/EntityTypeEnum'
import { ComponentDetail } from '../../../Model/Component/ComponentModel'
import { configure } from '../../../Services/HttpClient/GlobalUrl'
import { getelemntHeight, getelemntWidth } from '../../../Utils/GetSizeOfElemetn'
const ContainerTypeC = ({height,data}:LandigCoponentProps) => {


    const [images, SetImages] = useState<boolean>(false)


    const GetSlideAttachments =  () => {
        
SetImages(true)
    }



    useEffect(() => {

        setTimeout(() => {
            GetSlideAttachments()
        }, data.rowNumber! * 2000);


    }, [data])


    return (
        <div id={`CMP${data.id}`}  className='  rounded mt-4 mb-4' style={{ height: `${height}vh` ,minHeight:'45vh'}}>
      <div className='row col-12 '>
      <h3 className='col-12'>{data.showName?data.name:''}</h3>
          <p className='col-12'>{data.showDescription?data.description:''}</p>

      </div>
        <div className='  row p-2  'style={{height:`70%`}}>


            <div className=' col-4  '>
                <div  id={`${data.componentDetails && data.componentDetails[0]?`CMPD${data.componentDetails[0]?.id}`:''}`}  className=' defaultBakground  defaultHeight2Col shadow myhoverStyle'
                
                style={{ backgroundImage: images===true && data.componentDetails && data.componentDetails[0]?.attachments ? `url(${configure}/Global/GetFile/${ data?.componentDetails[0]?.attachments[0]?.path }?w=${getelemntWidth(`CMPD${data.componentDetails[0]?.id}`)}&h=${getelemntHeight(`CMPD${data.componentDetails[0]?.id}`)})` : '' }}>

                </div>
                <div  id={`${data.componentDetails && data.componentDetails[1]?`CMPD${data.componentDetails[1]?.id}`:''}`}   className=' defaultBakground mt-1 defaultHeight2Col shadow myhoverStyle'
                         style={{ backgroundImage: images===true && data.componentDetails && data.componentDetails[1]?.attachments ? `url(${configure}/Global/GetFile/${ data?.componentDetails[1]?.attachments[0]?.path }?w=${getelemntWidth(`CMPD${data.componentDetails[1]?.id}`)}&h=${getelemntHeight(`CMPD${data.componentDetails[1]?.id}`)})` : '' }}>

                         </div>
            </div>

            <div className='col-4'>
                <div  id={`${data.componentDetails && data.componentDetails[2]?`CMPD${data.componentDetails[2]?.id}`:''}`}  className=' defaultBakground defaultHeight2Col shadow myhoverStyle'
                        style={{ backgroundImage: images===true && data.componentDetails && data.componentDetails[2]?.attachments ? `url(${configure}/Global/GetFile/${ data?.componentDetails[2]?.attachments[0]?.path }?w=${getelemntWidth(`CMPD${data.componentDetails[2]?.id}`)}&h=${getelemntHeight(`CMPD${data.componentDetails[2]?.id}`)})` : '' }}>
                        </div>
                <div  id={`${data.componentDetails && data.componentDetails[3]?`CMPD${data.componentDetails[3].id}`:''}`}   className=' defaultBakground defaultHeight2Col mt-1 shadow myhoverStyle'
                         style={{ backgroundImage: images===true && data.componentDetails && data.componentDetails[3]?.attachments ? `url(${configure}/Global/GetFile/${ data?.componentDetails[3]?.attachments[0]?.path }?w=${getelemntWidth(`CMPD${data.componentDetails[3]?.id}`)}&h=${getelemntHeight(`CMPD${data.componentDetails[3]?.id}`)})` : '' }}>
                         </div>
            </div>
            <div className='col-4 defaultHeight1Col '>

            <div  id={`${data.componentDetails && data.componentDetails[4]?`CMPD${data.componentDetails[4]?.id}`:''}`}   className='col-12 defaultBakground defaultHeight1Col shadow myhoverStyle'
                     style={{ backgroundImage: images===true && data.componentDetails && data.componentDetails[4]?.attachments ? `url(${configure}/Global/GetFile/${ data?.componentDetails[4]?.attachments[0]?.path }?w=${getelemntWidth(`CMPD${data.componentDetails[4]?.id}`)}&h=${getelemntHeight(`CMPD${data.componentDetails[4]?.id}`)})` : '' }}>

               
</div>
            </div>
        </div>
        </div>
    )
  
}

export default ContainerTypeC