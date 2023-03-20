import {useEffect, useState} from "react";
import {i} from "../../../anaconda3/Lib/site-packages/bokeh/server/static/js/types/core/dom";


export function useLocalStorage<T>(key:string, initialValue:T | (()=>T)){
const [value,setValue] = useState<T>(()=>{
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue=== "function" ){
        return (initialValue as () => T)()
    }else {
        return initialValue
    }
})

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key,value])

    return [value,setValue] as [typeof value,typeof setValue]

}