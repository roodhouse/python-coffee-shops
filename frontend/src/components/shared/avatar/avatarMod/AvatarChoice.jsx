import React from 'react'

function AvatarChoice({user}) {

    console.log(user)

    let change = ['red', '#f6da5e', 'blue', 'green', 'purple']
  return (
    <>
        <div id='avatarChoiceContainer' className='flex justify-between px-3'>
            { change ? (
                change.map((color, index) => (
                    <div 
                        key={index}
                        className={`text-center capitalize w-12 h-12 rounded-[50%] text-white text-2xl flex justify-center items-center bg-[${color}]`}>
                            {user.email.split("")[0]}
                    </div>
                )
               )
            ) : 'hi'
        }
        </div>
    </>
  )
}

export default AvatarChoice