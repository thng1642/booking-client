// @flow
import * as React from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';

export default function LoveCard({hotel}) {

    const nav = useNavigate()

    return (
        <div className='love-card' onClick={()=>{
            // window.location.replace('/detail')
            nav(`detail/${hotel._id}`)
        }}>
            <div className='font-bold mb-8'>
                <img className='mb-8' src={hotel.img} alt='hotel'></img>
                <a href='/'>{hotel.name}</a>
            </div>
            <p className='text-sm mb-8'>
                {hotel.city}
            </p>

            <p className='font-bold mb-8'>Starting from ${hotel.cheapestPrice}</p>

            {/* <div className='rate-content flex items-center'>
                <div className='rate-item'>{hotel.rate}</div>
                <p className="text-sm ml-8">{hotel.type}</p>
            </div> */}
        </div>
    );
};