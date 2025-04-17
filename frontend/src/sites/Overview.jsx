import { useState } from "react";
import { settings } from "../assets/icons";
import PressHoldButton from "../components/PressHoldButton";
import Sidebar from "../components/Sidebar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const Overview = () => {
    const [sideBar, setSiteBar] = useState(false);

    const toggleSideBar = () => {
        setSiteBar(!sideBar);

        useGSAP(
            gsap.fromTo('#set', {rotate: 180}, {rotate: -180}),
            gsap.to('#sidebar', {
                        minWidth: '50%',
                        opacity: 1,
                        duration: 1,
                        ease: 'Power0.easeIn'
                    })
        );
    };

    return (
        <div className="min-h-screen flex overflow-hidden">
            <div className="w-full">
                <div className="h-[10vh] pr-2 pt-2 pb-2 flex justify-end">
                    <img id="set" className="cursor-pointer" src={settings} alt='icon' width={70} height={20} onClick={toggleSideBar}/>
                </div>
                <p className="text-3xl text-center pt-4">PRESS AND HOLD BUTTON TO SEND EMERGENCY NOTIFICATION</p>
                <div className="flex justify-center items-center h-[60vh]">
                    <PressHoldButton />
                </div>
            </div>
            {sideBar && <Sidebar toggle={toggleSideBar} />}
        </div>
    );
};

export default Overview;