import { FloatiingLabel } from "./FloatingLabelProps"
import './FloatingLable.scss'



function InputFloatLabel({Label,Value,Onchange,Type,InputMode,IsDisable,isTransible}: FloatiingLabel) {
  return (
    <div className="FloatingLabelComponent did-floating-label-content">

    {isTransible?<input className="did-floating-input" type={Type} value={Value?Value:''} disabled={IsDisable} placeholder=" "   id="totalAmt" step="0.1"
    
    
    
    inputMode={InputMode} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        Onchange!==undefined && Onchange(e)}
        
        }/>:<input className="did-floating-input" type={Type} value={Value?Value:''} disabled={IsDisable} placeholder=" "   
    
    
    
        inputMode={InputMode} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            Onchange!==undefined && Onchange(e)}
            
            }/>}
    <label className="did-floating-label">{Label}</label>
  </div>
  )
}

export default InputFloatLabel