import { useState, useEffect, useRef, Fragment } from 'react'
import { SliderProps } from "../SliderProps"
import { Attachment, AttachmentQuery } from '../../../Model/Attachment/AttachmentModel'
import { EntityTypes } from '../../../Enum/EntityTypeEnum'
import { Link } from 'react-router-dom'
import { configure } from '../../../Services/HttpClient/GlobalUrl'
import { HomeService } from '../../../../Landing/Home/HomeServices'
import './RightSlider.scss'
import { getelemntHeight, getelemntWidth } from '../../../Utils/GetSizeOfElemetn'
const RightSideBanner = ({ time, height, data }: SliderProps) => {
    const [current, SetCurrent] = useState(0)
    const autoPlayRef = useRef<any>()

    const length = data.componentDetails?.length

    const nextSlide = () => {
        if (length)
            SetCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        if (length)
            SetCurrent(current === 0 ? length - 1 : current - 1)
    }

    const [images, SetImages] = useState<boolean>(false)


    const GetSlideAttachments = () => {

        SetImages(true)
    }






    useEffect(() => {

        autoPlayRef.current = nextSlide

    })

    useEffect(() => {

        setTimeout(() => {
            GetSlideAttachments()
        }, data.rowNumber! * 2000);
        const play = () => {
            autoPlayRef.current()
        }

        const interval = setInterval(play, time * 1000)
        return () => clearInterval(interval)
    }, [])



    return (
        <div id={`CMP${data.id}`} className=' row radiusss mt-5 mb-5 ' style={{ height: `${height}vh`, minHeight: '45vh' }} >
            <div className='sliderRight col-12' >

                {data.componentDetails?.map((item, index) => {


                    return (

                        <div className={index === current ? 'slide active ' : 'slide '} key={index} id={`CMPD${item.id}`}>
                            {index === current && (



                                <div className={images ? 'sliderRightContainer ' : 'sliderRightContainer  sliderRightContainerWithoutImage'} style={{ backgroundImage: images === true && data.componentDetails && item.attachments ? `url(${configure}/Global/GetFile/${item?.attachments[0]?.path}?w=${getelemntWidth(`CMPD${data.componentDetails[0].id}`)}&h=${getelemntHeight(`CMPD${data.componentDetails[0].id}`)})` : '' }} >


                                </div>



                            )}
                        </div>
                    )
                })}




                <div className='afterSliderRight text-center d-flex flex-column justify-content-around col-6'>



                    {data.componentDetails?.map((item, index) => {

                        return (
                            <Fragment key={index}  >
                                {index === current && (
                                    <>
                                        <div >
                                            <h3 className='text-center'>{item?.title}</h3>
                                        </div>

                                        <p className=' desc text-center mt-1 mb-3'>
                                            {item?.description}
                                        </p>
                                        <div className='text-center'>
                                            {item.hasButton ? <button className='btn btn-success '><Link to={item?.buttonLink!}>{item.buttonName}</Link></button> : ''}
                                        </div>
                                    </>
                                )}
                            </Fragment>
                        )
                    })}


                </div>


            </div>
        </div>

    )
}

export default RightSideBanner