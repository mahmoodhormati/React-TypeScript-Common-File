import React, { useState } from 'react'
import { FloatiingChipsLabel } from './FloatingLabelProps'
import { TiDelete } from 'react-icons/ti'
import './Chips.scss'
import { useTranslation } from 'react-i18next'

const ChipsInput = ({ Chips, Label, SetChips }: FloatiingChipsLabel) => {
    const [text, setText] = useState("");
    const [validationError, setValidationError] = useState("");
    const { t: translate } = useTranslation()


    function removeChip(chipToRemove: any) {
        // filtering out the chip that the user wants to remove
        const updatedChips = Chips?.filter((chip) => chip !== chipToRemove);
        SetChips(updatedChips);
    }
    function handlePressEnter(e: any) {
        // don't submit the form if the user presses 'Enter'
        if (e.key === "Enter") e.preventDefault();
        // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
        if (e.key !== "Enter" || !text) return;
        // need to show error if the user tries to add the same input more than once
        if (Chips?.includes(text)) {
            return setValidationError(`${translate('chipsvalueError')}`);
        }
        // adding the input value to chips array
        SetChips((prevState: any) => [...prevState, e.target.value]);
        // clearing the input box
        setText("");
        // clearing error message
        setValidationError("");
    }

    return (
        <div className=' FloatingLabelComponent did-floating-label-content'>
            <div className="input-container ">


                <input
                    type="text"
                    className='did-floating-input'
                    id='tags'

                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handlePressEnter}
                />

                <ul className="chips">
                    {Chips?.map((chip) => (
                        <li key={chip} className="chip">
                            <span>{chip}</span>
                            <TiDelete onClick={() => removeChip(chip)} tabIndex="0" />
                        </li>
                    ))}
                </ul>
        

            </div>

            <label className="did-floating-label">{Label}</label>
            {validationError && <p className="text-danger">{validationError}</p>}
        </div>
    )
}

export default ChipsInput