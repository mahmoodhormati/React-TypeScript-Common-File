import React from 'react'
import {useTranslation} from 'react-i18next'
import './DropDownButton.scss'
import { DropDownButtonProps } from './DropDownButtonProps'

const DropDownButton = ({children,props}:React.PropsWithChildren<{props:DropDownButtonProps}>) => {
    const{t:translate}=useTranslation()
    return (
        <div className='buttonDrowpdown ' >
            <button className="btn btn-outline-azure dropdown-toggle align-text-top " disabled={props.isDisable && props.isDisable===true} data-bs-boundary="viewport" data-bs-toggle="dropdown" aria-expanded="false">{translate('operation')}</button>
            <div className="dropdown-menu dropdown-menu-end">
                {children}
            </div>


        </div>
    )
}

export default DropDownButton