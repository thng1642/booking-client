import axios from "axios"
import { LOGIN_USER } from "../store/constants"

const baseUrl = 'http://localhost:5000/api/v1'

/**
 * API for customer
 * @param {String} action action use want do
 * @param {String} endpoint endpoint server
 * @param {String} method 
 * @param {Object} data data want send to server
 */
export function clientBookingApi( action, endpoint, method, data ) {
    let header = {
        'Content-Type': 'application/json'
    }
    // ==> Login user
    if ( action === LOGIN_USER )
    return axios({
        method: method,
        headers: header,
        data: data,
        url: baseUrl + endpoint
    })
    // .then((response) => {
    //     // console.log("Response: ", response.data )
        
    //     return response.data
    // })
    // .catch( error => {
    //     // console.log(error.response)
    //     return  error.response.data
    // })
}