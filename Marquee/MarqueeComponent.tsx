import { MarqueeProps } from './MarqueProps'
import './Marquee.scss'

const MarqueeComponent = ({text}:MarqueeProps) => {
  return (
    <div className='marquee'>
        <div>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default MarqueeComponent