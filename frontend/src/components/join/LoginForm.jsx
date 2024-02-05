import React from 'react'
import { useForm } from 'react-hook-form'
import { useMain } from '../../context/main'
import LoginField from '../shared/loginField/LoginField'
import JoinButton from '../shared/joinButton/JoinButton'

function LoginForm() {

    const { successLogin } = useMain()

    const { register, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: {
        user: '',
        password: ''
    }}, {validateOnChange: true})

    const onSubmit = async (data) => {
        const email = data.user
        const password = data.password
        
        if ( email && password ) {
            const response = await fetch ('http://127.0.0.1:5000/users/login', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {'Content-Type': 'application/json'}
            })
            if ( response.ok ) {
                const responseData = await response.json()
                localStorage.setItem('token', responseData.token)
                successLogin()
                reset()
            } else {
                alert(response.statusText + ' failed to login')
            }
        }
    }

    const onError = () => {
        console.log('from log in form oops I did it again')
    }

  return (
    <>
        <div id="loginFormContainer">
            <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <div id="userNameContainer" className='mb-2 w-full'>
                    <LoginField type={'text'} register={register} errors={errors} placeholder={'Email'} name={'user'} id={'loginEmail'} />
                </div>
                <div id="passwordContainer" className='mb-2'>
                    <LoginField type={'password'} register={register} errors={errors} placeholder={'Password'} name={'password'} id={'loginPassword'} />
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