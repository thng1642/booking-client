import Result from "../../components/search/result/Result.jsx";
import * as React from 'react';
import { results } from "./data.js";
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './index.css'

import { addDays } from 'date-fns'
import format from 'date-fns/format'
import { useLocation } from "react-router-dom";

const Search = () => {

  const location = useLocation()
  const state = location.state

  // console.log("Data result search: ", state)
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
    // main search
    <section className="max-w-screen-lg mx-auto main-search">
      {/* Filter bar */}
      <div className="px-8 filter-bar">
        <h3 className="mb-16">Search</h3>

        <div className="mb-12">
          <p className="text-sm">Destination</p>
          <input className="h-40 w-full" type="text"/>
        </div>

        <div className="mb-12 relative"> 
          <p className="text-sm">Check-in Date</p>
          {/* <input className="h-40 w-full" type="text"/> */}
          {/* Date picker */}
          <div className='calendarWrap'>
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
        </div>
        
        <p className="text-sm mb-12">Options</p>
        <div id="option-selection" className="px-16">
          <div>
            <span className="text-xs">Min price per night</span>
            <input className="w-80" type="text" />
          </div>

          <div>
            <span className="text-xs">Max price per night</span>
            <input className="w-80" type="text" />
          </div>

          <div>
            <span className="text-xs">Adult</span>
            <input className="w-80" type="number" />
          </div>

          <div>
            <span className="text-xs">Children</span>
            <input className="w-80" type="number" />
          </div>

          <div>
            <span className="text-xs">Room</span>
            <input className="w-80" type="number" />
          </div>
        </div>

        <button id="btn-filter" className="w-full h-40 text-white mb-12">Search</button>
      </div>
      {/* Results search */}
      <div className="results-content flex flex-col">
      {
        ( state ) ?
        state.map((value, index)=>(
          <Result data={value} key={index}/>
        )) : <h1>Not found result!</h1>
      }
      </div>
    </section>
  );
};

export default Search;
