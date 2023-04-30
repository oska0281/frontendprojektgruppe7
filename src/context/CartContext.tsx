import {createContext, ReactNode, useContext, useState} from "react";
import {Cart} from "../components/Cart";
import {localStoring} from "../hooks/localStoring";


const CartContext = createContext({} as CartContext)

export function useCart(){
    return useContext(CartContext)
}

type CartProviderProps = {
    children: ReactNode
}

type CartContext = {
    openCart:() => void
    closeCart:() => void

    cartQuantity: number
    cartProducts: CartProduct[]
    getProductQuantity: (id:string) => number
    increaseCartQuantity: (id:string) => void
    decreaseCartQuantity: (id:string) => void
    removeFromCart: (id:string) => void
}

type CartProduct= {
    id: string
    quantity: number
}

export function CartProvider( { children }: CartProviderProps ){
    const [cartProducts, setcartProducts] = localStoring<CartProduct[]>("kurv-indhold",[])
    const [isOpen, setErAaben] = useState(false)


    const cartQuantity = cartProducts.reduce((quantity,item) => item.quantity + quantity,0)


    const openCart =() => setErAaben(true)
    const closeCart=() => setErAaben(false)

    function increaseCartQuantity(id: string) {
        setcartProducts(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1}]
            } else{
                return currentItems.map(item=> {
                    if (item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: string) {
        setcartProducts(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !==id)
            } else{
                return currentItems.map(item=> {
                    if (item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function getProductQuantity(id: string)  {
        return cartProducts.find(item => item.id === id)?.quantity || 0
    }

    function removeFromCart(id: string){
        setcartProducts(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }


    return (
        <CartContext.Provider value = {{ getProductQuantity,increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartProducts, cartQuantity, closeCart,openCart }}>
        {children}
            <Cart isOpen = {isOpen} />
    </CartContext.Provider>
    )
}
