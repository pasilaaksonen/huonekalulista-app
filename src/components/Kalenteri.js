import DatePicker from 'react-datepicker'
import  'react-datepicker/dist/react-datepicker.css'

function Kalenteri({ startDate, setStartDate }) {
    return (  
        <div className="date-select">
            Valitse päivä:
            <DatePicker
                minDate={new Date()}
                selected={startDate} 
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
            />
        </div>
    )
}

export default Kalenteri