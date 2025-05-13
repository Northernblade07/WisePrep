"use server"

import { auth, db } from "@/firebase/admin";
import { cookies} from "next/headers";
import { use } from "react";
// import { nullable } from "zod";

const OneWeek = 60*60*24*7;

export async function signUp(params:SignUpParams) {
    const {uid , name , email } = params;
    try {
        
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return{
                success :false,
                message:"user already exists"
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email,
        })

        return{
            success:true,
            message:"Account created successfully"
        }

    } catch (e:any) {
        console.error(e);

        if(e.code === 'auth/email-already-exists'){
            return{
                success:false,
                message:"user already exists"
            }
        }

        return{success:false,
            message : "failed to create an acc"
        }
    }
}

export async function signIn(params:SignInParams) {
    const {email , idToken} = params;

    try {
        
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success:false,
                message:"user does not exists . create and account "
            }
        }

        await setSessionCookie(idToken)
    } catch (error) {
        console.error(error)

        return{
            success:false,
            message:"failed to log into an acc"
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken ,{
        expiresIn:OneWeek*1000,
    });

    cookieStore.set('session',sessionCookie,{
        maxAge : OneWeek,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path : '/',
        sameSite:'lax'
    })
}


export async function getCurrentUser() : Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) return null;


 try {
    
    const decodedClaims = await auth.verifySessionCookie(sessionCookie , true)

    const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

    if (!userRecord.exists) return null;

    return {
        ...userRecord.data(),
        id: userRecord.id,
        
    } as User;
 } catch (error) {
    console.log(error);
    return null
 }
}

export async function isAuthenticated() {
    
    const user = await getCurrentUser();

    return !!user;
    // !! converts the user value into a boolean value , originally it is an object
    //check the video at 1:55:50
}