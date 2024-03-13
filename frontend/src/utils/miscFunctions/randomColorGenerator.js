export default function randomColorGenerator() {
    let colors = ['#000', '#FF0000', '#0B58CA', '#4CAF4F', '#F6D95E', '#D35400', '#7D3C98']
    let randomIndex = Math.floor(Math.random() * colors.length)
    let color = colors[randomIndex]
    return color
}