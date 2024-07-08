import { useState, useEffect } from 'react'
import './FileGallery.scss'
import { FileGalleryProps } from './FileGalleryProps'
import { Attachment } from '../../Model/Attachment/AttachmentModel'
import { configure } from '../../Services/HttpClient/GlobalUrl'



const FileGalleryComponent = ({ attahcment }: FileGalleryProps) => {
    const [AllFiles, SetAllFiles] = useState<Array<Attachment>>()
    const [CurrentFile, SetCurrentFile] = useState<Attachment>()
    const [CurrentIndex, SetCurrentIndex] = useState<number>(0)
    const imageFormat = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'webp']
    const SetDefault = () => {
        if (attahcment) {
            SetAllFiles(attahcment)
            SetCurrentFile(attahcment[0])
        }
    }

    useEffect(() => {

        SetDefault()
    }, [attahcment])


    const changeFileHandler = (item: Attachment, index: number) => {
        
        
        SetCurrentFile(item)
        SetCurrentIndex(index)

    }



    if (attahcment !== null) {


        return (

            <div id='gallery-container'>
                <div className="gallery-img-container">
                    {CurrentFile&&CurrentFile.path && (imageFormat.includes(CurrentFile.extension)) ?
                        <img src={`${configure}/Global/GetFile/${CurrentFile?.path}`} className="gallery-img" alt={CurrentFile.name} /> :
                        <iframe src={`${configure}/Global/GetFile/${CurrentFile?.path}`}  className='gallery-pdf'></iframe>
                    }
                </div>
                <div id="slider-img-container">
                    {AllFiles?.map((item: Attachment, index: number) => {





                        if ( item &&  item.path && imageFormat.includes(item.extension)) {

                            return (<img key={item.id} src={`${configure}/Global/GetFile/${item.path}`} className={[
                                'slider-img',
                                index === CurrentIndex ? 'active' : ''
                            ].join(' ')} alt={item.name} onMouseEnter={(e) => changeFileHandler(item, index)} />)
                        }
                        else {
                            return (
                                <iframe  key={item.id} src={`${configure}/Global/GetFile/${item.path}`}  className='slider-img' onMouseEnter={(e) => changeFileHandler(item, index)}></iframe>

                            )
                        }


                    }
                    )}


                </div>

            </div>

        )
    }

}

export default FileGalleryComponent