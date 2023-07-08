import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { actions, useMyDispatch } from '../../store';
import './style.css';

export default function Login() {

    const nav = useNavigate()
    const dispatch = useMyDispatch()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ loginDto, setLoginDto ] = useState({
        username: "",
        password: ""
    })
    const [ openAlter, setOpenAlter ] = useState(false)
    const [  messageAlter, setMessageAlter ] = useState('')

    const handleClosePasswordAlter = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setOpenAlter(false)
    }

    /**
     * Validation username
     */
    const validUsername = () => {
        if ( loginDto.username === '' || loginDto.username === null ) {
            return {
                isValid: false,
                message: "Vui lòng nhập tên tài khoản"
            }
        }
        if ( loginDto.username.includes(' ')) {
            return {
                isValid: false,
                message: "Tên tài khoản không chứa khoảng trắng"
            }
        }
        // other else ...
        return {
            isValid: true
        }
    }

    /**
     * Validation password
     * @returns results checking
     */
    const validPassword = () => {
        if ( loginDto.password === '' || loginDto.password === null ) {
            // document.getElementById('login-pass').focus()
            return {
                isValid: false,
                message: "Vui lòng nhập mật khẩu"
            }
        }
        // length password less than 8 characters
        if ( loginDto.password < 8 ) { 
            // document.getElementById('login-pass').focus()
            return {
                isValid: false,
                message: "Mật khẩu nhiều hơn 8 kí tự"
            }
        }
        // other else ...
        return {
            isValid: true
        }
    }

    const loginUser = async ( data ) => {
        try {
            // const res = await clientBookingApi( action.type, '/login', 'POST', data )
            // setIsLoading(true)
            const res = await axios.post('http://localhost:5000/api/v1/login', data)
            
            return res.data
        } catch(error) {
            console.log(error);
            
            throw new Error( error.response.data.message )      
        }
    }

    const handleSubmitLogin = () => {
        // console.log(loginDto)
        let result = validUsername()
        
        if ( result.isValid === false ) {
            setOpenAlter(true)
            setMessageAlter("Vui lòng nhập tên đăng nhập")
            return
        }
        result = validPassword()
        if ( result.isValid === false ) {
            
            setOpenAlter(true)
            setMessageAlter(result.message)
            return
        }
        setIsLoading(true)

        loginUser(loginDto)
            .then( res => {
                setTimeout(() => {
                    // setIsLoading(true)
                    // console.log("Login success: ", res)
                    dispatch( actions.loginSuccess(res) )
                    setIsLoading(false)
                    nav(-1, { replace: true })
                }, 3000);
            })
            .catch( err => {
                setTimeout(() => {

                    // console.log("Login fail: ", err)
                    setOpenAlter(true)
                    setMessageAlter(err.message)
                    setIsLoading(false)
                }, 2000)
            })
        // dispatch()
        // dispatch(actions.loginUser(loginDto))
    }

    return(
        <section className='section-login'>
            
            <img src="https://images.unsplash.com/photo-1678393812357-515e5b8a5fc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1569&q=80" alt="Background login" className="login__img"/>
            <div className="login">
            <Snackbar
                open={openAlter}
                autoHideDuration={3000}
                onClose={handleClosePasswordAlter}
            >
                <Alert variant="filled" severity="error">{ messageAlter } !</Alert>
            </Snackbar>
                <div action="" method='' className="login__form">
                <h1 className="login__title">Login</h1>

                <div className="login__content">
                    <div className="login__box">
                        <div className="login__box-input">
                            <input type="username"
                                name='username'
                                className="login__input" placeholder=" " 
                                onChange={(event) => {
                                    const { value, name } = event.target
                                    setLoginDto({...loginDto, [name]: value})
                                }}
                            />
                            <label className="login__label">Email</label>
                        </div>
                    </div>

                    <div className="login__box">
                        <div className="login__box-input">
                            <input type="password" required      
                                className="login__input" id="login-pass" 
                                name='password' placeholder=" " 
                                onChange={(event) => {
                                    const { value, name } = event.target
                                    setLoginDto({...loginDto, [name]: value})
                            }}/>
                            <label className="login__label">Password</label>
                        </div>
                    </div>
                    </div>

                    <div className="login__check">
                        <div className="login__check-group">
                            <input type="checkbox" className="login__check-input"/>
                            <label className="login__check-label">Remember me</label>
                        </div>

                    <Link to="/" className="login__forgot">Forgot Password?</Link>
                    </div>

                    <button type="button" className="login__button"
                        onClick={handleSubmitLogin}
                    >Login</button>

                    <p className="login__register">
                    Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    {
                    ( !isLoading ) ? null :
                        <LinearProgress color="success" sx={{ 
                        // marginTop: '20px',
                            position: 'absolute',
                            bottom: '10px',
                            left: '0',
                            zIndex: '10',
                            width: '100%'
                        }}/>
                    }
                </div>
            </div>
        </section>
    )
}