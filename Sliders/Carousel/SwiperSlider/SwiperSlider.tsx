import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Autoplay } from 'swiper/modules'

interface Props {

    children: React.ReactElement
}
const SwiperSlider = ({ children, ...rest }: Props) => {


    const { props } = children

    return (
        <Swiper modules={[Autoplay]} effect='coverflow' autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true

        }}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: 1,
            }} slidesPerView={4}  >

            {children && props.children.length >= 1 ? <SwiperSlide >
                {props.children.slice(0,  props.children.length ).map((i: any) => i)}


            </SwiperSlide> : null}

        </Swiper>
    )
}

export default SwiperSlider