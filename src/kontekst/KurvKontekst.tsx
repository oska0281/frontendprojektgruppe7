import {createContext, ReactNode, useContext, useState} from "react";
import {Kurv} from "../komponenter/Kurv";
import {lokalLagring} from "../hooks/lokalLagring";

const KurvKontekst = createContext({} as KurvKontekst)

export function useKurv(){
    return useContext(KurvKontekst)
}

type KurvProviderProps = {
    children: ReactNode
}

type KurvKontekst = {
    aabenKurv:() => void
    lukKurv:() => void

    kurvAntal: number
    kurvVarer: KurvVare[]
    getVareAntal: (id:string) => number
    increaseKurvAntal: (id:string) => void
    decreaseKurvAntal: (id:string) => void
    fjernFraKurv: (id:string) => void
}

type KurvVare= {
    id: string
    antal: number
}

export function KurvProvider( { children }: KurvProviderProps ){
    const [kurvVarer, setkurvVarer] = lokalLagring<KurvVare[]>("kurv-indhold",[])
    const [erAaben, setErAaben] = useState(false)


    const kurvAntal = kurvVarer.reduce((antal,item) => item.antal + antal,0)


    const aabenKurv =() => setErAaben(true)
    const lukKurv=() => setErAaben(false)

    function increaseKurvAntal(id: string) {
        setkurvVarer(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, antal: 1}]
            } else{
                return currentItems.map(item=> {
                    if (item.id === id){
                        return {...item, antal: item.antal + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseKurvAntal(id: string) {
        setkurvVarer(currentItems => {
            if (currentItems.find(item => item.id === id)?.antal === 1) {
                return currentItems.filter(item => item.id !==id)
            } else{
                return currentItems.map(item=> {
                    if (item.id === id){
                        return {...item, antal: item.antal - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function getVareAntal(id: string)  {
        return kurvVarer.find(item => item.id === id)?.antal || 0
    }

    function fjernFraKurv(id: string){
        setkurvVarer(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }


    return (
        <KurvKontekst.Provider value = {{ getVareAntal,increaseKurvAntal, decreaseKurvAntal, fjernFraKurv, kurvVarer, kurvAntal, lukKurv,aabenKurv }}>
        {children}
            <Kurv erAaben = {erAaben} />
    </KurvKontekst.Provider>
    )
}
