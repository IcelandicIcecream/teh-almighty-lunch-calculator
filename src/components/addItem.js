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
            amount: Object.values(data)[1],
            food: Object.values(data)[0],
            })
            resetField(`person${props.number}`)
            resetField(`food${props.number}`)
        })
        }>
        <span className="flex flex-row justify-center max-w-lg gap-1 p-2 text-sm align-items">
            <input className="w-1/2 p-2" type="text" placeholder="Food" {...register(`food${props.number}`, {required: true}) }/>
            <input className="w-1/3 p-2" type="number" step="0.01" placeholder="Price" {...register(`person${props.number}`, {required: true}) }/>
            <button className="px-3 py-1 mx-2 text-xl bg-gray-100 rounded-full cursor-pointer" type="submit">+</button>
        </span>
        </form>
    )
}