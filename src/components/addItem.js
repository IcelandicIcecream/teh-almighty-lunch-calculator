import React from "react";
import { useForm } from "react-hook-form"
import { useItems } from "../utils/ItemContext";

//addItem, allows and handles the submission of new values corresponding to the Person
//Uses react-hook-form for form submissions.

export default function AddItem(props) {

    const {register, resetField, handleSubmit} = useForm();
    const {addToBasket} = useItems();

    return(
        //When data is submitted, the object that is created via react-hook-form's handleSubmit gets passed as an argument 
        //into the addToBasket function from ItemContext.js
        
        <form onSubmit={handleSubmit(data => {
            addToBasket({
            person: `person${props.number}`,
            amount: data[Object.keys(data)],
            })
            resetField(`person${props.number}`)
        })
        }>
        <span className="flex flex-row align-items">
            <input className="p-2 rounded-md h-3/5" type="number" step="0.01" placeholder="Insert food price" {...register(`person${props.number}`, {required: true}) }/>
            <button className="px-3 py-1 mx-2 bg-gray-100 rounded-md cursor-pointer" type="submit">Add</button>
        </span>
        </form>
    )
}