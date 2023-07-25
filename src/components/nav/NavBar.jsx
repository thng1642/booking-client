// @flow
import './index.css'
import '../../index.css'
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { actions, useMyDispatch, useMyRootState } from '../../store';

export default function NavBar() {

    const rootState = useMyRootState()
    const dispatch = useMyDispatch()
    const nav = useNavigate()

    React.useEffect(() => {
        
    }, [rootState])

    return (
        <nav className='max-w-screen-lg mx-auto pd-32'>
            <div className='top-nav'>
                <Link to='/'>
                    <span style={{
                        color: 'aliceblue'
                    }}>
                    Booking Website
                    </span>
                </Link>

                <div className='action-btn'>
                    {
                        ( rootState.isAuth ) ? <>
                            <span>{rootState.login.username}</span>
                            <button>
                                <Link to='/transaction'>Transactions</Link>
                            </button>
                            <button onClick={() => {
                                dispatch(actions.logoutUser())
                                nav('/', {
                                    replace: true
                                })
                            }}>
                                <span>Logout</span>
                            </button>
                        </>
                        : <>
                            <button>
                                <Link to='/register'>Register</Link>
                            </button>
                            <button>
                                <Link to='/login'>Login</Link>
                            </button>
                        </>
                    }
                </div>
            </div>
            <div className='nav-links flex'>

                <Link to='/' className='nav-btn py-12 px-16 active-link'>
                    <i className="fa fa-bed"></i>
                    <span>Stays</span>
                </Link>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i className="fa fa-plane"></i>
                    <span>Flights</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i className="fa fa-car"></i>
                    <span>Car rentals</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i className="fa fa-bed"></i>
                    <span>Attractions</span>
                </a>

                <a href='/' className='nav-btn py-12 px-16'>
                    <i className="fa fa-taxi"></i>
                    <span>Airport taxis</span>
                </a>
                
            </div>
        </nav>
    );
};