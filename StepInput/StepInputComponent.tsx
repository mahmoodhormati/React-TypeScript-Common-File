import React from 'react'
import { StepInputProps } from './StepInputProps'
import { formatter } from '../../../../../AfraHolding/src/Utils/Formatter'

const StepInputComponent = ({Label,MaxValue,SetValue,Value,changeHandeler}:StepInputProps) => {
    return (
        <div className="card-body p-0 stepInput " >

            <div className="form text-center ">

                <div
                    className="form-group mb-4  labelOnDiv col-lg-12 rounded border    mt-4  "
                    
                >
                    <label>{Label}</label>

                    <div className='m-3 d-flex justify-content-center'>
                        
                        <input className=' mx-2' value={formatter.format(Value)} max={MaxValue} onChange={e => SetValue(Number((e.target.value).replaceAll(",", "")))}></input>
                        0
                        
                      
                        <input type='range'  className='mx-2' value={Value} step={500} min={0} max={MaxValue} onChange={e => {SetValue(Number(e.target.value))
                            changeHandeler && changeHandeler
                        }} />
                        {MaxValue}
                        
                    </div>
                </div>










            </div>


        </div>
    )
}

export default StepInputComponent