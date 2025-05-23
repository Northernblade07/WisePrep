"use client"

import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { signIn, signUp } from '@/lib/actions/auth.actions'

const formSchema = z.object({
    username: z.string().min(2).max(50),
})

const authFormSchema = (type:FormType) => {

  return z.object({
    name: type === "sign-up"?z.string().min(3).max(20) : z.string().optional(),
    email: z.string().email(),
    password : z.string().min(3),

  })
}


const AuthForm = ({ type }: { type: FormType }) => {

    const router = useRouter();

    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password:""
        },
    })

    // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            
            if (type === "sign-up") {
                console.log('Signup',values)

                const {name , email , password} = values;

                const userCredentials = await createUserWithEmailAndPassword(auth ,email,password)

                const result = await signUp({
                    uid : userCredentials.user.uid,
                    name : name!,
                    email,
                    password,
                })
            
                if (!result?.success) {
                    toast.error(result?.message)
                    return;
                }

                toast.success('Account Created Successfully')
                router.push('/sign-in')
            }else{

                console.log('SignIn',values)

                const {email , password} = values;

                const userCredentials = await signInWithEmailAndPassword(auth , email , password);

                const idToken = await userCredentials.user.getIdToken();
                if (!idToken) {
                    toast.error("sign in failed ")
                    return;
                }

                await signIn({
                    email,
                    idToken
                })
                toast.success('Sign in Successfully')
                router.push("/")
            }

        } catch (error) {
            console.log(error)
            toast.error(`there was an error: ${error}`)
        }
      
        console.log(values)
    }

    const isSign = type==="sign-in";
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className='flex flex-col gap-6 card py-14 px-10 '>
                <div className='flex flex-row gap-2 justify-center '>
                    <Image src={"/logo.svg"} width={38} height={32} alt='logo' />
                    <h2 className='text-primary-100'>WisePrep</h2>
                </div>
                <h3>Practice Job Interview with AI </h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
                        {!isSign && (
                            <FormField control={form.control} name="name" label='Name' placeholder='Enter Your Name' />
                        )}

                        <FormField control={form.control} name={'email'} placeholder='Enter Your Email' type='email' label='Email'/>

                        <FormField name={'password'} label='Password' placeholder='Enter Your Password' control={form.control} type='password'/>

                        <Button className='btn'  type="submit">{isSign ? 'Sign-in' : "create an Account"}</Button>
                    </form>
                </Form>

                <p className='text-center'>{isSign ? 'No-account yet?' : 'have an account already'}

                <Link href={!isSign ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1 ">
                    {!isSign ? "Sign-in" : "Sign-up"}
                </Link>
                </p>

            </div>
        </div>
    )
}

export default AuthForm;