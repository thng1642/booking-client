import TableTransaction from "../../components/transaction/TableTransaction"

export default function Transaction() {
    const transactionList = [
        {
            "id": 13,
            "nameHotel": "Alagon Saigon Hotel & Spa",
            "room": "101, 102",
            "date": "2023-06-15 - 2023-06-15",
            "price": 150,
            "payment": "Credit Card",
            "status": "Checkout"
        },
        {
            "id": 1,
            "nameHotel": "Marriott",
            "room": "101, 102",
            "date": "2023-06-15 - 2023-06-15",
            "price": 150,
            "payment": "Credit Card",
            "status": "Booked"
        },
        {
            "id": 2,
            "nameHotel": "Hilton",
            "room": "801",
            "date": "2023-07-01 - 2023-06-15",
            "price": 300,
            "payment": "PayPal",
            "status": "Checkin"
        },
        {
            "id": 3,
            "nameHotel": "Ritz-Carlton",
            "room": "Luxury King",
            "date": "2023-08-10 - 2023-06-15",
            "price": 500,
            "payment": "Cash",
            "status": "Checkout"
        }
    ]
    return(
        <section>
            <TableTransaction props={transactionList} />
        </section>
    )
}