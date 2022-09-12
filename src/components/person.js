import {React, useState, useEffect} from "react";
import AddItem from "./addItem";
import ItemsAdded from "./itemsAdded";
import { useForm } from "react-hook-form";
import { useItems } from "../utils/ItemContext";

//The Person component which renders according to Pax. It contains the Person #, the AddItem component, the currentBasket &
// currBasketTotal of the corresponsding Person. 

export default function Person({number}) {

    const {discount, delFee, servTax, gst, pax, getCurrentBasket, SumBasket, AutoRound, addName, names} = useItems()
    const [nameBox, showNameBox] = useState(false)
    const [displayName, setDisplayName] = useState(`Person #${number}`)
    const currentBasket = getCurrentBasket(number)
    const [currBasketTotal, setCurrBasketTotal] = useState()
    const {register, handleSubmit} = useForm()
    

    useEffect(() => {
        console.log(Object.values(names))
        let latestNameIndex = names[Object.keys(names)[Object.keys(names).length-1]]
        if (latestNameIndex === undefined) {
            return undefined
        }
        if (latestNameIndex.personNumber !== number) {
            return undefined
        } else {
            setDisplayName(latestNameIndex.name)
        } 
    }, [names, number])

    useEffect(() => {
        let total = [];
        currentBasket.map(data => {
            return total.push(parseFloat(data.amount))
        })
        
        const number = SumBasket(total)
        const amount = (((number*(1+gst+servTax))) + (delFee/pax - discount/pax)) 

        setCurrBasketTotal(AutoRound(amount,2,true))

    },[AutoRound, SumBasket, currentBasket, discount, delFee, pax, gst, servTax])

    const itemsElem = currentBasket.map(data => {
        return( 
            <ItemsAdded key={data.id} uuid={data.id} food={data.food} number={data.amount}/>
        )
    })

    return(
        <div className="relative flex flex-col items-start justify-between p-4 m-3 rounded-lg shadow-md bg-gray-50 min-w-min">
            <div className="relative flex flex-row items-center justify-between w-auto">
            <p className="p-2 text-[0.95rem]"><strong>{displayName}</strong></p>
            <svg className="absolute z-50 cursor-pointer -right-6" onClick={() => showNameBox(prevState => !prevState)}xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"/></svg>
            </div>
            <form onSubmit={
                handleSubmit(data => {
                    addName({
                        name: data[Object.keys(data)],
                        personNumber: number,  
                    })
                    showNameBox(prevState => !prevState)
                })
            }
            className={nameBox === false ? `absolute hidden` : `absolute`}
            >
            <input className="w-1/2 p-2" type="text" placeholder="Enter name" {...register(`personName${number}`) }/>
            </form>
            <AddItem number={number}/>
            {itemsElem}
            <div>
                <p className="p-2 text-sm"><strong>Total: RM {currBasketTotal} </strong></p>               
            </div>
        </div>
    )
}