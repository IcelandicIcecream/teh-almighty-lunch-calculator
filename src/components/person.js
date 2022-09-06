import {React, useState, useEffect} from "react";
import AddItem from "./addItem";
import ItemsAdded from "./itemsAdded";
import { useItems } from "../utils/ItemContext";

//The Person component which renders according to Pax. It contains the Person #, the AddItem component, the currentBasket &
// currBasketTotal of the corresponsding Person. 

export default function Person({number}) {

    const {totalBasket, gst, servTax, delFee, discount, pax} = useItems()
    const currentBasket = totalBasket.filter(array => array.person === `person${number}`)
    const [currBasketTotal, setCurrBasketTotal] = useState()

    useEffect(() => {
        let total = [];
        currentBasket.map(data => {
            return total.push(parseFloat(data.amount))
        })

        setCurrBasketTotal(total.reduce((a,b) => a+b, 0))
        setCurrBasketTotal(prevTotal => Math.round((((prevTotal*(1+gst+servTax))) + (delFee/pax - discount/pax))*1000)/1000)

    },[currentBasket, gst, servTax, delFee, discount, pax])

    const itemsElem = currentBasket.map(data => {
        return( 
            <ItemsAdded key={data.id} uuid={data.id} number={data.amount}/>
        )
    })

    return(
        <div className="p-4 m-3 rounded-lg shadow-md bg-gray-50 min-w-min">
            <p className="mb-4 text-md"><strong>Person #{number}</strong></p>
            <AddItem number={number}/>
            {itemsElem}
            <div>
                <p className="my-4"><strong>Total: RM {currBasketTotal} </strong></p>               
            </div>
        </div>
    )
}