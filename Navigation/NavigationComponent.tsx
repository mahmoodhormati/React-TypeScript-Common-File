import { useState, useEffect } from 'react'
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { AllNameAndRoutes, Pophistory, SetHistory, getHistory } from './NavigationService'
import { useAppSelector } from '../../Services/Store/ReduxHooks'
import { useTranslation } from 'react-i18next'
import './Navigation.scss'

import { NavigationNames } from './NavigationProps'

const NavigationComponent = () => {
    const { t: translate } = useTranslation()
    const menu = useAppSelector(state => state.Menu)
    const params = useParams()
    let lang = useAppSelector(state => state.Language)
    let location = useLocation()
    const [previousUrl, SetpreviousUrl] = useState<string>()

    let history = getHistory()

    useEffect(() => {
        gethistory()
    }, [location])







    let headingTag: string | undefined | Array<string> = "";
    let typeId: number | null = null
    let current = location.pathname
    const gethistory = () => {
        let a = getHistory()
        SetpreviousUrl(a[a.length - 1])
    }
    if (current?.startsWith("/"))
        current = location.pathname?.substring(1);

    if (current?.includes("admin"))
        typeId = 2;
    else if (current?.includes("client"))
        typeId = 1;
    else
        typeId = null;

    if (AllNameAndRoutes(menu.menuItems)?.filter((item: NavigationNames) => item.Routes === current.replace("admin/", "").replace("client/", "")).map((item: NavigationNames) => item.EnglishName)[0]) {
        if (lang === 'ir')
            headingTag = AllNameAndRoutes(menu.menuItems)?.filter((item: NavigationNames) => item.Routes === current.replace("admin/", "").replace("client/", "")).map((item: NavigationNames) => item.Name)[0];
        else if (lang === 'eng')
            headingTag = AllNameAndRoutes(menu.menuItems)?.filter((item: NavigationNames) => item.Routes === current.replace("admin/", "").replace("client/", "")).map((item: NavigationNames) => item.EnglishName)[0];
    }
    else {
        headingTag = location.pathname.replace("admin/", "").replace("client/", "").split('/').map((item: any) => `${translate(item)} `)
    }


    const isLast=(index:number)=>{
        return index===location?.pathname?.split('/').filter(i => i !== '').length-1
    }

    let currentLink = '';
   
    
    let regex=/[0-9]/g
    const crumbs = location?.pathname?.replace(regex,'').split('/').filter(i => i !== '' ).map((i,index) => {
        currentLink += `/${i}`

        let Lastest=isLast(index)
        return (


            <li className="breadcrumb-items" >
                {Lastest || i==='orderDetail' ?translate(`${i}`):
                <Link to={currentLink}  key={i}  >{translate(`${i}`)}</Link>}
            </li>
        )
       
    })


    
    


    if (getHistory() && getHistory().length > 1) {
        return (
            <div className='ElementContainerFornavigate'>
                <div className="d-flex justify-content-between px-2 align-items-center">

                    <nav aria-label="breadcrumbs">
                        <ol className="breadcrumbs">{crumbs}</ol>
                    </nav>
                    {previousUrl !== "" ? <NavLink to={`${previousUrl}`} title={`${translate('back')} ${translate('page')}`} onClick={() => Pophistory()} >
                        {lang === 'ir' ? <IoArrowBackCircle size='2rem' /> : <IoArrowForwardCircle size='2rem' />}
                    </NavLink> : ''}



                </div>


            </div>
        )
    }


}

export default NavigationComponent