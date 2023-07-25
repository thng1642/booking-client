import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";

import { useMyRootState } from "../../store/hooks"
import { validInfoFormActions } from "../../features/redux-saga/valid-form/validInFoFormSlice";
import { useNavigate } from "react-router-dom";

const InfoForm = forwardRef( function InfoForm(props, ref) {

    const userState = useMyRootState()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if ( useState.isAuth ===  true) {
            setOpen(false)
        }
    }
    const validSelector = useSelector( state => state.validInfoForm )
    const [ inputName, inputEmail, inputPhoneNumber, inputCardNumber ] = ref
    const [ isNameEntered, setIsNameEntered ] = useState(false)
    const [ isEmailEntered, setIsEmailEntered ] = useState(false)
    const [ isPhoneEntered, setIsPhoneEntered ] = useState(false)
    const [ isCardEntered, setIsCardEntered ] = useState(false)
    const [ nameValid, setNameValid ] = useState({
        isValid: false,
        message: null
    })
    const [ emailValid, setEmailValid ] = useState({
        isValid: false,
        message: null
    })
    const [ phoneValid, setPhoneValid ] = useState({
        isValid: false,
        message: null
    })
    const [ cardValid, setCardValid ] = useState({
        isValid: false,
        message: null
    })
    // const { nameValid, setNameValid, emailValid, setEmailValid } = props
    useEffect(() => {
        // console.log(ref)
        if ( userState.isAuth ) {
            inputName.current.value = userState.login.fullName
            setIsNameEntered(true)
            dispatch(validInfoFormActions.inputNameSuccess())

            inputEmail.current.value = userState.login.email
            setIsNameEntered(true)
            dispatch(validInfoFormActions.inputEmailSuccess())

            inputPhoneNumber.current.value = userState.login.phoneNumber
            setIsPhoneEntered(true)
            dispatch(validInfoFormActions.inputPhoneNumberSuccess())
        } else {
            handleClickOpen()
            // nav('/login')
        }
    },[])
    if (userState.isAuth) {

        return (
            <div className='reserve-info'> 
                <h3>Reserve Info</h3>
                <div>
                    <label>
                    Your Full Name:
                    <input ref={inputName} type='text' 
                        onBlur={(e)=>{
                            let isName = Boolean(inputName.current.value)
                            if (!isName) {
                                setNameValid({isValid: false, message: 'Trường tên không được để trống!'})
                                e.target.focus()
                                return
                            }
                            inputName.current.value = inputName.current.value.trim()
                            // Remove spaces at the between words
                            const nameWorlds = inputName.current.value.split(/ +/)
                            inputName.current.value= nameWorlds.join(" ")
                            //==> Check name field: must have first name(>1char) and last name(>1char); not contain specific's characters
                            const specifics = "~`!@#$%^&*()-=_+?.>/,<".split("")
                            const regexName = /[0-9]/
                            // console.log(inputName.current.value)
                            for (let i = 0; i < specifics.length; i++) {
                                if (inputName.current.value.includes(specifics[i])) {
                                    setNameValid({isValid: false, message: 'Tên không chứa ký tự đặc biệt!'})
                                    isName = false
                                    break
                                }
                            }
                            // Continue checking
                            if ( isName ) {
                                const result = inputName.current.value.match(regexName)
                                if (result !== null) {
                                    setNameValid({isValid: false, message: 'Tên không chứa số!'})
                                    isName = false
                                }
                            }
                            if (!isName) {
                                e.target.focus()
                                return
                            }
                            if ( isName && isNameEntered ) {
                                dispatch(validInfoFormActions.inputNameSuccess())
                            }
                        }}
                        onChange={() => {
                            setIsNameEntered(true)
                            if (!nameValid.isValid && Boolean(nameValid.message)) {
                                console.log("Turn off message valid name")
                                setNameValid({ isValid: false, message: null })
                            }
                        }}
                        placeholder='Full Name' required />
                    {(!nameValid.isValid && Boolean(nameValid.message))  
                        ?<Alert severity="error">{nameValid.message}</Alert> 
                        : null
                    }
                    </label>
                    <label>
                    Your Email:
                    <input name='email' type='text' placeholder='Email' required
                        onBlur={(e) => {
                            // Validated before and now changing again
                            // if ( validSelector.isName && isNameEntered ) {
                            //     dispatch(validInfoFormActions.inputNameFail())
                            // }
                            if ( !Boolean(inputEmail.current.value) ) {
                                setEmailValid({isValid: false, message: "Trường email không được để trống!"})
                                e.target.focus()
                                return
                            }
                            inputEmail.current.value = inputEmail.current.value.trim()
                            // Link references: https://regex101.com/r/SxCdMO/1
                            const regexEmail = /(^[\w_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg
                            let isEmail = Boolean(inputEmail.current.value.match(regexEmail))
                            if ( !isEmail ) {
                                setEmailValid({isValid: false, message: "Email không hợp lệ!"})
                                e.target.focus()
                                return
                            }
                            if ( isEmail && isEmailEntered ) {
                                dispatch(validInfoFormActions.inputEmailSuccess())
                            }
                        }}
                        onChange={() => {
                            setIsEmailEntered(true)
                            if (!emailValid.isValid && Boolean(emailValid.message)) {
                                console.log("Turn off message valid email")
                                setEmailValid({ isValid:false, message: null })
                            }
                        }}
                        ref={inputEmail}
                    />
                    {(!emailValid.isValid && Boolean(emailValid.message))  
                        ?<Alert severity="error">{emailValid.message}</Alert> 
                        : null
                    }
                    </label>
                    <label>
                    Your Phone Number:
                    <input type='text' required 
                        placeholder='Phone Number'
                        onBlur={(e) => {
                            /**
                             * Check empty field
                             */
                            if ( !Boolean(inputPhoneNumber.current.value) ) {
                                setPhoneValid({isValid: false, message: "Trường điện thoại không được để trống!"})
                                e.target.focus()
                                return
                            }
                            // Link References: https://regex101.com/r/JdjpqD/1
                            const regexPhoneVN = /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/mg
                            inputCardNumber.current.value = inputCardNumber.current.value.trim() 
                            let isPhoneNumber = Boolean(regexPhoneVN.exec(inputPhoneNumber.current.value))
                            
                            if ( !isPhoneNumber ) {
                                setPhoneValid({isValid: false, message: "Sđt bắt đầu bằng 0, có 10 đến 11 số"})
                                e.target.focus()
                                return
                            }
                            if ( isPhoneNumber && isPhoneEntered) {
                                dispatch(validInfoFormActions.inputPhoneNumberSuccess())
                            }
                        }}
                        onChange={() => {
                            setIsPhoneEntered(true)
                            if (!phoneValid.isValid && Boolean(phoneValid.message)) {
                                console.log("Turn off message valid phone number")
                                setPhoneValid({ isValid:false, message: null })
                            }
                        }}
                        ref={inputPhoneNumber}
                    />
                    {(!phoneValid.isValid && Boolean(phoneValid.message))  
                        ?<Alert severity="error">{phoneValid.message}</Alert> 
                        : null
                    }
                    </label>
                    <label>
                    Your Identity Card Number:
                    <input name='card' type='text' required 
                        placeholder='Card Number'
                        onBlur={(e) => {
                            // Check empty field
                            if ( !Boolean(inputCardNumber.current.value) ) {
                                setCardValid({ isValid: false, message: "Trường Card không được để trống!" })
                                e.target.focus()
                                return
                            }
                            inputCardNumber.current.value = inputCardNumber.current.value.trim()
                            const regexCard = /^[0-9]+$/gm
                            let isCard = Boolean(inputCardNumber.current.value.match(regexCard))
                            if ( !isCard ) {
                                setCardValid({
                                    isValid: false,
                                    message: "Không được chứ ký tự đặc biệt và chữ!"
                                })
                                e.target.focus()
                                return
                            }
                            if ( isCard && isCardEntered ) {
                                dispatch(validInfoFormActions.inputCardNumberSuccess())
                            }
                        }}
                        onChange={() => {
                            setIsCardEntered(true)
                        }}
                        ref={inputCardNumber}
                    />
                    {(!cardValid.isValid && Boolean(cardValid.message))  
                        ?<Alert severity="error">{cardValid.message}</Alert> 
                        : null
                    }
                    </label>
                </div>
            </div>
            )
    } else {
        return(
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>
            {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText >
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                nav('/login')
            }}>Login</Button>
            <Button onClick={() => {
                nav('/register')
            }} autoFocus>
                Sign up
            </Button>
            </DialogActions>
        </Dialog>
        )
    }
})
export default InfoForm