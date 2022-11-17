export function getToday(){
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth()+1).padStart(2,"0")
    const dd = String(now.getDate()).padStart(2,"0")
    const today = `${yyyy}-${mm}-${dd}`

    return today
}