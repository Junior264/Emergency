import { useState } from "react";
import { settings } from "../assets/icons";
import PressHoldButton from "../components/PressHoldButton";
import Sidebar from "../components/Sidebar";
import gsap from "gsap";
import api from '../utils/index';

const Overview = () => {
    const [sideBar, setSideBar] = useState(false);

    const toggleSideBar = () => {
        const isOpen = !sideBar;
        setSideBar(isOpen);

        gsap.to('#set', { rotate: isOpen ? 180 : 0, duration: 0.5, ease: "power2.inOut" });

        if (isOpen) {
            setTimeout(() => {
                gsap.fromTo('#sidebar', 
                    { x: '100%', opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
            }, 10);
        }
    };

    const handleEmergencyRequest = async () => {
        try {
            const res = await api.get('/notifications');
            const contacts = res.data;

            await api.post('/notifications/emergency', {
                message: "NOTFALL: Hilfe benötigt!",
                recipients: contacts
            });
            
            console.log("Notruf wurde sicher in die Warteschlange eingereicht!");
        } catch (error) {
            console.error("Fehler beim Einreihen des Notrufs", error);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-gray-50 font-montserrat">
            <div className="w-full flex flex-col">
                
                <div className="h-[10vh] pr-2 pt-2 pb-2 flex justify-end">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all active:scale-95 flex items-center justify-center">
                        <img 
                            id="set" 
                            src={settings} 
                            alt='settings' 
                            width={70}
                            height={20} 
                            onClick={toggleSideBar}
                        />
                    </div>
                </div>

                <div className="pt-4 px-6">
                    <p className="text-3xl text-center text-gray-800 font-bold uppercase tracking-tight">
                        PRESS AND HOLD BUTTON TO SEND EMERGENCY NOTIFICATION
                    </p>
                </div>

                <div className="flex justify-center items-center h-[60vh]">
                    <div className="relative">
                        <PressHoldButton onComplete={handleEmergencyRequest} />
                    </div>
                </div>
            </div>

            {sideBar && <Sidebar id="sidebar" toggle={toggleSideBar} />}
        </div>
    );
};

export default Overview;
