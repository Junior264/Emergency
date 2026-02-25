import React, { useState, useRef } from 'react';
import gsap from 'gsap';

const PressHoldButton = ({ onComplete }) => {
    const [isPressed, setIsPressed] = useState(false);
    const circleRef = useRef(null);
    const timeline = useRef(null);

    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    const handlePressStart = () => {
        setIsPressed(true);
        
        timeline.current = gsap.timeline({
            onComplete: () => {
                onComplete();
                handlePressEnd();
            }
        });

        timeline.current.to("#main-button", { scale: 0.9, duration: 0.2 }, 0);
        
        timeline.current.fromTo(circleRef.current, 
            { strokeDashoffset: circumference }, 
            { strokeDashoffset: 0, duration: 3, ease: "none" }, 0
        );
    };

    const handlePressEnd = () => {
        setIsPressed(false);
        if (timeline.current) {
            timeline.current.kill();
            gsap.to(circleRef.current, { strokeDashoffset: circumference, duration: 0.3 });
            gsap.to("#main-button", { scale: 1, duration: 0.3 });
        }
    };

    return (
        <div className="relative flex items-center justify-center select-none touch-none">
            {!isPressed && (
                <div className="absolute w-48 h-48 bg-red-500/20 rounded-full animate-ping"></div>
            )}

            <svg className="absolute rotate-[-90deg]" width="200" height="200">
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="white"
                    strokeWidth="12"
                    fill="transparent"
                />
                <circle
                    ref={circleRef}
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="#3b82f6"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                />
            </svg>

            <button
                id="main-button"
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className={`
                    relative w-40 h-40 rounded-full flex items-center justify-center
                    text-white font-black text-2xl transition-colors duration-500 shadow-2xl
                    ${isPressed ? 'bg-blue-500' : 'bg-red-500'}
                `}
            >
                {isPressed ? 'HOLD' : 'SOS'}
            </button>
        </div>
    );
};

export default PressHoldButton;