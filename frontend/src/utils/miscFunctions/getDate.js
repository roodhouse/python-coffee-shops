export default function getCurrentDate() {
    let date = new Date()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString()
    let year = date.getFullYear().toString()
    date = month+'/'+day+'/'+year
    return date
}