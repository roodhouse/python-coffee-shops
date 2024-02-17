export default function randomColorGenerator() {
    let colors = ['black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple']
    let randomIndex = Math.floor(Math.random() * colors.length)
    let color = colors[randomIndex]
    console.log(color)
    return color
}