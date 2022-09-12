import React from "react"
import { useItems } from "../utils/ItemContext";

//the ItemsAdded function lists down all the items corresponding to the Person. Also allows for the removal of items from each
//respective Person's currentBasket

export default function ItemsAdded(props) {
    
    const {removeFromBasket} = useItems()

    return (
        <div className="flex flex-row justify-between p-3">
        <p>RM {props.number}</p>
        <button onClick={() => removeFromBasket(props.uuid)}>x</button>
        </div>
    )
}