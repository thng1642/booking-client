// @flow
import './index.css'
import '../../index.css'
import * as React from 'react';

export default function NavBar() {
    return (
        <nav className='max-w-screen-lg mx-auto mb-32'>
            <div className='top-nav'>
                <span>Booking Website</span>

                <div className='action-btn'>
                    <button>Register</button>
                    <button>Login</button>
                </div>
            </div>
            <div className='nav-links flex'>

                <a href='/' className='nav-btn py-12 px-16 active-link'>
                    <i class="fa fa-bed"></i>
                    <span>Stays</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i class="fa fa-plane"></i>
                    <span>Flights</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i class="fa fa-car"></i>
                    <span>Car rentals</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i class="fa fa-bed"></i>
                    <span>Attractions</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i class="fa fa-taxi"></i>
                    <span>Airport taxis</span>
                </a>
                
            </div>
        </nav>
    );
};