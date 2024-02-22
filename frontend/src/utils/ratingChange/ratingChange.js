import getSiblings from '../miscFunctions/getSiblings.js'

export function ratingChange(e, review) {
    const iconParent = e.currentTarget

    const siblings = getSiblings(iconParent)

    for (let i = 0; i < siblings.length; i++ ) {
        if (siblings[i].classList.contains('text-red') || siblings[i].classList.contains('text-green') || siblings[i].classList.contains('text-[#F6D95E]')) {
            siblings[i].classList.replace('text-red', 'text-[#ddd]')
            siblings[i].classList.replace('text-green', 'text-[#ddd]')
            siblings[i].classList.replace('text-[#F6D95E]', 'text-[#ddd]')
        }
    }

    if ( iconParent.classList.contains('text-[#ddd]') ) {
        if ( iconParent.id === 'noIconContainer' ) {
            iconParent.classList.remove('text-[#ddd]')
            iconParent.classList.add('text-red')
        } else if ( iconParent.id === 'yesIconContainer' ) {
            iconParent.classList.remove('text-[#ddd]')
            iconParent.classList.add('text-green')
        } else {
            iconParent.classList.remove('text-[#ddd]')
            iconParent.classList.add('text-[#F6D95E]')
        }
    } else {
        iconParent.classList.remove(['text-red'])
        iconParent.classList.remove(['text-green'])
        iconParent.classList.remove(['text-[#F6D95E]'])
        iconParent.classList.add('text-[#ddd]')
    }

    if ( iconParent.id === 'noIconContainer' ) {
        review.answers[0].sum = 0
    } else if (iconParent.id === 'sometimesIconContainer') {
            review.answers[0].sum = 1
    } else {
        review.answers[0].sum = 2
    }
    const submission = review

    return submission

}