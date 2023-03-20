
const FORMATTER = new Intl.NumberFormat(undefined, { currency:"DKK", style:"currency"})

export function format(number: number){
    return FORMATTER.format(number)
}