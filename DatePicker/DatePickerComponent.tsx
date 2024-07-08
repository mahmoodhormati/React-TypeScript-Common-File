
import DatePicker,{DateObject} from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { MyDatePickerProps } from './DatePickerProps';
import './DatePicker.scss'

const DatePickerComponent = ({Value,SetValue,Label}:MyDatePickerProps) => {





  return (
    <div className='MyDatePicker'><label className="date-piker-form" >{Label}</label>
    
        <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={new Date(Value!)}
            onChange={SetValue}
        />

    </div>
  )
}

export default DatePickerComponent