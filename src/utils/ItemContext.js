import React, { useContext, useEffect, useState } from "react"
import {v4 as uuidV4} from "uuid"

//Creates a context object via the Context API in React
const ItemContext = React.createContext()

//Creates function that returns the current context value
export function useItems() {
    return useContext(ItemContext)
}

//Wraps the whole context of ItemContext in ItemProvider
export const ItemProvider = ({children}) => {

    //setting the main variables of the calculator 

    const discount = 0
    const delivery = 0
    const [totalBasket, setBasket] = useState([])
    const [sum, setSum] = useState(0)
    const [pax, setPax] = useState(0)

    //renews the sum of the values in the totalBasket array as the basket changes by pushing each element into another array
    //named total
    useEffect(() => {
        let total = [];
        console.log(totalBasket)
        totalBasket.map(data => {
        return total.push(parseFloat(data.amount))
    })

    //and then using the reduce function on the array to sum everything up     
    setSum(total.reduce((a, b) => a + b, 0))

    }, [totalBasket]) //the dependency is set, so that re-renders happens only after changes in the totalBasket 

    //Creates a function to change the total Pax, accepts an expression to be called to deduct or increment the Pax
    function changeCount(expression) {
        setPax(prevPax => prevPax + expression) 

        if (expression === -1)
        setBasket(prevBasket => {
            return prevBasket.filter(item => item.person !== `person${pax}`)
        })
    }

    //Adds an item to the totalBasket, this function is called when a value is submitted
    function addToBasket({person, amount}) {
        setBasket(prevBasket => {
            return [...prevBasket, {id: uuidV4(), person, amount}]
        })
    }
    
    //Removes from the basket when either Pax is decreased, or the values are removed individually using the "X" button
    function removeFromBasket(id) {
        console.log("button is pressed!")
        setBasket(prevBasket => {
            return prevBasket.filter(item => item.id !== id)
        })
    }

    return <ItemContext.Provider value = {{
        totalBasket,
        addToBasket,
        removeFromBasket,
        discount,
        delivery,
        sum,
        pax,
        changeCount,
    }}>{children}</ItemContext.Provider>
}