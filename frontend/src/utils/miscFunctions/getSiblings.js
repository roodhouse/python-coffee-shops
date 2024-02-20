export default function getSiblings(element) {
    const parent = element.parentNode;
    const children = Array.from(parent.children)
    const siblings = children.filter(child => child !== element)
    return siblings
}