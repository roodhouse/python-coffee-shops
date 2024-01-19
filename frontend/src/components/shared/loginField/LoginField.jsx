import React from 'react'

function LoginField({ register, errors, placeholder, id, name, type }) {
  return (
    <>
        <div id="loginFieldContainer" className='w-full'>
            <input 
                type={type}
                id={id}
                placeholder={placeholder}
                className='w-full mb-2 bg-[#f5f5f5] rounded p-3'
                {...register(name, {
                    required: "Can't be empty"
                })}
            />
            { errors.name && (
                <p className='text-red w-[88px] text-[13px] font-light leading-normal'>{errors.name.message}</p>
            )}
        </div>
    </>
  )
}

export default LoginField