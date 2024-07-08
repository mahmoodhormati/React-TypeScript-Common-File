import { useState } from "react"
import { LuSearch, LuSearchX } from 'react-icons/lu'
import { AdvancedSearchProps } from "./AdvanceSearchProps"
import { useTranslation } from "react-i18next"
import ButtonComponent from "../Button/ButtonComponent"
interface Props {

    children: React.ReactElement
}
const AdvancedSearch = ({ searchProps, children }: React.PropsWithChildren<{ searchProps: AdvancedSearchProps }>) => {
    const { t: translate } = useTranslation()


    const [show, setShow] = useState(true)


    return (
        <div className={`pt-1 px-2 ${show === false ? 'd-flex justify-content-end ' : ''}`} >
            <section className="mb-2 mt-2">
                <div className="  py-2 " >
                    {children ? <div title="جستجوی پیشرفته" onClick={() => setShow(!show)} className="d-flex justify-content-end  mb-3 " data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                        {show ? <LuSearchX size="1.5rem" /> : <LuSearch size='1.5rem' />}

                    </div> : null}

                    {show ? <div className=' row   ' id="collapseExample" >
                        {children}

                        {searchProps.Search && searchProps.ClearSearch ?
                            <div className=" d-flex justify-content-end ">
                                <div className=" mx-1">
                                    
                                    <ButtonComponent Class={["btn", "btn-outline-danger","p-2"]} MyTooltip='clearSearch' Icon='fa-trash' Onclick={searchProps.ClearSearch}/>
                                </div>
                                <div className="mx-1">
                                <ButtonComponent Class={["btn", "btn-outline-primary",'p-2']} MyTooltip='search' Icon='fa-search' Onclick={searchProps.Search}/>

                                </div>
                            </div> : ''
                        }
                    </div> : ''}






                </div>

            </section>



        </div>


    )
}
export default AdvancedSearch