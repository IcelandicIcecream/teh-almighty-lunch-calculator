import {React} from "react";
import { useForm } from "react-hook-form"
import { useItems } from "../utils/ItemContext";
//addItem, allows and handles the submission of new values corresponding to the Person

export default function SetFees() {

    const {register, watch} = useForm();
    const {toggleGST, toggleServ, setDelFee, setDiscount} = useItems();
    const GST = watch("gst")
    const servTax = watch("servTax")

    return(
        //When data is submitted, the object that is created via react-hook-form's handleSubmit gets passed as an argument 
        //into the addToBasket function from ItemContext.js
        <form className="flex flex-col space-y-2">
        <div className="flex flex-row py-2 space-x-6">
        <div className="flex flex-row items-center justify-center space-x-2.5">
            <input id="gst" className="flex-none w-5 h-5 lg:w-4 lg:h-4" type="checkbox" onClick={toggleGST(GST)} {...register("gst")}/>
            <label htmlFor="gst">GST (6%)</label>
        </div>
        <div className="flex flex-row items-center justify-center space-x-3">
            <input id="servTax" className="flex-none w-5 h-5 lg:w-4 lg:h-4" type="checkbox" onClick={toggleServ(servTax)} {...register("servTax")}/>
            <label htmlFor="servTax">Service Tax (10%)</label>
        </div>
        </div>
        <div className="flex flex-col">
        <div className="flex flex-row items-center justify-start max-w-full pb-2 space-x-4">
            <label htmlFor="delivery" className="flex-none text-center text-md">Delivery Fee 
                <span className="px-1 text-sm text-gray-400">
                    (Optional)
                </span>
                :
            </label>
            <input id="delivery" className="w-[6.5rem] lg: my-1" onChange={setDelFee(watch("delivery"))} type="number" step="0.01" {...register("delivery")}/>
        </div>
        <div className="flex flex-row items-center justify-start max-w-full pb-2 space-x-4">
            <label htmlFor="discount" className="text-md">Discount
            <span className="px-1 text-sm text-gray-400">
                (Optional)
            </span>
            :
            </label>
            <input id="discount" className="w-[6.5rem] my-1" onChange={setDiscount(watch("discount"))} type="number" step="0.01" {...register("discount")}/>
        </div>
        </div>
        </form>
    )
}