import { useRef, useState,useEffect } from "react"
import { PageSize } from "./PageSizeModel"
import { useTranslation } from 'react-i18next'


const PageSizeTable = ({setPageSize , pageSize , getDataBySearch }:PageSize) => {
    const{t}=useTranslation()
    const dataLoaded = useRef(false)
        const[changedPage,setchangedPage]=useState<string|number|undefined>(pageSize)
    const handelchange=async(e:React.ChangeEvent<HTMLSelectElement>)=>{
    
    setPageSize((prev:any)=>({...prev, PageSize:e.target.value}))
    setchangedPage(e.target.value)
    dataLoaded.current = true
    
    }
    
    useEffect(()=>{
        
        
      if(changedPage && dataLoaded.current===true){
        getDataBySearch()
      }
    
    
    },[changedPage])
    
      return( <div className=''>
          <span className=" " style={{fontSize: 'smaller'}}> {t('pageSize')} : </span>
          <select
              // style={{height:'20px'}}
              id='pageSize'
              className='btn m-1  non-hover  bg-transparent shadow-none   p-0 '
              value={pageSize}
              onChange={handelchange}
              
          >
              {[10, 25, 50, 100].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                      {pageSize}
                  </option>
    
              ))}
          </select>
      </div>)
    }
    export default PageSizeTable