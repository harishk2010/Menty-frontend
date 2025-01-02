"use client"

import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

// Dynamically import the Player component from Lottie with SSR disabled
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), { 
  ssr: false ,
  loading:()=><div>Loading-----</div>
});
export default function Home():ReactElement{
    return(
        <>
        
        
        <div>
            <Player 
            autoplay
            loop
            style={{height:"80%" ,width:"80%"}}
            src="https://lottie.host/700d2277-261b-4d21-8e8f-52091c065aba/IfV4AvDFMV.json"/>
            
            <Player 
            autoplay
            loop
            style={{height:"80%" ,width:"80%"}}
            src="https://lottie.host/700d2277-261b-4d21-8e8f-52091c065aba/IfV4AvDFMV.json"/>
            
        </div>
        </>
    )
}