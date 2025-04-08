import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
          <div className='flex flex-col gap-6 max-w-lg'>
            <h2>Get Interview-Ready with AI-Powered Practice and Feedback</h2>
            <p className='text-lg'>
              Practice on real interview questions & get instant feedback 
               </p>

               <Button asChild className='btn-primary max-sm:w-full'>
                <Link href={'/interview'}>Start an Interview </Link>
               </Button>
          </div>

          <Image height={400} alt='robo-image' src={'/robot.png'} width={400} className='max-sm:hidden'></Image>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      
      <h2>Your interviews
      </h2>

      <div className='interviews-section'>
        {/* <p>You haven&apos;t taken any interviews yet</p> */}
        {dummyInterviews.map((interview,i)=>(
          <InterviewCard key={i} {...interview}/>
        ))}
      </div>
    </section>


    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
 <div className='interviews-section'>
  <p>There are no interview available</p>
 </div>
    </section>
    </>
  )
}

export default page