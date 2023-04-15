import NavBar from '../../components/nav/NavBar';
import {Footer} from '../../components/footer/Footer';
import hotel from './data.json'
import './index.css'
// import '../../components/nav/index.css'

const Detail = () => {
  
  return (
    <>
    <header>
      <NavBar />
    </header>
    
    <section className="max-w-screen-lg mb-64 mx-auto">
      {/* Top details information */}
      <div className='w-full'>

        {/* Name and Book button */}
        <div className='flex flex-row h-40 items-start w-full justify-between'>
          <h3>{hotel.name}</h3>
          <button className='bg-blue-600 text-white font-bold h-full rounded-md'>Reserve or Book Now!</button>
        </div>

        {/* ==> overview hotel */}
        <div className='flex flex-row items-center mb-8'>
          <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
          <p className='text-xs ml-4'>{hotel.address}</p>
        </div>

        <p className='text-sm text-blue-500 mb-8'>{hotel.distance}</p>

        <p className='text-sm font-bold text-green-600 mb-8'>{hotel.price}</p>
        {/* Images */}
        <div id='list-img' className='mb-64'>
        {
          hotel.photos.map((value, index)=>(
            <img src={value} alt="list img hotel" key={index}></img>
          ))
        }
        </div>
      </div>

      {/* Bottom details information */}
      <div id='bottom-details'>
        <div>
          <h3 className='text-2xl mb-12'>{hotel.title}</h3>
          <p>{hotel.description}</p>
        </div>
        <div id='price-container' className='bg-blue-100 text-slate-500'>
          <h3 className='mb-24'>Perfect for a 9-nights stay!</h3>

          <p className='text-sm mb-24'>Located id the real heart of Kradow, this property has an excellent location score of 9.8!</p>

          <p className='font-bold text-2xl mb-24 text-black'>
            ${hotel.nine_night_price}  
            <span className='text-slate-500'> (9 nights)</span>
          </p>

          <button className='bg-blue-600 text-white h-40 font-bold w-full rounded-md'>Reserve or Book Now!</button>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Detail;
