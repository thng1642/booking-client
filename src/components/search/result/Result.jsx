// @flow
import * as React from 'react';
import './index.css'

export default function Result({data}) {
    return (
        <div className='w-full flex flex-row result-item'>
            {/* Avatar */}
            <img src={data.image_url} id='hotel-avatar-search' alt='avatar'></img>

            {/* Overview information */}
            <div className='flex flex-col justify-evenly overview-item ml-16'>
                <a href='/detail' className='text-primary mb-4'>{data.name}</a>
                <p className='text-sm'>{data.distance} from center</p>
                <div className='tag text-white text-sm'>
                    <span>{data.tag}</span>
                </div>
                <p className='font-bold text-sm '>{data.description}</p>
                <p className=' text-sm'>{data.type}</p>
                {/* Free cancellation */}
                {
                    (data.free_cancel) ? 
                    <div>
                        <p className='font-bold text-sm text-green-600'>Free cancellation</p>
                        <p className='text-sm text-green-500'>You cancel later, so lock in this great price today!</p>
                    </div> : 
                    <div className='dummy-hidden'>
                        <p className='font-bold text-sm text-green-600'>Free cancellation</p>
                        <p className='text-sm text-green-500'>You cancel later, so lock in this great price today!</p>
                    </div>
                }
            </div>
            {/* Rate, price */}
            <div className='rate-price flex flex-col justify-between'>
                {/* Rate content */}
                <div className='flex flex-row justify-between'>
                    <span className='font-bold'>{data.rate_text}</span>
                    <div className='rate-item'>{data.rate}</div>
                </div>
                {/* Price */}
                <div className='flex flex-col items-end'>
                    <p className='text-2xl font-bold mb-4'>${data.price}</p>
                    <p className='text-sm mb-4'>Includes taxes and fees</p>
                    <button className='bg-blue-600 text-white w-full h-40 font-bold tracking-wide'>See availability</button>
                </div>
            </div>
        </div>
    );
};