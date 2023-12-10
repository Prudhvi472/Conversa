"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { FC, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub , BsGoogle} from 'react-icons/bs'

interface AuthFormProps {}

type Variant = "LOGIN" | "REGISTER";

const AuthForm: FC<AuthFormProps> = ({}) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(()=>{
    if(variant==='LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  },[variant])

  const {
    register,
    handleSubmit,
    formState:{
        errors
    }
  } = useForm<FieldValues>({
    defaultValues:{
        name:'',
        email:'',
        password:''
    }
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true)
    if(variant==='REGISTER')
    {
        // Register
    }
    else 
    {
        // Login
    }
  }


  const SocialAction = (action : string) => {
    setIsLoading(true)
    //next auth social sign in
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form 
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {
                variant==='REGISTER' && 
                  (
                    <Input id="name" lable="Name" register={register} errors={errors} disabled={isLoading}/> 
                  )
              }
              <Input id="email" lable="Email address" type="email" register={register} errors={errors} disabled={isLoading}/> 
              <Input id="passowrd" lable="Password" type="password" register={register} errors={errors} disabled={isLoading}/> 
              <div>
                <Button
                  disabled={isLoading}
                  fullWidth
                  type="submit"
                >
                  {variant}
                </Button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                        or continue with
                    </span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                  <AuthSocialButton Icon={BsGithub} onClick={()=> SocialAction('github')}/>
                  <AuthSocialButton Icon={BsGoogle} onClick={()=> SocialAction('google')}/>
              </div>
            </div>

            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>
                {variant==='LOGIN' ? 'New to Convoz?' : 'Have an Account Already?'}
              </div>
              <div onClick={toggleVariant} className="underline cursor-pointer">
                  {variant ==='LOGIN' ? 'Create an Account' : 'Login'}
              </div>
            </div>
        </div>
    </div>
  )
};

export default AuthForm;
