import './style.css'
/**
 * History transactions
 * @returns 
 */
export default function TableTransaction( {props} ) {
    // console.log("Props: ", props);
    return(
        <main className="transaction-container">
            {/* {
                props.map((value, key)=>(
                    <h1 key={key}>{value.nameHotel}</h1>
                ))
            } */}
            <table className="transaction-table">
                <tr className="heading">
                    <th>#</th>
                    <th>Hotel</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                </tr>
                {
                props.map((value, key) => (
                    <tr key={value.id}>
                        <td>{key + 1}</td>
                        <td>{value.nameHotel}</td>
                        <td>{value.room}</td>
                        <td>{value.date}</td>
                        <td>${value.price}</td>
                        <td>{value.payment}</td>
                        <td>
                            {
                                (value.status === 'Checkin') ? 
                                    <div className='check-in '>Checkin</div> :
                                (value.status === 'Checkout') ? 
                                    <div className='check-out'>Checkout</div> : 
                                (value.status === 'Booked') ? 
                                    <div className='booked'>Booked</div> : null
                            }
                        </td>
                    </tr>
                ))
                }
                
            </table>
        </main>
    )
}