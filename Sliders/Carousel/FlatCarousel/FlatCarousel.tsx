import { useEffect } from 'react'
import { FlatCarouselProps } from './FlatCarouselProps'
import { configure } from '../../../../Services/HttpClient/GlobalUrl'
import './FlatCarousel.scss'

const FlatCarousel = ({ Title, Items }: FlatCarouselProps) => {
    useEffect(() => {
        const script = document.createElement("script");
        const scriptText = document.createTextNode(`
        $(document).ready(function(){
            $('.customer-logos').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1500,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 3
                    }
                }]
            });
        });`);

        script.appendChild(scriptText);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className="col-lg-12 col-md-12 col-sm-12">
            {Title && <h2>{Title}</h2>}
            <section id='customer' className="customer-logos slider ">
                {/* {Items.map(item => (
    <div className="slide"><img src={`${configure}/Global/GetFile/${item?.path}?w=30&h=30`}  /></div>
))} */}
                <div className="slide"><img src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg" /></div>
                <div className="slide"><img src="https://image.freepik.com/free-vector/3d-box-logo_1103-876.jpg" /></div>
                <div className="slide"><img src="https://image.freepik.com/free-vector/blue-tech-logo_1103-822.jpg" /></div>
                <div className="slide"><img src="https://image.freepik.com/free-vector/colors-curl-logo-template_23-2147536125.jpg" /></div>
                <div className="slide"><img src="https://image.freepik.com/free-vector/abstract-cross-logo_23-2147536124.jpg" /></div>
                <div className="slide"><img src="https://image.freepik.com/free-vector/football-logo-background_1195-244.jpg" /></div>
                <div className="slide"><img src="https://image.freepik.com/free-vector/background-of-spots-halftone_1035-3847.jpg" /></div>
            </section>
        </div>
    )
}

export default FlatCarousel