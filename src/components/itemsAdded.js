import React from "react"
import { useItems } from "../utils/ItemContext";

//the ItemsAdded function lists down all the items corresponding to the Person. Also allows for the removal of items from each
//respective Person's currentBasket

export default function ItemsAdded(props) {
    
    const {removeFromBasket} = useItems()

    return (
        <div className="flex flex-row items-center justify-between w-full p-4 text-sm">
        <p>{props.food} (RM {props.number}) </p>
        <button className="p-2 px-3 bg-gray-100 text-md" onClick={() => removeFromBasket(props.uuid)}>x</button>
        </div>
    )
}