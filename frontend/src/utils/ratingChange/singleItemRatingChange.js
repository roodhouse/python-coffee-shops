import getSiblings from "../miscFunctions/getSiblings"
import '../../../src/index.css'

export function singleItemRatingChange(e, review, type, iconParent, answer, toggle) {
    let containerChange = document.getElementById(`${type}-iconsContainer`)
            // containerChange.classList.add('bg-[black]')
            containerChange.classList.replace('justify-between', 'justify-center')
            // change border of element
            if (answer === 2) {
                containerChange.classList.replace('border-[#ddd]', 'border-[green]')
                containerChange.classList.add('bg-[green]')
                iconParent.classList.replace('text-green', 'text-white')
            } else if (answer === 1) {
                containerChange.classList.replace('border-[#ddd]', 'border-yellowBorder')
                containerChange.classList.add('bg-yellowBorder')
                iconParent.classList.replace('text-yellowBorder', 'text-white')
            } else {
                containerChange.classList.replace('border-[#ddd]', 'border-[red]')
                containerChange.classList.add('bg-[red]')
                iconParent.classList.replace('text-red', 'text-white')
            }
            
            // hide siblings and move icon to middle
            const siblings = getSiblings(iconParent)
            const firstSib = document.getElementById(siblings[0].id)
            const secondSib = document.getElementById(siblings[1].id)
            
            firstSib.classList.add('hidden')
            secondSib.classList.add('hidden')
            
            // close element and reset element
            setTimeout(() => {
                toggle(false)
                // containerChange.classList.remove('bg-[black]')
                containerChange.classList.replace('justify-center', 'justify-between')
                if (answer === 2) {
                    containerChange.classList.replace('border-[green]', 'border-[#ddd]')
                    containerChange.classList.remove('bg-[green]')
                    iconParent.classList.replace('text-white', 'text-green')
                } else if (answer === 1) {
                    containerChange.classList.replace('border-yellowBorder', 'border-[#ddd]')
                    containerChange.classList.remove('bg-yellowBorder')
                    iconParent.classList.replace('text-white', 'text-yellowBorder')
                } else {
                    containerChange.classList.replace('border-[red]', 'border-[#ddd]')
                    containerChange.classList.remove('bg-[red]')
                    iconParent.classList.replace('text-white', 'text-red')
                }
                firstSib.classList.remove('hidden')
                secondSib.classList.remove('hidden')
            }, 2000)
}