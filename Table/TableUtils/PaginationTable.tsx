import { useEffect, useRef } from "react";
import './PaginationTable.scss'
import { Pagination } from "./PaginationModel";
import { useTranslation } from 'react-i18next'

const PaginationTable = ({ pageNumber, setPageNumber, getDataBySearch, pageSize, totalResult }: Pagination) => {
    const dataLoaded = useRef(false)
    const { t } = useTranslation()

    const nextPageHandler = async () => {
        if (setPageNumber) {
            setPageNumber((prev: any) => ({ ...prev, PageNumber: Number(pageNumber) + 1 }))
            dataLoaded.current = true
        }
    }
    const endPageHandler = async () => {
        if (totalResult && pageSize && setPageNumber) {
            if (totalResult % pageSize === 0) {
                setPageNumber((prev: any) => ({ ...prev, PageNumber: Math.floor(totalResult / pageSize) - 1 }))
            }
            else {
                setPageNumber((prev: any) => ({ ...prev, PageNumber: Math.floor(totalResult / pageSize) }))

            }
            dataLoaded.current = true
        }
    }
    const backPageHandler = async () => {
        if (setPageNumber && pageNumber) {
            if (pageNumber > 0) {
                setPageNumber((prev: any) => ({ ...prev, PageNumber: Number(pageNumber) - 1 }))
                dataLoaded.current = true
            }
        }


    }
    const firstPageHandler = async () => {
        if (setPageNumber) {
            setPageNumber((prev: any) => ({ ...prev, PageNumber: 0 }))

            dataLoaded.current = true
        }

    }
    useEffect(() => {
        if (dataLoaded.current === true ) {
            getDataBySearch()
        }
    }, [dataLoaded, pageNumber])



    if (pageSize !== undefined && pageNumber !== undefined && totalResult !== undefined)
        return (
            <div className='text-center'>


                <button className='  Pagination  btn btn-outline-secondary   m-1' title={`${t('first')} ${t('page')}`} onClick={firstPageHandler}
                    disabled={pageNumber === 0 ? true : false}      >      {'<<'}
                </button>
                <button className='    Pagination btn btn-outline-secondary   m-1' title={`${t('back')} ${t('page')}`} onClick={backPageHandler}
                    disabled={pageNumber === 0 ? true : false}   >      {'<'}
                </button>
                <span className="mt-3">{` ${pageNumber + 1} ${t('from')} ${totalResult % pageSize === 0 ? Math.floor(totalResult / pageSize) : Math.floor(totalResult / pageSize) + 1} `}</span>
                <button className=' Pagination  btn btn-outline-secondary  m-1' title={`${t('next')} ${t('page')}`} onClick={nextPageHandler}
                    disabled={pageNumber === ((totalResult % pageSize) === 0 ? (Math.floor(totalResult / pageSize) - 1) : (Math.floor(totalResult / pageSize))) ? true : false}   > {'>'}
                </button>
                <button className='  Pagination  btn btn-outline-secondary  m-1' title={`${t('last')} ${t('page')}`} onClick={endPageHandler}
                    disabled={pageNumber === ((totalResult % pageSize) === 0 ? (Math.floor(totalResult / pageSize) - 1) : (Math.floor(totalResult / pageSize))) ? true : false}   >   {'>>'}
                </button>


            </div>
        )
}



export default PaginationTable