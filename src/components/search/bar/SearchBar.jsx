import * as React from 'react';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { addDays } from 'date-fns'
import format from 'date-fns/format'

import './index.css'

const DropdownSelect = ({title, min, max ,count, setCount}) => {

    const handlePlus = () => {
        // console.log("Click plus: ", count)
        if (count < max) {
            setCount(count + 1)
        }
    }
    const handleSub = () => {
        if (count > min) {
            setCount(count - 1)
        }
    }
    React.useEffect(() => {
        if (count === min) {
            console.log("min")
        } else if (count === max) {
            console.log("max")
        } else {
            console.log("Null")
        }
    }, [count])
    return(
        <div className='dropdown-search--item'>
            <input id='adults' type='range' min={1} name='peopleNumbers' step={1}/>
            <div>
                <label htmlFor='adults'>{title}</label>
            </div>
            <div className='input-modify'>
                <button className='btn-action--item' onClick={handleSub}>
                    <span className='input--adults'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.25 12.75H3.75a.75.75 0 0 1 0-1.5h16.5a.75.75 0 0 1 0 1.5z"></path></svg>
                        </span>
                    </span>
                </button>
                <span>{count}</span>
                <button className='btn-action--item' onClick={handlePlus}>
                    <span className='input--adults'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.25 11.25h-7.5v-7.5a.75.75 0 0 0-1.5 0v7.5h-7.5a.75.75 0 0 0 0 1.5h7.5v7.5a.75.75 0 0 0 1.5 0v-7.5h7.5a.75.75 0 0 0 0-1.5z"></path></svg>
                        </span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default function SearchBar() {

    const location = React.useRef(null)
    // Reference link: https://github.com/webstylepress/React-Date-Range-Pickers-3-Components-
    // date state
    const [range, setRange] = React.useState([
        {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
        }
    ])
    const [ adults, setAdults ] = React.useState(1)
    const [ rooms, setRooms ] = React.useState(1)
    // open/close
    const [open, setOpen] = React.useState(false)
    // get the target element to toggle 
    const refOne = React.useRef(null)
      // Hide on outside click
    const hideOnClickOutside = (e) => {
        // console.log(refOne.current)
        // console.log(e.target)
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }

    const handleSubmitSearch = () => {
        if ( location.current.value ) {
            console.log(location.current.value)
            console.log("Range: ", range[0].startDate, range[0].endDate)
        }
    }

    React.useEffect(() => {
        // event listeners
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])
    
    return (
        <div className='search-bar-header max-w-screen-lg mx-auto h-60'>
            {/* Where are you going ? */}
            <div className=''>
                <i class="fa fa-bed"></i>
                <input ref={location} className='w-full' type='text' placeholder='Where are you going?'/>
            </div>
            {/* Date picker */}
            <div className='calendarWrap'>
                <i class="fa fa-calendar"></i>
                <input
                    value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
                    readOnly
                    className="inputBox w-full"
                    onClick={ () => setOpen(open => !open) }
                />
                <div ref={refOne} className='absolute top-60'>
                {open &&
                    <DateRange locale={locales['vi']}
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}   
                        direction="horizontal"
                        className="calendarElement" 
                        ranges={range}
                        months={1}
                    />
                    }
                </div>
            </div>
            {/* Count */}
            <div>
                <i class="fa fa-female"></i>
                <input className='inputBox w-full'
                    disabled
                    placeholder={`${adults} adult • rooms ${rooms}`}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{
                    with: '16px',
                    height: '16px'
                }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            {/* Dropdown option for choose people and room*/}
            <div className='dropdown-search'>              
                <DropdownSelect title={"Số người"} max={5} min={1} count={adults} 
                    setCount={setAdults}
                />
                <DropdownSelect title={"Số phòng"} max={30} min={1} count={rooms}
                    setCount={setRooms}
                />
            </div>
            </div>
            {/* Search Button */}
            <button type='button' className='text-white bg-blue-600'
                onClick={handleSubmitSearch}
            >
                <span className='text-white' >Search</span>
            </button>
        </div>
    );
};