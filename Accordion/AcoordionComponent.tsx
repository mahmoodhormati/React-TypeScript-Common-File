import { AccordionProps } from './AccordionProps'
import './Accordion.scss'

const AcoordionComponent = ({props,children}:React.PropsWithChildren<{props:AccordionProps}>) => {
  return (
    <div className="faq-drawer p-2 accirdionHover ">
      <input className="faq-drawer__trigger " id={props.Id} type="checkbox" checked={props.Value} onChange={(e)=>props.SetValue(e.target.checked)}/><label className="faq-drawer__title mb-4" htmlFor={props.Id}>{props.Label} </label>
      <div className="faq-drawer__content-wrapper">
        <div className="faq-drawer__content">
         {children}
        </div>
      </div>
    </div>
    
  )
}

export default AcoordionComponent