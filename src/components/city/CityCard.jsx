
// @flow
import * as React from 'react';
import './index.css'
export function CityCard({props}) {
    return (
        <div className='city-cards'>
            <img src={props.image} alt='city'></img>
            <div className='content-city-card'>
                <h3 className='name-city-card mb-12'>{props.name}</h3>
                <p>{props.subText}</p>
            </div>
            
        </div>
    );
};