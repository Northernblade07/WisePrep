import { isAuthenticated } from '@/lib/actions/auth.actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async({children}:{children:ReactNode}) => {

  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/sign-in');
  
  return (
  <div className='root-layout'>
     <nav>
      <Link className='flex items-center gap-2' href={'/'}>
      <Image src={'/logo.svg'} height={32} width={38} alt="logo"/>
      <h2 className='text-primary-100'>WisePrep</h2>
      </Link>
     </nav>
    {children}
    </div>
  )
}

export default RootLayout