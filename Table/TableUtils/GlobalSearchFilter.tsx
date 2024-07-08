import { Search } from "./SearchModel"
import { useTranslation } from 'react-i18next'


 

const GlobalFilter = ({ filter, setFilter }:Search) => {
  const{t}=useTranslation()

    return (
      <div className='form-group float-right  textOnInput global-filter  Expanded'  >
        <label > {t('search')}</label>
        <input className='form-control opacityForInput' placeholder='&#xF002;' type='text' value={filter}
          onChange={e => setFilter(e.target.value)} />
      </div>
    )
  }
  
  export default GlobalFilter