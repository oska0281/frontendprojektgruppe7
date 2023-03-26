
const FORMATTER = new Intl.NumberFormat(undefined, { currency:"DKK", style:"currency"})

export function formater(number: number){
    return FORMATTER.format(number)
}