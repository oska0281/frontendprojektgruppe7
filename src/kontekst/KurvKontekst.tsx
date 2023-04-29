import {createContext, ReactNode, useContext, useState} from "react";
import {Cart} from "../komponenter/Kurv";
import {lokalLagring} from "../hooks/lokalLagring";


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
    cartProducts: CartProducts[]
    getProductQuantity: (id:string) => number
    increaseCartQuantity: (id:string) => void
    decreaseCartQuantity   : (id:string) => void
    removeFromCart: (id:string) => void
}

type CartProducts= {
    id: string
    quantity: number
}

export function CartProvider( { children }: CartProviderProps ){
    const [cartProducts, setCartProducts] = lokalLagring<CartProducts[]>("kurv-indhold",[])
    const [isOpen, setisOpen] = useState(false)


    const cartQuantity = cartProducts.reduce((quantity,item) => item.quantity + quantity,0)


    const openCart =() => setisOpen(true)
    const closeCart=() => setisOpen(false)

    function increaseCartQuantity(id: string) {
        setCartProducts(currentItems => {
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
        setCartProducts(currentItems => {
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
        setCartProducts(currentItems => {
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
