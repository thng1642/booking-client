import Result from "../../components/search/result/Result.jsx";
import { results } from "./data.js";
import './index.css'

const Search = () => {
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

        <div className="mb-12"> 
          <p className="text-sm">Check-in Date</p>
          <input className="h-40 w-full" type="text"/>
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
        results.map((value, index)=>(
          <Result data={value}/>
        ))
      }
      </div>
    </section>
  );
};

export default Search;
