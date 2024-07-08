import React from 'react'
import { ThreeDSliderProps } from './ThreeDCarouselProps';
import './ThreeDCarousel.scss'
import { Attachment } from '../../../../Model/Attachment/AttachmentModel';
import { configure } from '../../../../Services/HttpClient/GlobalUrl';

const ThreeDCarousel = ({ Items, Length }: ThreeDSliderProps) => {
  const [index, setIndex] = React.useState(0)
  const z = length * 50
  const angle = index / Length * -360;
  const transform = `translateZ(-${z}px) rotateY(${angle}deg)`

  const getTransform = (id: number) => {
    const deg = id * (360 / length)
    return `rotateY(${deg}deg) translateZ(${z}px)`
  }
  return (
    <div className="scene">
      <div className="carousel" style={{ transform }}>
     {Items?.map((item:Attachment) => (
            <img
              alt=""
              key={item.EntityId}
              className={"item"}
              style={{ transform: getTransform(item?.EntityId!) }}
              src={`${configure}/Global/GetFile/${item?.path}?w=300&h=185`}
            />  
          ))} 
     
      </div>

      <div
        className="controls"
        style={{ transform: `translateZ(-${z}px) rotateY(0deg)` }}
      >
        <button
          style={{ transform: getTransform(Length - 1) }}
          onClick={() => setIndex(index - 1)}
        />
        <button
          style={{ transform: getTransform(1) }}
          onClick={() => setIndex(index + 1)}
        />
      </div>
    
    </div>
  )
}

export default ThreeDCarousel