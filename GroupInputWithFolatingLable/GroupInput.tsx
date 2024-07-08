import React from 'react'
import { FloatiingLabel } from '../FloatingLabelInput/FloatingLabelProps'

function GroupInput({Label,Value,Onchange,Type,InputMode,IsDisable,isTransible,inputGroupText}: FloatiingLabel) {
    return (
      <div className="FloatingLabelComponent did-floating-label-content input-group rounded ">
  
      {isTransible?<input className="did-floating-input" type={Type} value={Value?Value:''} disabled={IsDisable} placeholder=" "   id="totalAmt" step="0.1"
      
      
      
      inputMode={InputMode} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          Onchange!==undefined && Onchange(e)}
          
          }/>:<input className="did-floating-input " type={Type} value={Value?Value:''} disabled={IsDisable} placeholder=" "   
      
      
      
          inputMode={InputMode} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              Onchange!==undefined && Onchange(e)}
              
              }/>}
      <div className="input-group-append "><span className="input-group-text"></span>{inputGroupText!}</div>

      <label className="did-floating-label">{Label}</label>
    </div>
    )
  }
  
  export default GroupInput