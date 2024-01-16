import React from 'react'
import TitleIcons from './hero/TitleIcons'
import Copy from './hero/Copy'
import { useMain } from '../../context/main'
import { useAddForm } from '../../context/addFormContext'

function Hero() {

  const { home, filter } = useMain()
  const { detailQuestions } = useAddForm()

  const handleClick = (e) => {
    const icon = e.currentTarget
    if( icon.classList.contains('bg-[white]') ) {
      icon.classList.replace('bg-[white]', 'bg-[#343434]')
      icon.classList.replace('text-[black]', 'text-[white]')
      let iconCategoryName = icon.parentElement.getAttribute('data-type')
      let iconLabel = icon.getAttribute('data-type')
      let iconCategory = detailQuestions.filter((cat) => cat.category === iconCategoryName)
      let iconItem = iconCategory[0].questions.filter((item) => item.label === iconLabel)
      // pull out the icon and label from the array and create new object with them, then put then in the placeIcons array
      console.log(iconItem)
    } else {
      icon.classList.replace('bg-[#343434]', 'bg-[white]')
      icon.classList.replace('text-[white]', 'text-[black]')
    }
  }

  return (
    <>
        <div id="heroContainer">
            <div id="titleIconsWrapper" className='mb-[2rem]'>
                <TitleIcons />
            </div>
            <div id="filterWrapper" style={home === 'home' && filter ? {display: 'block'} : {display: 'none'} }>
              { detailQuestions.map((category) => (
                <div id={category.category+'FilterContainer'}>
                    <div id={category.category+'FilterHeadingContainer'} className='mb-2'>
                      <h2>{category.category}</h2>
                    </div>
                    <div id={category.category+'ItemContainer'} data-type={category.category} className='flex flex-wrap text-xl'>
                      { category.questions.map((question) => (
                        <div id={question.label+'Container'} data-type={question.label} className='flex flex-wrap justify-center items-center text-center w-20 h-20 text-sm py-5 rounded m-3 bg-[white] text-[black]' onClick={handleClick}>
                          <div id={question.label+'IconContainer'}>
                            {question.icon}
                          </div>
                          <div id={question.label+'LabelContainer'} className='w-full'>
                            <p>{question.label}</p>
                          </div>
                        </div>
                      ))}

                    </div>
                </div>
              ))}
            </div>
            <div id="copyWrapper">
                <Copy />
            </div>
        </div>
    </>
  )
}

export default Hero