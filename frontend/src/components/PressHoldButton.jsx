import React from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const PressHoldButton = () => {
    const repeat = gsap.timeline({repeat: -1, yoyo: true,});
    useGSAP(() => {
        repeat.to("#pseudoButton", {
             minHeight: '230px',
             minWidth: '230px'
        });

        repeat.to("#pseudoButton", {
            minHeight: '200px',
            minWidth: '200px'
       });
    }, []);

    return (
        <>
            <div id="pressButton" className="bg-red-800 min-w-[200px] min-h-[200px] rounded-full cursor-pointer flex justify-center items-center relative z-1 select-none">
                <p className='text-white text-5xl font-bold font-white select-none'>SOS</p>
            </div>
            <div id="pseudoButton" className="bg-red-400 min-w-[200px] min-h-[200px] rounded-full cursor-pointer absolute select-none"></div>
        </>
    );
}

export default PressHoldButton;
