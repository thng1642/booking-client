import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Alert from '@mui/material/Alert';

import { useMyRootState } from "../../store/hooks"

const InfoForm = forwardRef( function InfoForm(props, ref) {
    const userState = useMyRootState()
    const [ inputName, inputEmail, inputPhoneNumber, inputCardNumber ] = ref
    const [ nameValid, setNameValid ] = useState({
        isValid: false,
        message: null
    })
    const [ emailValid, setEmailValid ] = useState({
        isValid: false,
        message: null
    })
    // const { nameValid, setNameValid, emailValid, setEmailValid } = props
    useEffect(() => {
        // console.log(ref)
        if ( userState.isAuth ) {
            inputName.current.value = userState.login.fullName
            inputEmail.current.value = userState.login.email
            inputPhoneNumber.current.value = userState.login.phoneNumber
        }
        // console.log(inputName.current.value)
        // console.log(inputEmail.current)
        // console.log(inputPhoneNumber.current)
        // console.log(inputCardNumber.current)
    }, [])
    return (
    <div className='reserve-info'>
        <h3>Reserve Info</h3>
        <div>
            <label>
            Your Full Name:
            <input name='fullName' ref={inputName} type='text' 
                onBlur={(e)=>{

                    inputName.current.value = inputName.current.value.trim()
                    let isName=Boolean(inputName.current.value)
                    if (!isName) {
                        setNameValid({isValid: false, message: 'Trường tên không được để trống!'})
                        e.target.focus()
                        return
                    }
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
                        if (result.length !== null) {
                            setNameValid({isValid: false, message: 'Tên không chứa số!'})
                            isName = false
                        }
                    }
                    if (!isName) {
                        e.target.focus()
                    }
                }}
                onChange={() => {
                    if (!nameValid.isValid && Boolean(nameValid.message)) {
                        console.log("Turn off message valid name")
                        setNameValid({ isValid: false, message: null })
                    }
                }}
                placeholder='Full Name' required/>
            {(!nameValid.isValid && Boolean(nameValid.message))  
                ?<Alert severity="error">{nameValid.message}</Alert> 
                : null
            }
            </label>
            <label>
            Your Email:
            <input name='email' type='text' placeholder='Email' required
                onBlur={(e) => {
                    inputEmail.current.value = inputEmail.current.value.trim()
                    if ( !Boolean(inputEmail.current.value) ) {
                        setEmailValid({isValid: false, message: "Trường email không được để trống!"})
                        e.target.focus()
                        return
                    }
                    // Link references: https://regex101.com/r/SxCdMO/1
                    const regexEmail = /(^[\w_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg
                    let isEmail = Boolean(inputEmail.current.value.match(regexEmail))
                    if ( !isEmail ) {
                        setEmailValid({isValid: false, message: "Email không hợp lệ!"})
                        e.target.focus()
                        return
                    }
                }}
                onChange={() => {
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
            {/* TODO: valid phone number input */}
            <label>
            Your Phone Number:
            <input name='phone' type='text' required 
                placeholder='Phone Number'
                onBlur={() => {
                    
                }}
                onChange={() => {

                }}
                ref={inputPhoneNumber}
            />
            </label>
            <label>
            Your Identity Card Number:
            <input name='card' type='text' required 
                placeholder='Card Number'
                ref={inputCardNumber}
            />
            </label>
        </div>
    </div>
    )
})
export default InfoForm