import React from 'react'

function LoginField({ register, errors, placeholder, id, name, type, current }) {

    console.log(name)
    
  return (
    <>
        <div id="loginFieldContainer" className='w-full'>
            { name === 'user' ? (
                <input 
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className='w-full mb-2 bg-[#f5f5f5] rounded p-3'
                    {...register(name, {
                        required: "Can't be empty",
                    })}
                />
            ) : name === 'password' ? (
                <input 
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className='w-full mb-2 bg-[#f5f5f5] rounded p-3'
                    {...register(name, {
                        required: "Can't be empty fool",
                        minLength: {
                            value: 5,
                            message: "Must be at least 5 characters"
                        }
                    })}
                />
            ) : name === 'confirm' ? (
                <input 
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className='w-full mb-2 bg-[#f5f5f5] rounded p-3'
                    {...register(name, {
                        required: "Can't be empty dude",
                        validate: value =>
                            value === current || 'Passwords don\'t match'
                    })}
                />
            ) : '' }
            { errors[name] && (
                <p className='w-full text-red text-[13px] font-light leading-normal'>{errors[name].message}</p>
            )}
        </div>
    </>
  )
}

export default LoginField