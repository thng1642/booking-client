import axios from 'axios';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { useEffect, useRef, useState, forwardRef } from 'react';
import { DateRange } from 'react-date-range';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { roomAvailableActions } from '../../features/redux-saga/room/roomAvailableSlice';
import './index.css';
import { useMyRootState } from '../../store/hooks';
import InfoForm from '../../components/transaction/InfoForm';

const AvailableRooms = ( {props} ) => {
  
  const [isCheck, setIsCheck] = useState(false)

  return(
    <div>
    {
      props.map((value, index) => (
        <div key={index} className='room-container'>
          <div className='room-overview'>
            <h4>{value.title}</h4>
            <span className='room-title'>{value.desc}</span>
            <span className='room-max'>Max people: {value.maxPeople}</span>
            <span>${value.price}</span>
          </div>
          <div className='room-available'>
          {
            value.roomNumbers.map((room, i)=>(
              <label key={i}>
                {room}
                <input type='checkbox' value={isCheck}
                  onChange={(event)=>{
                    if (event.target.checked) {
                      console.log("Dispatch checked!")
                      console.log(`Room: ${value.id} , numbers: ${room}`)
                    } else {
                      console.log("Dispatch unchecked!")
                    }
                    setIsCheck(current => !current)
                  }}
                  name='selectedRoom' key={i}/>
              </label>
            ))
          }
          </div>
        </div>
      ))
    }
    </div>
  )
}



const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Detail = () => {

  const { id } = useParams('id')
  // const userState = useMyRootState()
  const [detailHotel, setDetailHotel] = useState({})
  const [ isOpenAlert, setIsOpenAlert ] = useState(false)
  const dispatch = useDispatch()
  // const [bookInfo, setBookInfo] = useState({})
  const [openBook, setOpenBook] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      // startDate: addDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ])
  // Form info
  const inputName = useRef(null)
  const inputEmail = useRef(null)
  const inputPhoneNumber = useRef(null)
  const inputCardNumber = useRef(null)

  const roomsAvail = useSelector( (state) => state.roomAvailable)

  const handleCloseAlterInfo = (event, reason) => {
    if (reason === 'clickaway') {
      setIsOpenAlert(false)
      return
    }
    
  }

  const fetchDetailHotel = async () => {
    
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/hotel/detail/${id}`)
      // console.log("Detail hotel: ", response.data)
      setDetailHotel( response.data )
    } catch( err ) {

    }
  }

  const handleSentBooking = () => {
    // console.log("Start date: ", state);
    if ( !inputName.current.value ) {
      console.log("Details component - Invalid name!")
      setIsOpenAlert(true)
    }
  }
  // console.log("Details component!!!!")

  /**
   * Loading data detail hotel
   */
  useEffect(() => {
    // console.log("ID", id)
    fetchDetailHotel()
  }, [])

  // useEffect(()=>{
  //   dispatch(roomAvailableActions.fetchRoomsAvailable("hello world"))
  // })
  return (
    <>
    <section className="max-w-screen-lg mb-64 mx-auto pt-32">
      <Snackbar open={isOpenAlert} autoHideDuration={3000} onClose={handleCloseAlterInfo}>
        <Alert onClose={handleCloseAlterInfo} severity="error" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      {/* Top details information */}
      <div className='w-full'>

        {/* Name and Book button */}
        <div className='flex flex-row h-40 items-start w-full justify-between'>
          <h3>{detailHotel.name}</h3>
          {/* <button className='bg-blue-600 text-white font-bold h-full rounded-md'>Reserve or Book Now!</button> */}
        </div>

        {/* ==> overview hotel */}
        <div className='flex flex-row items-center mb-8'>
          <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
          <p className='text-xs ml-4'>{detailHotel.address}</p>
        </div>

        <p className='text-sm text-blue-500 mb-8'>Excellent location - {detailHotel.distance}m from center</p>

        <p className='text-sm font-bold text-green-600 mb-8'>Book a stay over ${detailHotel.cheapestPrice} at this property and get a free airport taxi</p>
        {/* Images */}
        <div id='list-img' className='mb-64'>
        {
          ( detailHotel.photos !== undefined) ?
          detailHotel.photos.map((value, index)=>(
            <img src={value} alt="list img hotel" key={index}></img>
          )) : <></>
        }
        </div>
      </div>

      {/* Bottom details information */}
      <div id='bottom-details'>
        <div>
          <h3 className='text-2xl mb-12'>{detailHotel.title}</h3>
          <p>{detailHotel.desc}</p>
        </div>
        <div id='price-container' className='bg-blue-100 text-slate-500'>
          <h3 className='mb-24'>Perfect for a 9-nights stay!</h3>

          <p className='text-sm mb-24'>Located id the real heart of Kradow, this property has an excellent location score of 9.8!</p>

          <p className='font-bold text-2xl mb-24 text-black'>
            ${detailHotel.cheapestPrice}  
            <span className='text-slate-500'> (9 nights)</span>
          </p>

          <button id='btn-book' className='bg-blue-600 text-white h-40 font-bold w-full rounded-md' onClick={()=>setOpenBook(true)}>Reserve or Book Now!</button>
        </div>
      </div>
      {/* Reservation */}
      {
        ( openBook ) ? 
        <div className='reservation-container'>
          {/* Date picker */}
          <div className='reservation-date'>
            <h3>Dates</h3>
            <DateRange 
              editableDateInputs={true}
              minDate={new Date()}
              onChange={item => {

                setState([item.selection])

                const startDate = format(Object.values(item)[0].startDate, 'yyyy-MM-dd')
                const endDate = format(Object.values(item)[0].endDate, 'yyyy-MM-dd')

                dispatch(roomAvailableActions.fetchRoomsAvailable({
                  "hotelId": id,
                  "startDate": startDate,
                  "endDate": endDate
              }))
                // console.log("Changed date: ", Object.values(item)[0])
                // console.log(`Start date ${startDate} to ${endDate}`)
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
          {/* Reserve info, Check was logged in ? */}
          <InfoForm ref={[inputName, inputEmail, inputPhoneNumber, inputCardNumber]}/>
          {/* Selected room */}
          <div className='select-room'>
            <h3>Select Rooms</h3>
            {
              ( roomsAvail.length === 0 ) ? <></> 
              : <AvailableRooms props={roomsAvail}/>
            }
          </div>
          {/* Selects payment method and reservation */}
          <div className='payment-reservation'>
            <h3>Total Bill: $700</h3>
            <div>
              <select name='' className='select-payment-method'>
                <option value={null}>
                  <em>Select Payment Method</em>
                </option>
                <option value='credit'>Credit Card</option>
                <option value='payPall'>PayPall</option>
                <option value='cash'>Cash</option>
              </select>
              <button className='btn-reservation' onClick={handleSentBooking} type='button'>Reservation Now</button>
            </div>
          </div>
        </div> : null
      }
    </section>
    </>
  );
};

export default Detail;
