import './index.css'
import * as React from 'react';
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { addDays } from 'date-fns'
import format from 'date-fns/format'

export default function SearchBar() {

    React.useEffect(() => {
        // event listeners
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])
    
    // Reference link: https://github.com/webstylepress/React-Date-Range-Pickers-3-Components-
    // date state
    const [range, setRange] = React.useState([
        {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
        }
    ])
    // open close
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
    return (

        <div className='search-bar-header max-w-screen-lg mx-auto h-60'>
            {/* Where are you going ? */}
            <div className=''>
                <i class="fa fa-bed"></i>
                <input className='w-full' type='text' placeholder='Where are you going?'/>
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
                <input className='inputBox w-full' placeholder='1 adult • 0 children • 1 rom'/>
            </div>

            {/* Search Button */}
            <button type='button' className='text-white bg-blue-600'>
                <a className='text-white' href='/search'>Search</a>
            </button>
        </div>
    );
};