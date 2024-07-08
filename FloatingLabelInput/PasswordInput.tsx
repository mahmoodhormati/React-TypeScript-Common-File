import { useState } from "react";
import { PasswordInputProps } from "./FloatingLabelProps";
import './FloatingLable.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'



function PasswordInput({ Label, Value, Onchange }: PasswordInputProps) {

    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = (e: any) => {
        e.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <div className="FloatingLabelComponent did-floating-label-content">
            <input className="did-floating-input" type={passwordType} value={Value} placeholder=" "

                autoComplete='new-password'

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    Onchange !== undefined && Onchange(e)
                }

                } />


            <label className="did-floating-label">{Label}

            </label>

            {passwordType === 'password' ? <AiOutlineEye onClick={togglePassword} size={'1.2rem'} id="togglePassword" className='field-icon' /> : <AiOutlineEyeInvisible onClick={togglePassword} size={'1.2rem'} id="togglePassword" className='field-icon' />}

        </div>
    )
}

export default PasswordInput