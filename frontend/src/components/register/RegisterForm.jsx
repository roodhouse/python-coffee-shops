import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMain } from '../../context/main'
import LoginField from '../shared/loginField/LoginField'
import JoinButton from '../shared/joinButton/JoinButton'

function RegisterForm() {

    const { successLogin } = useMain()

    const { register, handleSubmit, reset, watch, formState: {errors} } = useForm({ defaultValues: {
        user: '',
        password: ''
    }}, {validateOnChange: true})

    const password = useRef({})
    password.current = watch("password", '')

    const onSubmit = async (data) => {
        const email = data.user
        const password = data.password

        if ( email && password ) {
            const response = await fetch ('/users', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            if ( response.ok ) {
                successLogin()
                reset()
            } else {
                alert(response.statusText)
            }
        }
    }

    const onError = () => {
        console.log('from log in form oops I did it again')
    }

  return (
    <>
        <div id="registerFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="registerUserNameContainer" className='mb-2 w-full'>
                    <LoginField type={'text'} register={register} errors={errors} placeholder={'Email'} name={'user'} id={'regEmail'} />
                </div>
                <div id="registerPasswordContainer" className='mb-2'>
                    <LoginField type={'password'} register={register} errors={errors} placeholder={'Password'} name={'password'} id={'regPassword'} />
                </div>
                <div id="registerPasswordContainer" className='mb-2'>
                    <LoginField type={'password'} register={register} errors={errors} placeholder={'Confirm Password'} name={'confirm'} id={'regConfirm'} current={password.current} />
                </div>
                <div id="registerButtonContainer">
                    <JoinButton name={'Login'} type={'submit'} />
                </div>
            </form>
        </div>
    </>
  )
}

export default RegisterForm