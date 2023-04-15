// @flow
import * as React from 'react';
import './index.css'
import {footer} from './data.js'

export function Footer() {
    return (
        <footer>
            {/* Top footer */}
            <div className='top-footer mb-32 text-white'>
                <h3 className='mb-24 text-3xl'>Save time, save money!</h3>
                <p className='mb-16'>Sign up and we'll send the best deals to you</p>
                {/* input email bar */}
                <div className='search-bar'>
                    <div className='h-full flex items-center px-8'>
                        <input id='input-email' type="text" placeholder='Your Email'></input>
                    </div>
                    <button id='subscribe-btn' className='h-full'>Subscribe</button>
                </div>
            </div>
            {/* Bottom footer */}
            <div className='max-w-screen-lg mx-auto flex flex-row bottom-footer'>
            {
                footer.map((value, key)=>(
                    <div className='flex flex-col' key={value.col_number}>
                    {
                        value.col_values.map((item, key)=>(
                            <a key={key} href='/' className='mb-8'>{item}</a>
                        ))
                    }
                    </div>
                ))
            }
            </div>
        </footer>
    );
};