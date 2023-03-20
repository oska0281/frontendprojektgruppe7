import {createContext, ReactNode, useContext, useState} from "react";
import {ShoppingCart} from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart:() => void
    closeCart:() => void

    cartQuantity: number
    cartItems: CartItem[]
    getItemQuantity: (id:string) => number
    increaseCartQuantity: (id:string) => void
    decreaseCartQuantity: (id:string) => void
    removeFromCart: (id:string) => void
}

type CartItem= {
    id: string
    quantity: number
}

export function ShoppingCartProvider( { children }: ShoppingCartProviderProps ){
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("kurv-indhold",[])
    const [isOpen, setIsOpen] = useState(false)


    const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity,0)


    const openCart =() => setIsOpen(true)
    const closeCart=() => setIsOpen(false)

    function increaseCartQuantity(id: string) {
        setCartItems(currentItems => {
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
        setCartItems(currentItems => {
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

    function getItemQuantity(id: string)  {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function removeFromCart(id: string){
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value = {{ getItemQuantity,increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, closeCart,openCart }}>
        {children}
            <ShoppingCart isOpen = {isOpen} />
    </ShoppingCartContext.Provider>
    )
}
