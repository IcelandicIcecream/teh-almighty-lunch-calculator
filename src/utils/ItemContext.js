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
    const [discount, setDiscount] = useState(0)
    const [delFee, setDelFee] = useState(0)
    const [totalBasket, setBasket] = useState([])
    const [sum, setSum] = useState(0)
    const [pax, setPax] = useState(0)
    const [servTax, setServTax] = useState(0)
    const [gst, setGst] = useState(0)

    //renews the sum of the values in the totalBasket array as the basket changes by pushing each element into another array
    //named total
    useEffect(() => {
        let total = [];
        totalBasket.map(data => {
        return total.push(parseFloat(data.amount))
    })

    setDiscount(getDisc)
    setDelFee(getDel)

    //and then using the reduce function on the array to sum everything up, include tax & minus discounts   
    setSum(total.reduce((a, b) => a + b, 0))
    setSum(prevSum => Math.round((((prevSum*(1+gst+servTax))) + (delFee - discount))*1000)/1000)

    }, [totalBasket, gst, servTax, discount, delFee]) //the dependency is set, so that re-renders happens only after changes in the totalBasket 

    const getDisc = (value) => {
        return value
    }

    const getDel = (value) => {
        return value
    }

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
        setBasket(prevBasket => {
            return prevBasket.filter(item => item.id !== id)
        })
    }

    function toggleGST(GST) {
        GST ? setGst(0.06) : setGst(0)
    }

    function toggleServ(servTax) {
        servTax ? setServTax(0.10) : setServTax(0)
    }

    return <ItemContext.Provider value = {{
        totalBasket,
        addToBasket,
        removeFromBasket,
        discount,
        delFee,
        sum,
        setDiscount,
        setDelFee,
        servTax,
        toggleServ,
        gst,
        toggleGST,
        pax,
        changeCount,
    }}>{children}</ItemContext.Provider>
}