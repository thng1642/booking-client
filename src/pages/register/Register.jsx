import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import './style.css'

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}
// Page register new user
export default function Register() {

    const [ username, setUsername ] = useState('')
    const nav = useNavigate()
    const [ password, setPassword ] = useState('')
    const [ notify, setNotify] = useState({
        message: '',
        isError: false
    })

    // handle close Alter/Notify
    const closeNotify = (event, reason) => {
        if (reason === 'clickaway') {
            setNotify({notify, isError: false})
            return;
        }
    }
    /**
     * Validation username
     */
    const validUsername = () => {
        if ( username === '' || username === null ) {
            return {
                isValid: false,
                message: "Vui lòng nhập tên tài khoản"
            }
        }
        if ( username.includes(' ')) {
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
        if ( password === '' || password === null ) {
            // document.getElementById('login-pass').focus()
            return {
                isValid: false,
                message: "Vui lòng nhập mật khẩu"
            }
        }
        // length password less than 8 characters
        if ( password < 8 ) { 
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

    const handleRegister = () => {
        console.log(`Username: ${username} password: ${password}`)
        // => check username
        let result = validUsername()
        let isValid = result.isValid
        if ( !isValid ) {
            setNotify({message: result.message, isError: true })
            return
        }
        // => check password
        result = validPassword()
        isValid = result.isValid
        if ( !isValid ) {
            setNotify({message: result.message, isError: true })
            return
        }
        const registerAPI = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/v1/register', { username: username, password: password })

                return res.data
            } catch(error) {
                // console.log(error);
                throw new Error( error.response.data.message )
            }
        }
        registerAPI()
            .then( res => {
                // => Register check Has existed yet ?
                if ( res.isAuth ) {

                    console.log("Dang ky thanh cong")
                    nav(res.redirect)

                } else {
                    
                    console.log("Tai khoan da ton tai")
                    setNotify( {message: res.message, isError: true} )
                }
            })
            .catch(err => {
                console.log("Error: ", err.message)
                setNotify( {message: err.message, isError: true} )
            })
    }

    return(
        <section className="register-form">
            <Box
                component="form"
                sx={{
                    // '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h2>Register</h2>
                <TextField id="outlined-basic" label="Email" 
                    name="username"
                    onChange={ (event) => {
                        setUsername(event.target.value)
                    }}
                    variant="outlined" sx={{ width: '60%', marginBottom: '12px' }} />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={ (event) => {
                        setPassword(event.target.value)
                    }}
                    sx={{ width: '60%', height: '40px', marginBottom: '32px' }}
                />
                <Button type="button"
                    onClick={handleRegister}
                    variant="contained">
                        Create Account
                </Button>
                <Snackbar open={ notify.isError } autoHideDuration={3000} onClose={closeNotify}
                    variant="outlined"
                    sx={{
                        position: "absolute",
                        top: 0,
                    }} TransitionComponent={TransitionRight} >
                    <Alert spacing={2} severity="error" variant="filled">
                    <AlertTitle>Lỗi</AlertTitle>
                    {notify.message}
                </Alert>
                </Snackbar>
                
            </Box>
        </section>
        
    );

}