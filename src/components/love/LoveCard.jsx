// @flow
import * as React from 'react';
import './index.css'

export default function LoveCard({hotel}) {
    return (
        <div className='love-card' onClick={()=>{
            window.location.replace('/detail')
        }}>
            <div className='font-bold mb-8'>
                <img className='mb-8' src={hotel.image_url} alt='hotel'></img>
                <a href='/'>{hotel.name}</a>
            </div>
            <p className='text-sm mb-8'>
                {hotel.city}
            </p>

            <p className='font-bold mb-8'>Starting from ${hotel.price}</p>

            <div className='rate-content flex items-center'>
                <div className='rate-item'>{hotel.rate}</div>
                <p className="text-sm ml-8">{hotel.type}</p>
            </div>
        </div>
    );
};