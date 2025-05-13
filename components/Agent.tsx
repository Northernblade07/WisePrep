// import { cn } from '@/lib/utils';
import { cn } from '@/public/utils';
import Image from 'next/image'
import React from 'react'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}
const Agent = ({ username, userId, type }) => {

    const callStatus = CallStatus.CONNECTING;
    const isSpeaking = true;
    const messages =[
        'whats your name ',
        'my name is john doe'
    ];

    const lastMessage = messages[messages.length -1];
    
    return (
        <>
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <Image className='object-cover' src={'/ai-avatar.png'} height={54} width={65} alt='vapi' />
                        {isSpeaking && <span className='animate-speak'></span>}
                    </div>
                    <h3>
                        Ai Interviewer
                    </h3>
                </div>

                <div className='card-border'>
                    <div className='card-content'>
                        <Image className='object-cover rounded-full size-[120px]' src={'/user-avatar.png'} height={540} width={540} alt='user' />
                        <h3>{username}</h3>

                    </div>
                </div>
            </div>


         {messages.length>0 && (
            <div className='transcript-border'>
                <div className='transcript'>
                    <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0' ,'animate-fadeIn opacity-100')}>
                        {lastMessage}
                    </p>
                </div>
            </div>
         )}

            <div className='w-full flex justify-center'>
                {callStatus !== 'ACTIVE' ? (
                    <button className='relative btn-call'>
                        <span className={cn('absolute animate-ping rounded-full opacity-75 ', callStatus !== 'CONNECTING' & 'hidden')} />
                        <span>
                            {callStatus === "INACTIVE" || callStatus === "FINISHED" ? 'Call' : '. . .'}</span>
                    </button>
                ) : (
                    <button className='btn-disconnect'>
                        END
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent