'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react'

const LoginPage =  () => {
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Login using Email and password
  const { data: response , error} = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    rememberMe: true,
    callbackURL: '/',
  });
    console.log(data, error)
  }
  
  return (
    <div>
      
    </div>
  )
}

export default LoginPage
