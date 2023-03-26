import {createContext, ReactNode, useContext, useState} from "react";
import {Kurv} from "../komponenter/Kurv";
import {lokalLagring} from "../hooks/lokalLagring";

const KurvKontekst = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(KurvKontekst)
}

type KurvProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart:() => void
    lukKurv:() => void

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

export function ShoppingCartProvider( { children }: KurvProviderProps ){
    const [cartItems, setCartItems] = lokalLagring<CartItem[]>("kurv-indhold",[])
    const [erAaben, seterAaben] = useState(false)


    const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity,0)


    const openCart =() => seterAaben(true)
    const lukKurv=() => seterAaben(false)

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
        <KurvKontekst.Provider value = {{ getItemQuantity,increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, lukKurv,openCart }}>
        {children}
            <Kurv erAaben = {erAaben} />
    </KurvKontekst.Provider>
    )
}
