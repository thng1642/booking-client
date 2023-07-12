import { useEffect, useState } from "react"
import TableTransaction from "../../components/transaction/TableTransaction"
import { useMyRootState } from "../../store"
import axios from "axios"

export default function Transaction() {
    const transactionList = [
        {
            "id": 13,
            "hotelName": "Alagon Saigon Hotel & Spa",
            "room": "101, 102",
            "date": "2023-06-15 - 2023-06-15",
            "price": 150,
            "payment": "Credit Card",
            "status": "Checkout"
        },
        {
            "id": 1,
            "hotelName": "Marriott",
            "room": "101, 102",
            "date": "2023-06-15 - 2023-06-15",
            "price": 150,
            "payment": "Credit Card",
            "status": "Booked"
        },
        
        {
            "id": 3,
            "hotelName": "Ritz-Carlton",
            "room": "Luxury King",
            "date": "2023-08-10 - 2023-06-15",
            "price": 500,
            "payment": "Cash",
            "status": "Checkout"
        }
    ]
    // get current user
    const user = useMyRootState().login

    // console.log(user)
    const [ transactionHistory, setTransactionHistory ] 
            = useState([])

    useEffect(() => {
        // call api gets transaction of user
        try {
            
            ;(async () => {
                const res = await axios.get(`http://localhost:5000/api/v1/reservations?username=${user.email}`)
                console.log("Transaction History: ", res.data)
                setTransactionHistory(res.data)
            })()
        } catch (error) {
            console.log(error)
        }
    }, [])
    return(
        <section className="max-w-screen-lg mx-auto my-64">
            <TableTransaction props={transactionHistory} />
        </section>
    )
}