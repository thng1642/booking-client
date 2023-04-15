// @flow
import * as React from 'react';
import './index.css'

export function TypeCard({type}) {
    return (
        <div className='type-cards'>
            <img src={type.image} className='mb-12' alt='type'></img>

            <div className='type-content'>
                <h4>{type.name}</h4>
                <p className='text-sm'>{type.count} hotels</p>
            </div>
        </div>
    );
};