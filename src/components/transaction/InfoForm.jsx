import { useMyRootState } from "../../store/hooks"

function InfoForm() {
    const userState = useMyRootState()
    return (
    <div className='reserve-info'>
        <h3>Reserve Info</h3>
        <div>
            <label>
            Your Full Name:
            <input name='fullName' type='text' placeholder='Full Name' required/>
            </label>
            <label>
            Your Email:
            <input name='email' type='text' placeholder='Email' required/>
            </label>
            {/* TODO: valid phone number input */}
            <label>
            Your Phone Number:
            <input name='phone' type='text' required placeholder='Phone Number'/>
            </label>
            <label>
            Your Identity Card Number:
            <input name='card' type='text' required placeholder='Card Number'/>
            </label>
        </div>
    </div>
    )
}
export default InfoForm