import React from 'react'
import { useForm } from 'react-hook-form'
import LoginField from '../shared/loginField/LoginField'
import JoinButton from '../shared/joinButton/JoinButton'

function LoginForm() {

    const { register, handleSubmit, formState: {errors} } = useForm({ defaultValues: {
        email: '',
        password: ''
    }}, {validateOnChange: true})

    const onSubmit = (data) => {
        console.log(data)
    }

    const onError = () => {
        console.log('from log in form oops I did it again')
    }

  return (
    <>
        <div id="loginFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="userNameContainer" className='mb-2 w-full'>
                    <LoginField register={register} errors={errors} placeholder={'Email'} name={'user'} id={'email'} />
                </div>
                <div id="passwordContainer" className='mb-2'>
                    <LoginField register={register} errors={errors} placeholder={'Password'} name={'password'} id={'password'} />
                </div>
                <div id="loginButtonContainer">
                    <JoinButton name={'Login'} type={'submit'} />
                </div>
            </form>
        </div>
    </>
  )
}

export default LoginForm