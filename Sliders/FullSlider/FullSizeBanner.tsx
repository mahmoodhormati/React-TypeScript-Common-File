import { useState, useEffect, useRef } from 'react'
import { ComponentDetail } from '../../../Model/Component/ComponentModel'
import { SliderProps } from '../SliderProps'
import { classNames } from "@react-pdf-viewer/core";
import { configure } from '../../../Services/HttpClient/GlobalUrl';
import { Attachment, AttachmentQuery, GlobalAttachment } from '../../../Model/Attachment/AttachmentModel';
import { EntityTypes } from '../../../Enum/EntityTypeEnum';
import './FullSlider.css'
import { HomeService } from '../../../../Landing/Home/HomeServices';
import { getelemntHeight, getelemntWidth } from '../../../Utils/GetSizeOfElemetn';

const FullSizeBanner = ({ time, height, data }: SliderProps) => {
    const [activeSlide, setActiveSlide] = useState(0)

    const [current, SetCurrent] = useState(0)
    const length = data?.componentDetails?.length
    const [sliderReady, setSliderReady] = useState(true)
    const IMAGE_PARTS = 4;


    const [images, SetImages] = useState<boolean>(false)


    const GetSlideAttachments = () => {

        SetImages(true)
    }








    const nextSlide = () => {
        if (length) {
            SetCurrent(current === length - 1 ? 0 : current + 1)
            setActiveSlide(current === length - 1 ? 0 : current + 1)
        }
    }
    const prevSlide = () => {
        if (length) {
            SetCurrent(current === 0 ? length - 1 : current - 1)
            setActiveSlide(current === 0 ? length - 1 : current - 1)
        }
    }

    const autoPlayRef = useRef<any>()

    useEffect(() => {
        autoPlayRef.current = nextSlide


    })
    useEffect(() => {
        setTimeout(() => {
            GetSlideAttachments()
        }, data?.rowNumber ? data.rowNumber * 1000 : 1000);
        const play = () => {
            autoPlayRef.current()
        }






        const interval = setInterval(play, time * 1000)


        return () => {
            clearInterval(interval)
        }
    }, [])





    return (
        <div id={`CMP${data.id}`} className={`${images ? ` slider radiusss   ${classNames({ 's--ready': sliderReady })}` : ` sliderWithoutimage slider  radiusss ${classNames({ 's--ready': sliderReady })}`}`} style={{ height: `${height}vh`, minHeight: '50vh' }}>

            <div className="slider__slides">
                {data?.componentDetails?.map((slide, index) => (
                    <div
                        className={`slider__slide ${classNames({ 's--active': activeSlide === index })}`}
                        key={slide.id}
                        id={`CMPD${slide.id}`}
                    >
                        <div className="slider__slide-content">

                            <h2 className="slider__slide-subheading">
                                {slide.title}
                            </h2>
                            <p className="slider__slide-subheading px-4">{slide.description}</p>
                            {slide.hasButton ? <button className="slider__slide-readmore btn btn-success">{slide.buttonName}</button> : ' '}
                        </div>
                        <div className="slider__slide-parts " >
                            {[...Array(IMAGE_PARTS)].map((x, i) => (
                                <div className="slider__slide-part" key={i} >
                                    <div className="slider__slide-part-inner   " style={{ backgroundImage: images===true && data.componentDetails && slide.attachments ? `url(${configure}/Global/GetFile/${ slide?.attachments[0]?.path }?w=${getelemntWidth(`CMPD${slide.id}`)}&h=${getelemntHeight(`CMPD${slide.id}`)})` : '' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}


export default FullSizeBanner 