import React, {useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { changeqty, deleteCart } from "../../Redux/cartSlice";

export default function Cart() {
    const [discountAmount, setDiscountAmount] = useState(0);

    const [applycode, setApplycode] = useState("")

    const applyCode = () => {
        if(applycode === "new50" || applycode === "NEW50"){
            setDiscountAmount(50)   
            alert("Code applied successfully")
        }else{
            alert("Invalid code")
        }
    }
   console.log(discountAmount);

    const data = useSelector((state) => state.cartStore.cartItems)
    const dispatch = useDispatch()

    let totalProductPrice = data.reduce((acc , obj) => acc += obj.qty * obj.price , 0)
    let discount = totalProductPrice > 799 ? totalProductPrice * 0.1 : 0;
    let tax = totalProductPrice * 0.02
    let totalCartPrice = totalProductPrice - discount + tax - discountAmount

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    Shopping Cart
                </h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                        { data.length > 0 ? 
                        data.map((product, index) => {
                            return <CartProduct product={product} key={index}/> 
                        })
                        : <p className="text-center text-gray-500">No items in the cart</p> 
                        }
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 ">
                                Order summary
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 ">
                                            Original price
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 ">
                                            ${totalProductPrice.toFixed(2)}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 ">
                                            Savings
                                        </dt>
                                        <dd className="text-base font-medium text-green-600">
                                           ${discount.toFixed(2)}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 ">
                                            Tax
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 ">
                                            ${tax.toFixed(2)}
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                                    <dt className="text-base font-bold text-gray-900 ">
                                        Total
                                    </dt>
                                    <dd className="text-base font-bold text-gray-900 ">
                                        ${totalCartPrice.toFixed(2)}
                                    </dd>
                                </dl>
                            </div>
                            <Link
                                href="#"
                                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                            >
                                Proceed to Checkout
                            </Link>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 ">
                                    {" "}
                                    or{" "}
                                </span>
                                <Link
                                    to={'/'}
                                    title=""
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                                >
                                    Continue Shopping
                                    <svg
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 12H5m14 0-4 4m4-4-4-4"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="voucher"
                                        className="mb-2 block text-sm font-medium text-gray-900 "
                                    >
                                        {" "}
                                        Do you have Link voucher or gift card?{" "}
                                    </label>
                                    <input
                                        value={applycode}
                                        onChange={(e)=> setApplycode(e.target.value)}
                                        type="text"
                                        id="voucher"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                                        placeholder="Enter coupon code"
                                        required=""
                                    />
                                </div>
                                <button
                                    onClick={applyCode}
                                    type="button"
                                    className="flex w-full items-center justify-center border border-primary-500 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                                >
                                    Apply Code
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

function CartProduct({product}) {

    let {id, title, thumbnail, price, uniqeID , qty} = product
    const dispatch = useDispatch()
    
    const removeFromCart = () =>{
        dispatch(deleteCart({uniqeID}))
    }

    const changeQty = (type) => {
        let finalQty = qty;
        if(type == "+"){
            finalQty = qty + 1
        }else if(type == "-" && qty > 1){
            finalQty = qty - 1
        }
        dispatch(changeqty({uniqeID ,finalQty}))
    }
    return ( 
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <Link href="#" className="shrink-0 md:order-1">
                    <img
                        className="h-20 w-20"
                        src={thumbnail}
                        alt={title}
                    />
                </Link>
                <label htmlFor="counter-input" className="sr-only">
                    Choose quantity:
                </label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                        <button
                            onClick={() => changeQty("-")}
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                        >
                            <svg
                                className="h-2.5 w-2.5 text-gray-900 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                />
                            </svg>
                        </button>
                        <input
                            onChange={ (e) => changeQty(e.target.value) }
                            value={qty}
                            type="text"
                            id="counter-input"
                            data-input-counter=""
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 "
                            placeholder=""
                            required=""
                        />
                        <button
                            onClick={() => changeQty("+")}
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                            <svg
                                className="h-2.5 w-2.5 text-gray-900 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 ">
                            $ { (price * qty).toFixed(2) }
                        </p>
                    </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline"
                    >
                        {title} | {price}
                    </Link>
                    <div className="flex items-center gap-4 mt-4">
                        <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                        >
                            <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                            </svg>
                            Add to Favorites
                        </button>
                        <button
                            onClick={removeFromCart}
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline "
                        >
                            <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
